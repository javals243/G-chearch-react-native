import React, {Component} from 'react';
import * as firebase from 'firebase';
import { withNavigation } from '@react-navigation/compat';
import { TouchableOpacity, Dimensions, View, Image, ScrollView, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Container, Body, Thumbnail, Text, List, Right, ListItem} from 'native-base';
import ConfigApp from '../utils/ConfigApp';
import FavListEmpty from './FavListEmpty';
import Strings from '../utils/Strings';
import AsyncStorage from '@react-native-async-storage/async-storage';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

class PostFav extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      posts: []
    }

  }

  componentDidMount () {
    this.fetchPosts();
  }

  PostDetails = (item) => {
    this.props.navigation.navigate('PostDetailsScreen', {item});
  };

  renderFooterPosts = () => {
  const posts = this.state.posts
  if (posts.length != 0) return null;


  return (
    <FavListEmpty/>
   );
};

removePost = async (news_id) => {
try {

var user = firebase.auth().currentUser;
uid = user.uid;

const posts = await AsyncStorage.getItem('posts');
let postsFav = JSON.parse(posts);
postsItems = postsFav.filter(function(e){ return e.news_id !== news_id && e.userId == uid })

await AsyncStorage.setItem('posts', JSON.stringify(postsItems));

this.setState({ 
...this.state, 
posts: postsItems || [] 
}); 

} catch(error) {

}}; 

  render () {

    return (

<List>

<ListItem itemDivider>
              <Text>{Strings.ST46}</Text>
            </ListItem>    

<FlatList
          data={this.state.posts}
          refreshing="true"
          renderItem={({item, index}) =>

<ListItem style={{paddingLeft: 0, marginLeft: 0, backgroundColor:'#FFF', opacity: 1, borderColor: 'rgba(0,0,0,0.05)', borderBottomWidth: 1}}  onPress={() => this.PostDetails(item)} >
              <Thumbnail rounded size={80} source={{ uri: ConfigApp.URL+'images/'+item.news_image }} style={{paddingLeft: 10, marginLeft: 10}} />
              <Body style={{paddingLeft: 0, marginLeft: 0}}>
                <Text numberOfLines={2} style={{fontSize: 14, marginBottom: 3}}>
                {item.news_title}
                </Text>
              </Body>
              <Right>
              <TouchableOpacity onPress={this.removePost.bind(this, item.news_id)} activeOpacity={1}>
                <Text note>
                <Icon name="close" style={{fontSize: 19}}/>
                </Text>
                </TouchableOpacity>

              </Right>
            </ListItem>

          
}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={this.renderFooterPosts}


        /> 

</List>

    )
  }

    async fetchPosts () {
      var user = firebase.auth().currentUser;
      uid = user.uid;

      let postsJSON= await AsyncStorage.getItem('posts');
      let postsFav = JSON.parse(postsJSON);
      postsItems = postsFav.filter(function(e){
            return e.userId == uid
        })
      const postsArray = postsItems || [];
      this.setState({
        ...this.state,
        posts: postsArray
      });
  }

}

export default withNavigation(PostFav);
