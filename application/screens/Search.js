import React, {Component} from 'react';
import AppPreLoader from '../components/AppPreLoader';
import {TouchableOpacity, Dimensions, View, Image, FlatList, ScrollView} from 'react-native';
import {Grid, Row, Col } from 'react-native-easy-grid';
import { Container, Header, Content, Card, CardItem, Body, Text, Tabs, Tab, Footer, Icon, Item, Input, FooterTab, Button, Left, Right, Title, List, ListItem, Thumbnail} from 'native-base';
import ConfigApp from '../utils/ConfigApp';
import ColorsApp from '../utils/ColorsApp';
import Strings from '../utils/Strings';
import Icono from 'react-native-vector-icons/Ionicons';
import ListEmpty from '../components/ListEmpty';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class AboutUs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: true,
      places:[],
      string: this.props.route.params.string,
      word: this.props.route.params.string
    };

  }

    componentDidMount() {

      this.makeRemoteRequest();
  }

  makeRemoteRequest = (string) => {
    
       this.setState({string});

    var places = ConfigApp.URL+'json/data_searchplaces.php?string='+this.state.string;
    var offers = ConfigApp.URL+'json/data_searchoffers.php?string='+this.state.string;

    fetch(places).then((response) => response.json()).then((responseJson)  => {

        if (responseJson == 'false') {
        }else if(this.state.string !== '' && this.state.string !== null){
          this.setState({
            places: responseJson
        });
        }

    }).then(()=>{
        fetch(offers).then((response) => response.json()).then((responseJson) => {

        if (responseJson == 'false') {
        }else if (this.state.string !== '' && this.state.string !== null){
          this.setState({
            offers: responseJson,
            isLoading: false,
        });
        }
     }).done();
    }).done();

     }


  ListEmptyView = () => {
    return (
      <ListEmpty title={Strings.ST101} subtitle={Strings.ST100}/>
    );
  }

  OfferDetails = (item) => {
    this.props.navigation.navigate('OfferDetailsScreen', {item});
  };

  PlaceDetails = (item) => {
    this.props.navigation.navigate('PlaceDetailsScreen', {item});
  };

  render () {

    if (this.state.isLoading) {
      return (
        <ActivityIndicator style={{height: 80}} size="large" color="#DDD" />
      );
    }

    return (

<Container style={styles.background_general}>
<View style={{flex: 1}}>
<View style={{backgroundColor: ColorsApp.PRIMARY, alignItems: 'center', width: width}}>
<Item regular style={{ backgroundColor: '#fff', borderColor: 'transparent', width: width * 0.9, paddingHorizontal: 20, alignItems: 'center', marginVertical: 10, borderRadius: 50}}>
    <Input placeholder={Strings.ST99} onChangeText={this.makeRemoteRequest.bind(this)} style={{fontSize: 14}}/>
    <Icono name='md-search' style={{color: ColorsApp.TERTIARY, fontSize: 22}} />
</Item>
</View>

        <Tabs tabBarUnderlineStyle={{backgroundColor: '#ffffff'}} tabContainerStyle={{ elevation:0 }}>
          <Tab heading={Strings.ST1} tabStyle={styles.tabs} activeTabStyle={styles.activetabs} textStyle={styles.tabs_text} activeTextStyle={styles.activetabs_text}>
            

<View style={{marginHorizontal: 12, marginTop: 10,marginBottom: 5}}>
{this.state.word == '' && this.state.string == null ? <Text></Text> : <Text style={{fontSize: 14 }}>{Strings.ST93} <Text style={{fontWeight: 'bold', fontSize: 14 }}> {this.state.string == null ? this.state.word : this.state.string }</Text> </Text>}
</View>

<List>

<FlatList
          data={ this.state.places }
          refreshing="false"
          renderItem={({item}) =>
                
            <ListItem style={{paddingLeft: 0, marginLeft: 0, backgroundColor:'#FFF', opacity: 1, borderColor: 'rgba(0,0,0,0.05)', borderBottomWidth: 1}}  onPress={() => this.PlaceDetails(item)} >
              <Thumbnail size={80} source={{ uri: ConfigApp.URL+'images/'+item.place_image }} style={{paddingLeft: 10, marginLeft: 10, borderRadius: 10}} />
              <Body style={{paddingLeft: 0, marginLeft: 0}}>
                <Text numberOfLines={1} style={{fontSize: 14, fontWeight: 'bold', marginBottom: 5}}>
                {item.place_name}
                </Text>
                <Text numberOfLines={1} style={{fontSize: 12, marginBottom: 5, color: '#000', opacity: 0.6}}>
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
        ListEmptyComponent={this.ListEmptyView}

        /> 

</List>


          </Tab>
          <Tab heading={Strings.ST2} tabStyle={styles.tabs} activeTabStyle={styles.activetabs} textStyle={styles.tabs_text} activeTextStyle={styles.activetabs_text}>
            

<View style={{marginHorizontal: 12, marginTop: 10,marginBottom: 5}}>
{this.state.word == '' && this.state.string == null ? <Text></Text> : <Text style={{fontSize: 14 }}>{Strings.ST93} <Text style={{fontWeight: 'bold', fontSize: 14 }}> {this.state.string == null ? this.state.word : this.state.string }</Text> </Text>}
</View>

<List>

<FlatList
          data={ this.state.offers }
          refreshing="false"
          renderItem={({item}) =>
                
            <ListItem style={{paddingLeft: 0, marginLeft: 0, backgroundColor:'#FFF', opacity: 1, borderColor: 'rgba(0,0,0,0.05)', borderBottomWidth: 1}}  onPress={() => this.OfferDetails(item)} >
              <Thumbnail size={80} source={{ uri: ConfigApp.URL+'images/'+item.offer_image }} style={{paddingLeft: 10, marginLeft: 10, borderRadius: 10}} />
              <Body style={{paddingLeft: 0, marginLeft: 0}}>
                <Text numberOfLines={1} style={{fontSize: 14, fontWeight: 'bold', marginBottom: 5}}>
                {item.offer_title}
                </Text>
                <Text numberOfLines={1} style={{fontSize: 12, marginBottom: 5, color: '#000', opacity: 0.6}}>
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
        ListEmptyComponent={this.ListEmptyView}

        /> 

</List>


          </Tab>
        </Tabs>


<View style={{height: height * 0.10}}/>


</View>

</Container>

    )
  }

}