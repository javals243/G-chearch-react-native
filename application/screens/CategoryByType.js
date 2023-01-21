import React, {Component} from 'react';
import AppPreLoader from '../components/AppPreLoader'; 
import { ImageBackground, Dimensions, View, TouchableOpacity, FlatList, Button, ActivityIndicator, Image, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { LinearGradient } from 'expo-linear-gradient';
import {Grid, Row } from 'react-native-easy-grid';
import { Container, Text, Body, Right, List, ListView, Thumbnail, ListItem} from 'native-base';
import ConfigApp from '../utils/ConfigApp';
import Strings from '../utils/Strings';
import GridView from 'react-native-super-grid';
import BannerAd from '../components/BannerAd';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class CategoryByType extends Component {

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

       return fetch(ConfigApp.URL+'json/data_places_types.php?category='+this.props.route.params.IdCategory)
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

PlacesByCategory=(place_type_id, place_type_name)=>{
  this.props.navigation.navigate('PlacesByCategoryScreen', { IdCategory: place_type_id, TitleCategory: place_type_name });    
}

  render() {

    if (this.state.isLoading) {
      return (
        <AppPreLoader/>
      );
    }

    return (
<Container style={styles.background_general}>

<ScrollView>

<View style={{padding: 5, paddingTop: 10, backgroundColor: '#FFF'}}>

<GridView
  itemDimension={130}
  spacing={8}
  data={ this.state.dataSource }
  renderItem={({ item }) => (
    <TouchableOpacity onPress={this.PlacesByCategory.bind(this, item.place_type_id, item.place_type_name)}>
    <View style={{borderWidth: 0.5, borderColor: '#eee', padding: 10, borderRadius: 5}}>
    <Image source={{uri: ConfigApp.URL+'images/'+item.place_type_image}} style={{ height: 80,  width : null}} resizeMode="contain"/>
    <View style={{alignContent: 'center', alignItems: 'center'}}>
    <Text numberOfLines={2} style={{ fontSize: 13, paddingTop: 10}}>{item.place_type_name}</Text>
    </View>
    </View>
    </TouchableOpacity>
    )}
/>

</View>

</ScrollView>
<SafeAreaView>
<View style={{alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
<BannerAd/>
</View>
</SafeAreaView>

</Container>
    );
  }
}

