import React, {Component} from 'react';
import { Alert, Image, TouchableOpacity} from 'react-native';
import BackgroundImage from "../components/BackgroundImage";
import { Container, Body, Footer, Input, Icon, Item, Text, Toast, View, Button} from 'native-base';

import * as firebase from 'firebase';
import Strings from '../utils/Strings';
import ColorsApp from '../utils/ColorsApp';
import * as Facebook from 'expo-facebook';
import FacebookConfig from '../utils/FacebookConfig';
import { LinearGradient } from 'expo-linear-gradient';

var styles = require('../../assets/files/Styles');

export default class Start extends Component {

	 login = () => {
        this.props.navigation.navigate('Login');
    };

 	 register = () => {
        this.props.navigation.navigate('Register');
    };

	async facebook () {

		await Facebook.initializeAsync({ appId: FacebookConfig.config.application_id, appName: FacebookConfig.config.application_name});

		const {type, token, permissions} = await Facebook.logInWithReadPermissionsAsync({ permissions: FacebookConfig.config.permissions });

		if(type === "success") {
			const credentials = firebase.auth.FacebookAuthProvider.credential(token);
			firebase.auth().signInWithCredential(credentials)
				.catch(error => {
			Toast.show({ text: `${Strings.ST32}`, position: 'bottom', buttonText: `${Strings.ST33}` })

				})
		}
	}

	render () {

		return (
    
		<Container style={{backgroundColor: '#FFFFFF'}}>
		<Body>
			<View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
			<Image source={require('../../assets/images/logo.png')} style={styles.logo_start} resizeMode="contain"/>
			
			<Button block onPress={this.login.bind(this)} style={styles.button_start}>
			<Text style={styles.button_start_text}>{Strings.ST26.toUpperCase()}</Text>
			</Button>

			<TouchableOpacity onPress={this.register.bind(this)} activeOpacity={1}>
			<LinearGradient colors={[ColorsApp.SECOND, ColorsApp.PRIMARY]} start={[0, 0]} end={[1, 0]} style={styles.button_start_2}>
			<Text style={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 14}}>{Strings.ST27.toUpperCase()}</Text>
			</LinearGradient>
			</TouchableOpacity>	

			<TouchableOpacity onPress={this.facebook.bind(this)} activeOpacity={1}>
			<LinearGradient colors={['#3b5998', '#4f6eb1']} start={[0, 0]} end={[1, 0]} style={styles.button_start_2}>
			<Text style={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 14}}>{Strings.ST95.toUpperCase()}</Text>
			</LinearGradient>
			</TouchableOpacity>	

			</View>

		
		</Body>
		</Container>
		);
	}
}