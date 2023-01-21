import React, {Component} from 'react';
import{ Image, View, Dimensions, Text} from 'react-native';
import { withNavigation } from '@react-navigation/compat';
import Strings from '../utils/Strings';

const { width, height } = Dimensions.get('window'); 

class FavListEmpty extends React.Component {

  render () {

    return (

    <View style={{height: height * 0.1, width: width, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF' }}>
      <Text style={{fontSize: 16, fontWeight: 'bold',  marginBottom: 8, color: '#000', opacity: 0.6, marginTop: 8}}>{Strings.ST66}</Text>
      <Text style={{fontSize: 13, marginBottom: 15, color: '#000', opacity: 0.5}}>{Strings.ST67}</Text>
    </View>

    )
  }

}

export default withNavigation(FavListEmpty);
