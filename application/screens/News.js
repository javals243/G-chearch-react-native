import React, {Component} from 'react';
import { ImageBackground, Dimensions, View, ScrollView, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text, Footer, FooterTab, Icon, Button, Left, Right, Title, List, ListItem, Thumbnail} from 'native-base';
import {Grid, Row, Col } from 'react-native-easy-grid';
import { LinearGradient } from 'expo-linear-gradient';
import ConfigApp from '../utils/ConfigApp';
import AppPreLoader from '../components/AppPreLoader';
import Strings from '../utils/Strings';
import BannerAd from '../components/BannerAd';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');
const equalWidth =  (width / 2 );

export default class News extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    
       return fetch(ConfigApp.URL+'json/data_news.php')
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             isLoading: false,
             posts: responseJson.filter((e, index) => { return index < 10 && e.news_status == 'Published' })
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
  
  categories = () => {
    this.props.navigation.navigate('CategoriesScreen');
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

<View style={{margin: 10, marginTop: 20}}>

<TouchableOpacity onPress={this.categories.bind(this)} activeOpacity={1}>
<View style={{borderWidth: 1, borderRadius: 6, borderColor: '#a0a0a0', padding: 10, alignItems: 'center', justifyContent: 'center'  }}>
<Text style={{color: '#a0a0a0'}}>{Strings.ST98}</Text>
</View>
</TouchableOpacity>

<Grid style={{padding: 0, marginTop: 20, paddingBottom: 5}}>
    <Col style={{alignItems: 'flex-start', alignContent: 'flex-start', justifyContent: 'flex-start'}}>
      <Text style={{color: '#000', fontWeight: 'bold'}}>{Strings.ST42}</Text>
    </Col>
    <Col style={{alignItems: 'flex-end', alignContent: 'flex-end', justifyContent: 'flex-end'}}>
    
    </Col>
</Grid>

</View>

<List>

<FlatList
          data={ this.state.posts }
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

<View style={{height: height*0.10}}>
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

