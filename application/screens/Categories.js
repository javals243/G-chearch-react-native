import React, {Component} from 'react';
import { ImageBackground, Dimensions, View, ScrollView, SafeAreaView, TouchableOpacity, FlatList, Image} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text, Footer, Icon, FooterTab, Button, Left, Right, Title, List, ListItem, Thumbnail} from 'native-base';
import {Grid, Row, Col } from 'react-native-easy-grid';
import { LinearGradient } from 'expo-linear-gradient';
import ConfigApp from '../utils/ConfigApp';
import AppPreLoader from '../components/AppPreLoader';
import GridView from 'react-native-super-grid';
import Strings from '../utils/Strings';
import BannerAd from '../components/BannerAd';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');
const equalWidth =  (width / 2 );

export default class Categories extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  navigateToScreen = (route) => () => {
    this.props.navigation.navigate(route);
  }

  componentDidMount() {
    
       return fetch(ConfigApp.URL+'json/data_news_categories.php')
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             isLoading: false,
             categories: responseJson
           }, function() {
           });
         })
         .catch((error) => {
           console.error(error);
         });
     }


PostsByCategory=(news_category_id, news_category_name)=>{
      this.props.navigation.navigate('PostsByCategoryScreen', { IdCategory: news_category_id, TitleCategory: news_category_name });    
}

  render () {

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
  data={ this.state.categories }
  renderItem={({ item }) => (
    <TouchableOpacity onPress={this.PostsByCategory.bind(this, item.news_category_id, item.news_category_name)} activeOpacity={1}>
    <View style={{borderWidth: 1, borderColor: '#a0a0a0', paddingHorizontal: 10, paddingVertical: 20, borderRadius: 5}}>
    <View style={{alignContent: 'center', alignItems: 'center'}}>
    <Text numberOfLines={2} style={{color: '#a0a0a0'}}>{item.news_category_name}</Text>
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


    )
  }
}