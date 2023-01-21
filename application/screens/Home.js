import React, {Component} from 'react';
import { ImageBackground, Dimensions, View, ScrollView, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text, Footer, Icon, FooterTab, Button, Left, Right, Title, List, ListItem, Thumbnail, Item, Input} from 'native-base';
import {Grid, Row, Col } from 'react-native-easy-grid';
import Icono from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import ConfigApp from '../utils/ConfigApp';
import ColorsApp from '../utils/ColorsApp';
import AppPreLoader from '../components/AppPreLoader';
import GridView from 'react-native-super-grid';
import Strings from '../utils/Strings';
import PlaceRating from '../components/PlaceRating';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');
const equalWidth =  (width / 2 );

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      places:[],
      news:[],
      offers:[],
      string: ''
    };
  }

  navigateToScreen = (route) => () => {
    this.props.navigation.navigate(route);
  }

  componentDidMount() {
    
    var request_1_url = ConfigApp.URL+'json/data_places.php';
    var request_2_url = ConfigApp.URL+'json/data_news.php';
    var request_3_url = ConfigApp.URL+'json/data_offers.php';

    fetch(request_1_url).then((response) => response.json()).then((responseJson)  => {
        this.setState({
            places: responseJson.filter(x => x.place_featured == 'Yes')
        });
    }).then(()=>{
        fetch(request_2_url).then((response) => response.json()).then((responseJson) => {
         this.setState({
            news: responseJson.filter((e, index) => { return  e.news_status == 'Published' && index < 5 }),

         });

     }).done();
    }).then(()=>{
        fetch(request_3_url).then((response) => response.json()).then((responseJson) => {
         this.setState({
            offers: responseJson.filter(x => x.offer_featured == 'Yes'),
            isLoading: false,
         });
         
     }).done();
    }).done();

     }

  search=(string)=>{
      this.props.navigation.navigate('SearchScreen', { string: this.state.string });    
  }

    PlaceDetails = (item) => {
    this.props.navigation.navigate('PlaceDetailsScreen', {item});
  };

  OfferDetails = (item) => {
    this.props.navigation.navigate('OfferDetailsScreen', {item});
  };

  PostDetails = (item) => {
    this.props.navigation.navigate('PostDetailsScreen', {item});
  };

  news = () => {
    this.props.navigation.navigate('NewsScreen');
  }

  offers = () => {
    this.props.navigation.navigate('OffersCategoriesScreen');
  }

  places = () => {
    this.props.navigation.navigate('PlacesCategoriesScreen');
  }

  render () {

      if (this.state.isLoading) {
      return (
        <AppPreLoader/>
      );
    }

    return (

<Container style={styles.background_general}>

<LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.0)']} style={{position: 'absolute', top: 0, zIndex: 100, paddingTop: 55, paddingHorizontal: 30, width: width}}>
</LinearGradient>


<ScrollView>


<LinearGradient colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.0)']} style={{position: 'absolute', top: 0, zIndex: 100, paddingTop: 55, paddingHorizontal: 30, width: width}}>

<Grid >
    <Col style={{alignItems: 'flex-start', alignContent: 'flex-start', justifyContent: 'flex-start'}}>
      <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} activeOpacity={1}>
<Icono name="md-menu" style={{fontSize: 27, color: '#FFFFFF'}}/>
</TouchableOpacity>
    </Col>
    <Col style={{alignItems: 'flex-end', alignContent: 'flex-end', justifyContent: 'flex-end'}}>
    <TouchableOpacity onPress={this.search.bind(this)}  activeOpacity={1}>
<Icono name="md-search" style={{fontSize: 27, color: '#FFFFFF'}}/>
</TouchableOpacity>
    </Col>
</Grid>
</LinearGradient>


<ImageBackground source={require('../../assets/images/header.jpg')} style={{flexDirection:'column',height: height * 0.35, alignItems: 'center', justifyContent: 'center' }}>
<View style={{width: width*0.8, alignItems: 'center'}}>
<Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 5 , marginTop: 40}}>{Strings.ST38}</Text>
<Text style={{color: '#fff', fontSize: 16, fontWeight: '300'}}>{Strings.ST39}</Text>

<Item regular style={{ backgroundColor: 'transparent', borderColor: 'transparent', marginTop: 10}}>
    <Input placeholder={Strings.ST92} onChangeText={string => this.setState({string})} style={styles.inputhome}/>
    <TouchableOpacity onPress={this.search.bind(this)} activeOpacity={1}>
    <View style={styles.inputBgicon}>
    <Icono name='md-search' style={{color: '#FFF', fontSize: 22}} />
    </View>
    </TouchableOpacity> 
</Item>

</View>
</ImageBackground>

          <ListItem icon style={{borderBottomWidth: 0, marginTop: 10}}>
            <Body style={{borderBottomWidth: 0}}>
              <Text style={{fontSize: 14, fontWeight: 'bold', color: 'rgba(0,0,0,0.6)' }}>{Strings.ST40.toUpperCase()}</Text>
            </Body>
            <Right style={{borderBottomWidth: 0}}>
                  <TouchableOpacity onPress={this.places.bind(this)} activeOpacity={1}>
                  <View style={{padding: 3, paddingRight: 11, paddingLeft: 11, borderWidth: 1, borderRadius: 50, borderColor: 'rgba(0,0,0,0.2)'}}>
                  
                  <Text style={{fontSize: 10, color: 'rgba(0,0,0,0.2)'}}> {Strings.ST43.toUpperCase()} <Icono active name="ios-arrow-forward" /></Text>
                  </View>
                  </TouchableOpacity>
            </Right>
          </ListItem>

