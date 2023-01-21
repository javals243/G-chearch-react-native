import React, {Component} from 'react';
import { ImageBackground, Dimensions, View, TouchableOpacity, ScrollView, FlatList, Image, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import {Grid, Row, Col } from 'react-native-easy-grid';
import { Container, Header, Footer, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import ConfigApp from '../utils/ConfigApp';
import Strings from '../utils/Strings';
import BannerAd from '../components/BannerAd';
import RelatedOffers from '../components/RelatedOffers';
import HTML from 'react-native-htmlview';
import Modal from 'react-native-modalbox';
import * as firebase from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class OfferDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: this.props.route.params.item,
      related:[],
      bookmark: false,
      isLoading: true,
      isOpen: false,
      isDisabled: false,
      swipeToClose: false,
      sliderValue: 0.3
    };
  }

  componentDidMount() {
    
      this.props.navigation.setOptions({
        title: this.props.route.params.item.offer_title,
      });

      const {item} = this.state;

      this.renderBookMark(item.offer_id);
            
      this.makeRemoteRequest();

}

  makeRemoteRequest = () => {

      const {item} = this.state;

             return fetch(ConfigApp.URL+'json/data_relatedoffers.php?category='+item.offer_category+'&id='+item.offer_id)
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             isLoading: false,
             related: responseJson

           }, function() {
           });
         })
         .catch((error) => {
           console.error(error);
         });

}

renderBookMark = async (offer_id) => {
 await AsyncStorage.getItem('offers').then(token => {
   const res = JSON.parse(token);
    if (res !== null) {
      let data = res.find(value => value.offer_id === offer_id);

   if (data !== null) {
    let data = res.find(value => value.offer_id === offer_id);
    return data == null
    ? this.setState({ bookmark: false })
    : this.setState({ bookmark: true });
  }

  } else {
    return false;
  }

});
};

saveBookmark = async (uid, offer_id, offer_title, offer_image, offer_price, offer_oldprice, category_name, save, offer_description, offer_terms) => {
  this.setState({ bookmark: true });

  let bookmarkItem = {
            userId: uid,
            offer_id: offer_id,
            offer_title: offer_title,
            offer_image: offer_image,
            offer_price: offer_price,
            offer_oldprice: offer_oldprice,
            category_name: category_name,
            save: save,
            offer_description: offer_description,
            offer_terms: offer_terms
  }

  await AsyncStorage.getItem('offers').then(token => {
    const res = JSON.parse(token);
    if (res !== null) {
      let data = res.find(value => value.offer_id === offer_id);
      if (data == null) {
        res.push(bookmarkItem);
        AsyncStorage.setItem('offers', JSON.stringify(res));
      }
    } else {
      let offers = [];
      offers.push(bookmarkItem);
      AsyncStorage.setItem('offers', JSON.stringify(offers));
    }
  });
};

removeBookmark = async (offer_id) => {
 this.setState({ bookmark: false });
 const offers = await AsyncStorage.getItem('offers').then(token => {
   const res = JSON.parse(token);
   return res.filter(e => e.offer_id !== offer_id);
 });
 await AsyncStorage.setItem('offers', JSON.stringify(offers));
};

Paypal=(offer_id, uid, email)=>
{
      this.props.navigation.navigate('PaypalScreen', { OfferId: offer_id, UserId: uid, UserEmail: email });  
      this.refs.modal3.close();
};

