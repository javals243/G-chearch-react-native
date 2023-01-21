import React, {Component} from 'react';
import { ImageBackground, Dimensions, View, TouchableOpacity, ScrollView, SafeAreaView, FlatList, Linking, Image} from 'react-native';
import Icono from 'react-native-vector-icons/Ionicons';
import {Grid, Row, Col } from 'react-native-easy-grid';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Tab, Tabs } from 'native-base';
import ConfigApp from '../utils/ConfigApp';
import Strings from '../utils/Strings';
import PlaceForm from '../forms/PlaceForm';
import PlaceComments from '../forms/PlaceComments';
import BannerAd from '../components/BannerAd';
import HTML from 'react-native-htmlview';
import { Popup } from 'react-native-map-link';
import * as firebase from 'firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modalbox';
import { SliderBox } from "react-native-image-slider-box";
import AsyncStorage from '@react-native-async-storage/async-storage';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class PlaceDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: this.props.route.params.item,
      gallery:[],
      isLoading: true,
      bookmark: false,
      isVisible: false,
      isOpen: false,
      isDisabled: false,
      swipeToClose: false,
      sliderValue: 0.3
    };
  }

  componentDidMount() {

    this.props.navigation.setOptions({
        title: this.props.route.params.item.place_name,
      });

    this.renderBookMark(this.state.item.place_id);
           
      return fetch(ConfigApp.URL+'json/data_gallery.php?place='+this.state.item.place_id)
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             gallery: responseJson,
             isLoading: false
           }, function() {
           });
         })
         .catch((error) => {
           console.error(error);
         });


     }

renderBookMark = async (place_id) => {
 await AsyncStorage.getItem('places').then(token => {
   const res = JSON.parse(token);
    if (res !== null) {
      let data = res.find(value => value.place_id === place_id);

   if (data !== null) {
    let data = res.find(value => value.place_id === place_id);
    return data == null
    ? this.setState({ bookmark: false })
    : this.setState({ bookmark: true });
  }

  } else {
    return false;
  }

});
};

saveBookmark = async (uid, place_id, place_name, place_image, place_audience, place_address, place_hours, place_phone, place_website, place_description) => {
  this.setState({ bookmark: true });

  let bookmarkItem = {
            userId: uid,
            place_id: place_id,
            place_name: place_name,
            place_image: place_image,
            place_audience: place_audience,
            place_address: place_address,
            place_hours: place_hours,
            place_phone: place_phone,
            place_website: place_website,
            place_description: place_description
  }

  await AsyncStorage.getItem('places').then(token => {
    const res = JSON.parse(token);
    if (res !== null) {
      let data = res.find(value => value.place_id === place_id);
      if (data == null) {
        res.push(bookmarkItem);
        AsyncStorage.setItem('places', JSON.stringify(res));
      }
    } else {
      let places = [];
      places.push(bookmarkItem);
      AsyncStorage.setItem('places', JSON.stringify(places));
    }
  });
};

removeBookmark = async (place_id) => {
 this.setState({ bookmark: false });
 const places = await AsyncStorage.getItem('places').then(token => {
   const res = JSON.parse(token);
   return res.filter(e => e.place_id !== place_id);
 });
 await AsyncStorage.setItem('places', JSON.stringify(places));
};

  closeModal(){
    this.refs.modal3.close();

  }
  
  render() {

  const {item} = this.state;  
  const {gallery} = this.state;  
  const user = firebase.auth().currentUser;
  const images = gallery.map(e => ConfigApp.URL+'images/'+e.image_name);

return (

<Container style={styles.background_general}>

<ScrollView>

<View style={{height: height * 0.29}}>
<SliderBox images={images} sliderBoxHeight={height * 0.29} disableOnPress={true} dotStyle={{width: null}} resizeMethod={'auto'} resizeMode={'cover'} />
</View>

<Text style={{display: 'none'}}>{item.place_name}</Text>
<Text style={{display: 'none'}}>{item.place_id}</Text>

          {this.state.bookmark ? (
      <TouchableOpacity style={styles.readmore} onPress={this.removeBookmark.bind(this, item.place_id)} activeOpacity={0.8}>
      <Icono name="md-heart" style={styles.readmoreIcon}/>
      </TouchableOpacity>

      ) : (

      <TouchableOpacity style={styles.readmore} onPress={this.saveBookmark.bind(this, user.uid, item.place_id, item.place_name, item.place_image, item.place_audience, item.place_address, item.place_hours, item.place_phone, item.place_website, item.place_description)} activeOpacity={0.8}>
      <Icono name="md-heart" style={styles.readmoreGrayIcon}/>
      </TouchableOpacity>
      )}


<Tabs tabBarUnderlineStyle={styles.tabBarUnderline} tabContainerStyle={{ elevation:0 }}>

<Tab heading={Strings.ST5} tabStyle={styles.tabs_2} activeTabStyle={styles.activetabs_2} textStyle={styles.tabs_text_2} activeTextStyle={styles.activetabs_text_2}>
       
<List style={{marginTop: 15}}>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require('../../assets/images/audience.png')} style={{width: 40, height: 40}} />
              </Left>
              <Body>
                <Text style={styles.label_details}>{Strings.ST10}</Text>
                <Text note numberOfLines={1}>{item.place_audience}</Text>
              </Body>
            </ListItem>

          <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require('../../assets/images/address.png')} style={{width: 40, height: 40}} />
              </Left>
              <Body>
                <Text style={styles.label_details}>{Strings.ST11}</Text>
                <Text note numberOfLines={2}>{item.place_address}</Text>
              </Body>
              <Right>
                <Button onPress={() => { this.setState({ isVisible: true }) }}  transparent>
                  <Text><Icono name="ios-resize" style={{fontSize: 26, color: '#DDD'}} /></Text>
                </Button>
              </Right>
            </ListItem>


          <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require('../../assets/images/schedule.png')} style={{width: 40, height: 40}} />
              </Left>
              <Body>
                <Text style={styles.label_details}>{Strings.ST12}</Text>
                <Text note numberOfLines={1}>{item.place_hours}</Text>
              </Body>
            </ListItem>

          <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require('../../assets/images/phone.png')} style={{width: 40, height: 40}} />
              </Left>
              <Body>
                <Text style={styles.label_details}>{Strings.ST13}</Text>
                <Text note numberOfLines={1}>{item.place_phone}</Text>
              </Body>
            </ListItem>

          <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require('../../assets/images/website.png')} style={{width: 40, height: 40}} />
              </Left>
              <Body style={{borderBottomWidth: 0}}>
                <Text style={styles.label_details}>{Strings.ST14}</Text>
                <Text note numberOfLines={2}>{item.place_website}</Text>
              </Body>
              <Right style={{borderBottomWidth: 0}}>
                <Button onPress={ ()=>{ Linking.openURL(item.place_website)}} transparent>
                  <Text><Icono name="ios-log-out" style={{fontSize: 26, color: '#DDD'}} /></Text>
                </Button>
              </Right>
            </ListItem>

