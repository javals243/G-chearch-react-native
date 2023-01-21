import React, {Component} from 'react';
import AppPreLoader from '../components/AppPreLoader';
import { TouchableOpacity, Dimensions, View, ActivityIndicator } from 'react-native';
import {WebView} from 'react-native-webview';
import {Grid, Row, Col } from 'react-native-easy-grid';
import { Container, Text} from 'native-base';
import ConfigApp from '../utils/ConfigApp';
import Strings from '../utils/Strings';
import ColorsApp from '../utils/ColorsApp';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class Stripe extends Component {

constructor(props) {

    super(props);
    this.state = {
      isOpen: false,
    };
  }

 ActivityIndicatorLoadingView() {
    
    return (
 
<ActivityIndicator
      style={{
        flex: 1,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center' }}
        size="large"
        color={ColorsApp.PRIMARY}
        />

    );
  }

  render () {

  var OfferId = this.props.route.params.OfferId;
  var UserId = this.props.route.params.UserId;
  var UserEmail = this.props.route.params.UserEmail;
  var UrlPayment = ConfigApp.URL+'payment/stripe/index.php?id_offer='+OfferId+'&email_user='+UserEmail;

    return (

<Container style={styles.background_general}>

 <WebView 
         source={{uri: UrlPayment}} 
         javaScriptEnabled={true}
         domStorageEnabled={true}
         renderLoading={this.ActivityIndicatorLoadingView} 
         startInLoadingState={true}  
         />

</Container>

    )
  }

}