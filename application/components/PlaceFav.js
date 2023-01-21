import React, {Component} from 'react';
import * as firebase from 'firebase';
import { withNavigation } from '@react-navigation/compat';
import {TouchableOpacity, Dimensions, View, Image, ScrollView, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Container, Body, Thumbnail, Text, List, Right, ListItem} from 'native-base';
import ConfigApp from '../utils/ConfigApp';
import FavListEmpty from './FavListEmpty';
import Strings from '../utils/Strings';
import AsyncStorage from '@react-native-async-storage/async-storage';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

class PlaceFav extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      places: []
    }

  }

  componentDidMount () {
    this.fetchPlaces();
  }

  PlaceDetails = (item) => {
    this.props.navigation.navigate('PlaceDetailsScreen', {item});
  };

  renderFooterPlaces = () => {
  const places = this.state.places
  if (places.length != 0) return null;


  return (
    <FavListEmpty/>
   );
};

removePlace = async (place_id) => {
try {

var user = firebase.auth().currentUser;
uid = user.uid;

const places = await AsyncStorage.getItem('places');
let placesFav = JSON.parse(places);
placesItems = placesFav.filter(function(e){ return e.place_id !== place_id && e.userId == uid })

await AsyncStorage.setItem('places', JSON.stringify(placesItems));

this.setState({ 
...this.state, 
places: placesItems || [] 
}); 

} catch(error) {

}}; 

  render () {

    return (

<List>

<ListItem itemDivider>
              <Text>{Strings.ST1}</Text>
            </ListItem>    

<FlatList
          data={this.state.places}
          refreshing="true"
          renderItem={({item, index}) =>

<ListItem style={{paddingLeft: 0, marginLeft: 0, backgroundColor:'#FFF', opacity: 1, borderColor: 'rgba(0,0,0,0.05)', borderBottomWidth: 1}}  onPress={() => this.PlaceDetails(item)} >
              <Thumbnail rounded size={80} source={{ uri: ConfigApp.URL+'images/'+item.place_image }} style={{paddingLeft: 10, marginLeft: 10}} />
              <Body style={{paddingLeft: 0, marginLeft: 0}}>
                <Text numberOfLines={2} style={{fontSize: 14, marginBottom: 3}}>
                {item.place_name}
                </Text>
              </Body>
              <Right>
              <TouchableOpacity onPress={this.removePlace.bind(this, item.place_id)} activeOpacity={1}>
                <Text note>
                <Icon name="close" style={{fontSize: 19}}/>
                </Text>
                </TouchableOpacity>

              </Right>
            </ListItem>

          
}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={this.renderFooterPlaces}


        /> 

</List>

    )
  }

    async fetchPlaces () {
      var user = firebase.auth().currentUser;
      uid = user.uid;

      let placesJSON= await AsyncStorage.getItem('places');
      let placesFav = JSON.parse(placesJSON);
      placesItems = placesFav.filter(function(e){
            return e.userId == uid
        })
      const placesArray = placesItems || [];
      this.setState({
        ...this.state,
        places: placesArray
      });
  }

}

export default withNavigation(PlaceFav);
