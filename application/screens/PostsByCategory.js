import React, {Component} from 'react';
import AppPreLoader from '../components/AppPreLoader'; 
import { ImageBackground, Dimensions, View, TouchableOpacity, FlatList, Button, ActivityIndicator, Image, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import {Grid, Row } from 'react-native-easy-grid';
import { Container, Text, Body, Right, List, ListView, Thumbnail, ListItem} from 'native-base';
import ConfigApp from '../utils/ConfigApp';
import Strings from '../utils/Strings';
import BannerAd from '../components/BannerAd';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class PostsByCategory extends Component {

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

       return fetch(ConfigApp.URL+'json/data_news.php?category='+this.props.route.params.IdCategory)
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             isLoading: false,
              dataSource: responseJson.filter((e, index) => { return  e.news_status == 'Published'})
           }, function() {
           });
         })
         .catch((error) => {
           console.error(error);
         });
     }

  PostDetails = (item) => {
    this.props.navigation.navigate('PostDetailsScreen', {item});
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

<List>

<FlatList
          data={ this.state.dataSource }
          refreshing="false"
          renderItem={({item}) =>
                
            <ListItem style={{paddingLeft: 0, marginLeft: 0, backgroundColor:'#FFF', opacity: 1, borderColor: 'rgba(0,0,0,0.05)', borderBottomWidth: 1}}  onPress={() => this.PostDetails(item)} >
              <Thumbnail rounded size={80} source={{ uri: ConfigApp.URL+'images/'+item.news_image }} style={{paddingLeft: 10, marginLeft: 10}} />
              <Body style={{paddingLeft: 0, marginLeft: 0}}>
                <Text numberOfLines={1} style={{fontSize: 14, marginBottom: 3}}>
                {item.news_title}
                </Text>
                <Text note>
                {item.category_name}
                </Text>
              </Body>
              <Right>
                <Text note>
                <Icon name="ios-arrow-forward" style={{fontSize: 16}}/>
                </Text>
              </Right>
            </ListItem>
          
}
        keyExtractor={(item, index) => index.toString()}

        /> 

</List>

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

