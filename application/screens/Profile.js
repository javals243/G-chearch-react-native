import React, {Component} from 'react';
import * as firebase from 'firebase';
import { ImageBackground, TouchableOpacity, Dimensions, View, Image, SafeAreaView, ScrollView, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Container, Content, Body, Thumbnail,Text, List, Right,Left, Button, ListItem, Tab, Tabs} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import ConfigApp from '../utils/ConfigApp';
import TimeAgo from 'react-native-timeago';
import PostFav from '../components/PostFav';
import PlaceFav from '../components/PlaceFav';
import OfferFav from '../components/OfferFav';
import Strings from '../utils/Strings';
import AsyncStorage from '@react-native-async-storage/async-storage';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class Profile extends Component {

constructor(props) {

    super(props);
    this.state = {
      loading: true,
      isLoading: true,
    }

  }

  componentDidMount() {
      
    var user = firebase.auth().currentUser;

       return fetch(ConfigApp.URL+'json/data_orders.php?email='+user.email)
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

  OrderDetails = (item) => {
    this.props.navigation.navigate('OrderDetailsScreen', {item});
  };

  render () {

  var user = firebase.auth().currentUser;
  var email, displayName, emailVerified, creationTime;

  if (user != null) {
  email = user.email;
  displayName = user.displayName;
  emailVerified = user.emailVerified;
  creationTime = user.metadata.creationTime;

  }

    return (

<Container style={styles.background_general}>
<View style={styles.headerProfile}>
    <Text style={styles.nameProfile}>{displayName}</Text>
    <Text style={{color: '#fff', fontSize: 14, marginTop: 6, textTransform: 'uppercase', opacity: 0.7}}> {Strings.ST65} <TimeAgo time={creationTime} hideAgo={true}/></Text>
</View>

<Tabs tabBarUnderlineStyle={{backgroundColor: '#ffffff'}} tabContainerStyle={{ elevation:0 }}>
<Tab heading={Strings.ST56} tabStyle={styles.tabs} activeTabStyle={styles.activetabs} textStyle={styles.tabs_text} activeTextStyle={styles.activetabs_text}>
             
<ScrollView>     
             
  <OfferFav />
  <PlaceFav />
  <PostFav />

</ScrollView>
</Tab>

<Tab heading={Strings.ST47} tabStyle={styles.tabs} activeTabStyle={styles.activetabs} textStyle={styles.tabs_text} activeTextStyle={styles.activetabs_text}>

<List>

<FlatList
          data={ this.state.dataSource }
          refreshing="false"
          renderItem={({item}) =>
                
            <ListItem style={{paddingLeft: 0, marginLeft: 0, backgroundColor:'#FFF', opacity: 1, borderColor: 'rgba(0,0,0,0.05)', borderBottomWidth: 1}}  onPress={() => this.OrderDetails(item)} >
              <Thumbnail rounded size={80} source={{ uri: ConfigApp.URL+'images/'+item.offer_image }} style={{paddingLeft: 10, marginLeft: 10}} />
              <Body style={{paddingLeft: 0, marginLeft: 0}}>
                <Text numberOfLines={2} style={{fontSize: 14, marginBottom: 3}}>
                {item.offer_title}
                </Text>
              </Body>
              <Right>
                <Text note>
                <Icon name="arrow-right" style={{fontSize: 16}}/>
                </Text>
              </Right>
            </ListItem>
          
}
        keyExtractor={(item, index) => index.toString()}

        /> 

</List>

</Tab>

</Tabs>

</Container>

    )
  }

}