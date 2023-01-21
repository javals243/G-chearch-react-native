import React, {Component} from 'react';
import {options, Comment} from './Comment';
import t from 'tcomb-form-native';
const Form = t.form.Form;
import {View} from "react-native";
import {Button, Text} from 'native-base';
import * as firebase from 'firebase';
import Strings from '../utils/Strings';


var styles = require('../../assets/files/Styles');

export default class PlaceForm extends Component {
	constructor() {
		super();
		var user = firebase.auth().currentUser;
  		var date = new Date().toDateString();

		this.state = {
			comment: {
				comment: '',
				rating: 1,
				user: user.displayName,
				date: date
			}
		};
	}

	closeModalForm() {
        this.props.closeModal();
    }

	addComment () {
		var user = firebase.auth().currentUser;
  		var date = new Date().toDateString();

		const validate = this.refs.form.getValue();
		if(validate) {
			let data = {};
			let comment = Object.assign({}, validate);
			let ref = firebase.database().ref().child('placeComments');
			const key = ref.push().key;

			data[`${this.props.placeId}/${key}`] = comment;

			ref.update(data).then(() => {
				this.setState((prevState, props) => {
					return {
						comment: {
							comment: '',
							rating: 1,
							user: user.displayName,
							date: date

						}
					}
				});

				this.closeModalForm();

			})
		}
	}

	onChange (comment) {
		this.setState({comment});
	}

	render () {
		const {comment} = this.state;
		return (
					<View>
					<Form
						ref="form"
						type={Comment}
						options={options}
						value={comment}
						onChange={(v) => this.onChange(v)}
					/>
				<Button block onPress={this.addComment.bind(this)} style={styles.postCommentButton}>
				<Text style={styles.postCommentText}>{Strings.ST61.toUpperCase()}</Text>
				</Button>

				</View>


		)
	}
}