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

class OfferFav extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      offers: []
    }

  }

  componentDidMount () {
    this.fetchOffers();
  }

  OfferDetails = (item) => {
    this.props.navigation.navigate('OfferDetailsScreen', {item});
  };

  renderFooterOffers = () => {
  const offers = this.state.offers
  if (offers.length != 0) return null;


  return (
    <FavListEmpty/>
   );
};

removeOffer = async (offer_id) => {
try {

var user = firebase.auth().currentUser;
uid = user.uid;

const offers = await AsyncStorage.getItem('offers');
let offersFav = JSON.parse(offers);
let offersItems = offersFav.filter(function(e){ return e.offer_id !== offer_id && e.userId == uid })

await AsyncStorage.setItem('offers', JSON.stringify(offersItems));

this.setState({ 
...this.state, 
offers: offersItems || [] 
}); 

} catch(error) {

}}; 

  render () {

    return (

<List>

<ListItem itemDivider>
              <Text>{Strings.ST2}</Text>
            </ListItem>    

<FlatList
          data={this.state.offers}
          refreshing="true"
          renderItem={({item, index}) =>

<ListItem style={{paddingLeft: 0, marginLeft: 0, backgroundColor:'#FFF', opacity: 1, borderColor: 'rgba(0,0,0,0.05)', borderBottomWidth: 1}}  onPress={() => this.OfferDetails(item)} >
              <Thumbnail rounded size={80} source={{ uri: ConfigApp.URL+'images/'+item.offer_image }} style={{paddingLeft: 10, marginLeft: 10}} />
              <Body style={{paddingLeft: 0, marginLeft: 0}}>
                <Text numberOfLines={2} style={{fontSize: 14, marginBottom: 3}}>
                {item.offer_title}
                </Text>
              </Body>
              <Right>
              <TouchableOpacity onPress={this.removeOffer.bind(this, item.offer_id)} activeOpacity={1}>
                <Text note>
                <Icon name="close" style={{fontSize: 19}}/>
                </Text>
                </TouchableOpacity>

              </Right>
            </ListItem>

          
}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={this.renderFooterOffers}


        /> 

</List>

    )
  }

    async fetchOffers () {
      var user = firebase.auth().currentUser;
      uid = user.uid;

      let offersJSON= await AsyncStorage.getItem('offers');
      let offersFav = JSON.parse(offersJSON);
      offersItems = offersFav.filter(function(e){
            return e.userId == uid
        })
      const offersArray = offersItems || [];
      this.setState({
        ...this.state,
        offers: offersArray
      });
  }

}

export default withNavigation(OfferFav);
