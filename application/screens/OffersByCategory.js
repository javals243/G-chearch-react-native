import React, {Component} from 'react';
import AppPreLoader from '../components/AppPreLoader'; 
import { ImageBackground, Dimensions, View, TouchableOpacity, FlatList, Button, ActivityIndicator, Image, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { LinearGradient } from 'expo-linear-gradient';
import {Grid, Row } from 'react-native-easy-grid';
import { Container, Text, Body, Right, List, ListView, Thumbnail, ListItem} from 'native-base';
import ConfigApp from '../utils/ConfigApp';
import Strings from '../utils/Strings';
import BannerAd from '../components/BannerAd';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class OffersByCategory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    
    this.props.navigation.setOptions({
        title: this.props.route.params.TitleCategory,
      });

       return fetch(ConfigApp.URL+'json/data_offers.php?category='+this.props.route.params.IdCategory)
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             isLoading: false,
             dataSource: responseJson
           }, function() {
           });
         })
         .catch((error) => {
           console.error(error);
         });
     }

  OfferDetails = (item) => {
    this.props.navigation.navigate('OfferDetailsScreen', {item});
  };

  render() {

    if (this.state.isLoading) {
      return (
        <AppPreLoader/>
      );
    }

    return (
<Container style={styles.background_general}>

<ScrollView>

<FlatList
          data={ this.state.dataSource }
          refreshing="false"
          renderItem={({item}) => 
                <TouchableOpacity onPress={() => this.OfferDetails(item)} activeOpacity={1}>
                <ImageBackground source={{uri: ConfigApp.URL+'images/'+item.offer_image}} style={styles.background_card}>
                    <LinearGradient colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.6)']} style={styles.gradient_card}>
                            <Text style={styles.category_card}>{item.category_name}</Text>
                            <Text style={styles.title_card}>{item.offer_title}</Text>
                            <Text><Text style={styles.price}>{Strings.ST45} {item.offer_price}</Text> <Text numberOfLines={1} style={styles.oldprice}>{Strings.ST45} {item.offer_oldprice}</Text></Text>
                    </LinearGradient>
                </ImageBackground>
                </TouchableOpacity>
}
        keyExtractor={(item, index) => index.toString()}
        

        />

</ScrollView>

</Container>
    );
  }
}

