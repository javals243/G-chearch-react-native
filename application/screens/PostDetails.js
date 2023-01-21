import React, {Component} from 'react';
import { Container, Content, Body, Text, List, Right, Button, ListItem} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { ImageBackground, Dimensions, View, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Linking, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ConfigApp from '../utils/ConfigApp';
import Strings from '../utils/Strings';
import BannerAd from '../components/BannerAd';
import HTML from 'react-native-htmlview';
import * as firebase from 'firebase';
import Toast from 'react-native-root-toast';
import ToastModal from '../components/ToastModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class PostDetails extends Component {

  constructor(props) {
    super(props)
    this.state = {
      item: this.props.route.params.item,
    };
  }

  componentDidMount() {
    
      this.props.navigation.setOptions({
        title: this.props.route.params.item.news_title,
      });

      const {item} = this.state;

      this.renderBookMark(item.news_id);
}

renderBookMark = async (news_id) => {
 await AsyncStorage.getItem('posts').then(token => {
   const res = JSON.parse(token);
    if (res !== null) {
      let data = res.find(value => value.news_id === news_id);

   if (data !== null) {
    let data = res.find(value => value.news_id === news_id);
    return data == null
    ? this.setState({ bookmark: false })
    : this.setState({ bookmark: true });
  }

  } else {
    return false;
  }

});
};

saveBookmark = async (uid, news_id, news_title, news_image, news_date, category_name, news_description) => {
  this.setState({ bookmark: true });

  let bookmarkItem = {
            userId: uid,
            news_id: news_id,
            news_title: news_title,
            news_image: news_image,
            news_date: news_date,
            category_name: category_name,
            news_description: news_description
  }

  await AsyncStorage.getItem('posts').then(token => {
    const res = JSON.parse(token);
    if (res !== null) {
      let data = res.find(value => value.news_id === news_id);
      if (data == null) {
        res.push(bookmarkItem);
        AsyncStorage.setItem('posts', JSON.stringify(res));
      }
    } else {
      let posts = [];
      posts.push(bookmarkItem);
      AsyncStorage.setItem('posts', JSON.stringify(posts));
    }
  });
};

removeBookmark = async (news_id) => {
 this.setState({ bookmark: false });
 const posts = await AsyncStorage.getItem('posts').then(token => {
   const res = JSON.parse(token);
   return res.filter(e => e.news_id !== news_id);
 });
 await AsyncStorage.setItem('posts', JSON.stringify(posts));
};

  render() {

    const {item} = this.state;  
    var user = firebase.auth().currentUser;

    return (
<Container style={styles.background_general}>

<ScrollView>

<ImageBackground source={{uri: ConfigApp.URL+'images/'+item.news_image}} style={{ height: height * 0.28,  width : null}}>
    <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.6)']} style={{ alignItems: 'flex-start', justifyContent: 'flex-end', height: height * 0.28, paddingBottom: 12, paddingLeft: 12, paddingRight: 12,   width : null}}>
    <Text style={styles.postDetail_tag}>{item.category_name}</Text>
    <Text numberOfLines={3} style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold', marginBottom: 5}}>{item.news_title}</Text>
    <Text style={styles.postDetail_date}>{item.news_date}</Text>
    </LinearGradient>
</ImageBackground>

          {this.state.bookmark ? (
      <TouchableOpacity style={styles.readmore} onPress={this.removeBookmark.bind(this, item.offer_id)} activeOpacity={0.8}>
      <Icon name="md-heart" style={styles.readmoreIcon}/>
      </TouchableOpacity>

      ) : (

      <TouchableOpacity style={styles.readmore} onPress={this.saveBookmark.bind(this, user.uid, item.news_id, item.news_title, item.news_image, item.news_date, item.category_name, item.news_description)} activeOpacity={0.8}>
      <Icon name="md-heart" style={styles.readmoreGrayIcon}/>
      </TouchableOpacity>
      )}

<View style={{margin: 15, marginBottom: 5}}>

<HTML value={item.news_description} onLinkPress={(evt, href) => { Linking.openURL(href); }} />
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