</List>
<View style={{height: 50}} />

</Tab>

<Tab heading={Strings.ST48} tabStyle={styles.tabs_2} activeTabStyle={styles.activetabs_2} textStyle={styles.tabs_text_2} activeTextStyle={styles.activetabs_text_2}>
     
<View style={{paddingLeft: 15, paddingRight: 15, marginTop: 10}}>
<HTML value={item.place_description}/>            
</View>
<View style={{height: 50}} />

</Tab>

<Tab heading={Strings.ST84} tabStyle={styles.tabs_2} activeTabStyle={styles.activetabs_2} textStyle={styles.tabs_text_2} activeTextStyle={styles.activetabs_text_2}>
     
           <ListItem icon style={{borderBottomWidth: 0}}>
            <Body style={{borderBottomWidth: 0}}>
              <Text style={{fontSize: 14, fontWeight: 'bold', color: 'rgba(0,0,0,0.4)' }}>{Strings.ST50.toUpperCase()}</Text>
            </Body>
            <Right style={{borderBottomWidth: 0}}>
                  <TouchableOpacity onPress={() => this.refs.modal3.open()} activeOpacity={1}>
                  <View style={{padding: 3, paddingRight: 11, paddingLeft: 11, borderWidth: 1, borderRadius: 50, borderColor: 'rgba(0,0,0,0.3)'}}>
                  
                  <Text style={{fontSize: 10, color: 'rgba(0,0,0,0.4)'}}> {Strings.ST83.toUpperCase()} <Icono active name="ios-add" /></Text>
                  </View>
                  </TouchableOpacity>
            </Right>
          </ListItem>

<View style={{height: 1, backgroundColor: '#EEE', width: width, marginBottom: 5}}></View>

<View style={{margin: 15, marginBottom: 0, marginTop: 0}}>

<PlaceComments placeId={item.place_id} />



</View>


<Modal style={[styles.modal, styles.modal3]} position={"center"} ref={"modal3"} swipeArea={20} swipeToClose={this.state.swipeToClose} onClosed={this.onClose} onOpened={this.onOpen} onClosingState={this.onClosingState} isDisabled={this.state.isDisabled} coverScreen={true}>
<View style={{marginTop: 8, marginBottom: 8}}>
<PlaceForm placeId={this.state.item.place_id} closeModal={() => this.closeModal()}/>
</View>
</Modal>

</Tab>

</Tabs>


<Popup
          isVisible={this.state.isVisible}
          onCancelPressed={() => this.setState({ isVisible: false })}
          onAppPressed={() => this.setState({ isVisible: false })}
          onBackButtonPressed={() => this.setState({ isVisible: false })}
          options={{
            latitude: item.place_latitude,
            longitude: item.place_longitude,
            title: item.place_name,
            dialogTitle: Strings.ST49,
            cancelText: Strings.ST60
          }}
        />

</ScrollView>

<SafeAreaView>
</SafeAreaView>


</Container>

    );
  }


} 