<View style={{padding: 5, backgroundColor: '#FFF', paddingTop: 0}}>

<GridView
  itemDimension={130}
  spacing={8}
  data={ this.state.places }
  renderItem={({ item }) => (
    <TouchableOpacity onPress={() => this.PlaceDetails(item)} activeOpacity={1}>
    <ImageBackground source={{uri: ConfigApp.URL+'images/'+item.place_image}} style={{ height: 130,  width : null, borderRadius: 10}} imageStyle={{ borderRadius: 10 }}>
    <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)']} style={{ alignItems: 'flex-start', borderRadius: 10, justifyContent: 'flex-end', height: 130, paddingBottom: 12, paddingLeft: 12, paddingRight: 12,   width : null}}>
    <Text numberOfLines={1} style={{ color: '#FFF', fontSize: 13, marginBottom: 4}}>{item.place_name}</Text>
    <PlaceRating placeId={item.place_id}/>
    </LinearGradient>
    </ImageBackground>
    </TouchableOpacity>

    )}
/>

          <ListItem icon style={{borderBottomWidth: 0, marginTop: 10}}>
            <Body style={{borderBottomWidth: 0}}>
              <Text style={{fontSize: 14, fontWeight: 'bold', color: 'rgba(0,0,0,0.6)' }}>{Strings.ST41.toUpperCase()}</Text>
            </Body>
            <Right style={{borderBottomWidth: 0}}>
                  <TouchableOpacity onPress={this.offers.bind(this)} activeOpacity={1}>
                  <View style={{padding: 3, paddingRight: 11, paddingLeft: 11, borderWidth: 1, borderRadius: 50, borderColor: 'rgba(0,0,0,0.2)'}}>
                  
                  <Text style={{fontSize: 10, color: 'rgba(0,0,0,0.2)'}}> {Strings.ST43.toUpperCase()} <Icono active name="ios-arrow-forward" /></Text>
                  </View>
                  </TouchableOpacity>
            </Right>
          </ListItem>

    <View style={{padding: 7}}>
    <FlatList
          data={ this.state.offers }
          refreshing="false"
          renderItem={({item}) => (
    <TouchableOpacity onPress={() => this.OfferDetails(item)} activeOpacity={1}>
    <View style={{ marginBottom: 10 }}>
    <ImageBackground source={{uri: ConfigApp.URL+'images/'+item.offer_image}} style={{ height: 130,  width : null, borderTopLeftRadius: 10, borderTopRightRadius: 10, overflow: 'hidden'}} imageStyle={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, overflow: 'hidden' }}>
    </ImageBackground>
    <View style={{ paddingBottom: 12, paddingTop: 12, paddingLeft: 12,  width : null, borderColor: '#EEE', borderTopWidth: 0, borderWidth: 1, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
    <Text numberOfLines={2} style={{ color: '#000', fontSize: 14, fontWeight: 'bold', marginBottom: 5}}>{item.offer_title}</Text>
    <Grid style={{marginTop: 5}}>
    <Col>
      <View style={styles.saveHomePrice}><Text style={styles.saveTextHomePrice}>{Strings.ST17} {item.save}{Strings.ST15}</Text></View>

    </Col>
    <Col style={{alignItems:'flex-end' }}>
    <Text style={{ color: '#828282', fontSize: 12, paddingRight: 12, textDecorationLine: 'line-through'  }}>{item.offer_oldprice} {Strings.ST15}</Text>
    <Text style={{ color: ColorsApp.PRIMARY, fontSize: 18, fontWeight: 'bold', paddingRight: 12 }}>{item.offer_price}{Strings.ST15}</Text>
    </Col>
    </Grid>
    </View>
    </View>
    </TouchableOpacity>


    )}
keyExtractor={(item, index) => index.toString()}

        />
</View>

          <ListItem icon style={{borderBottomWidth: 0, marginTop: 10}}>
            <Body style={{borderBottomWidth: 0}}>
              <Text style={{fontSize: 14, fontWeight: 'bold', color: 'rgba(0,0,0,0.6)' }}>{Strings.ST42.toUpperCase()}</Text>
            </Body>
            <Right style={{borderBottomWidth: 0}}>
                  <TouchableOpacity onPress={this.news.bind(this)} activeOpacity={1}>
                  <View style={{padding: 3, paddingRight: 11, paddingLeft: 11, borderWidth: 1, borderRadius: 50, borderColor: 'rgba(0,0,0,0.2)'}}>
                  
                  <Text style={{fontSize: 10, color: 'rgba(0,0,0,0.2)'}}> {Strings.ST43.toUpperCase()} <Icono active name="ios-arrow-forward" /></Text>
                  </View>
                  </TouchableOpacity>
            </Right>
          </ListItem>

<List>

<FlatList
          data={ this.state.news }
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

</View>


<View style={{height: 50}}>
</View>

</ScrollView>

</Container>


    )
  }
}