Stripe=(offer_id, uid, email)=>
{
      this.props.navigation.navigate('StripeScreen', { OfferId: offer_id, UserId: uid, UserEmail: email });  
      this.refs.modal3.close();
};

  render() {

  const {item} = this.state;
  var user = firebase.auth().currentUser; 

return (

<Container style={styles.background_general}>
<ScrollView>

<ImageBackground source={{uri: ConfigApp.URL+'images/'+item.offer_image}} style={{ height: height * 0.25,  width : null}}>
    <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)']} style={{ alignItems: 'flex-start', justifyContent: 'flex-end', height: height * 0.25, paddingBottom: 12, paddingLeft: 12, paddingRight: 12,   width : null}}>
    <Text style={styles.categoryOffer}>{item.category_name}</Text>
    <Text numberOfLines={2} style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold', marginBottom: 5}}>{item.offer_title}</Text>
    </LinearGradient>
</ImageBackground>

          {this.state.bookmark ? (
      <TouchableOpacity style={styles.readmore} onPress={this.removeBookmark.bind(this, item.offer_id)} activeOpacity={0.8}>
      <Icon name="md-heart" style={styles.readmoreIcon}/>
      </TouchableOpacity>

      ) : (

      <TouchableOpacity style={styles.readmore} onPress={this.saveBookmark.bind(this, user.uid, item.offer_id, item.offer_title, item.offer_image, item.offer_price, item.offer_oldprice, item.category_name, item.save, item.offer_description, item.offer_terms)} activeOpacity={0.8}>
      <Icon name="md-heart" style={styles.readmoreGrayIcon}/>
      </TouchableOpacity>
      )}

<View style={{padding: 12, backgroundColor: '#FFF', marginTop: 14}}>
<Grid>
    <Col>
      <Text style={styles.detailPrice}>{Strings.ST3} {item.offer_price}{Strings.ST15}</Text>
      <Text style={styles.detailOldPrice}>{Strings.ST4} {item.offer_oldprice}{Strings.ST15}</Text>
      <View style={styles.savePrice}><Text style={styles.saveTextPrice}>{Strings.ST17} {item.save}{Strings.ST15}</Text></View>

    </Col>
    <Col style={{alignItems: 'center', alignContent: 'center', justifyContent: 'center'}}>
    <TouchableOpacity onPress={() => this.refs.modal3.open()} activeOpacity={1}>
    <View style={styles.buyButton}>
    <Text style={{fontSize: 15, color: '#fff', fontWeight: 'bold'}}>{Strings.ST16} <Icon name="ios-chevron-forward-sharp" style={{fontSize: 15}}/></Text>
    </View>
    </TouchableOpacity>
    <Text style={{fontSize: 9, color: '#888', marginTop: 9}}>{Strings.ST21}</Text>
    </Col>
</Grid>
</View>

<View style={{borderTopWidth: 1,  borderBottomWidth: 1, borderColor: '#EEE', paddingTop: 10, paddingBottom: 10, marginTop: 10, marginLeft: 0, paddingLeft: 12}}>
<Text style={{fontWeight: 'bold'}}>{Strings.ST5}</Text>
</View>

<View style={{padding: 12, backgroundColor: '#FFF', paddingTop: 0, paddingBottom: 0}}>

<HTML value={item.offer_description}/> 

</View>

<View style={{borderTopWidth: 1,  borderBottomWidth: 1, borderColor: '#EEE', paddingTop: 10, paddingBottom: 10, marginTop: 0, marginLeft: 0, paddingLeft: 12}}>
<Text style={{fontWeight: 'bold'}}>{Strings.ST20}</Text>
</View>

<View style={{padding: 12, backgroundColor: '#FFF', paddingTop: 12}}>

<HTML value={item.offer_terms}/> 

</View>


<View style={{padding: 5, backgroundColor: '#FFF', paddingTop: 0}}>

{this.state.related == false ? <Text></Text> : <RelatedOffers items={ this.state.related } />}

</View>


<View style={{height: 20, flex: 1, marginBottom: 30}}>
</View>

</ScrollView>


<Modal style={[styles.modal, styles.modal3]} position={"center"} ref={"modal3"} swipeArea={20} swipeToClose={this.state.swipeToClose} onClosed={this.onClose} onOpened={this.onOpen} onClosingState={this.onClosingState} isDisabled={this.state.isDisabled} coverScreen={true}>
          
<View style={styles.titlePayment}>
<Text style={{fontWeight: 'bold', color: '#333' }}>{Strings.ST90}</Text>
</View>   

          <ListItem icon onPress={this.Paypal.bind(this, item.offer_id, user.uid, user.email)}>
            <Body>
              <Text>{Strings.ST72}</Text>
            </Body>
            <Right>
                <Icon active name="ios-arrow-forward" style={{fontSize: 20}} />
              
            </Right>
          </ListItem>


          <TouchableOpacity activeOpacity={1}>
          <ListItem icon onPress={this.Stripe.bind(this, item.offer_id, user.uid, user.email)}>
            <Body style={{borderBottomWidth: 0}}>
              <Text>{Strings.ST87}</Text>
            </Body>
            <Right style={{borderBottomWidth: 0}}>
                <Icon active name="ios-arrow-forward" style={{fontSize: 20}} />
              
            </Right>
          </ListItem>
          </TouchableOpacity>


</Modal>

</Container>

    );
  }


} 


