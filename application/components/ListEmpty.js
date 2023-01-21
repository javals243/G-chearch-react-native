import React, {Component} from 'react';
import{ Image, View, Dimensions, Text} from 'react-native';
import { withNavigation } from '@react-navigation/compat';
import Strings from '../utils/Strings';


const { width, height } = Dimensions.get('window'); 

class ListEmpty extends React.Component {

  render () {

    return (

    <View style={{height: height * 0.6, width: width, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF' }}>
      <Image source={require('../../assets/images/emptylist.png')} style={{width: 70, height: 70, marginBottom: 15, opacity: 0.38}} resizeMode="contain" />
      <Text style={{fontSize: 16, fontWeight: 'bold',  marginBottom: 8, color: '#000', opacity: 0.6}}>{this.props.title}</Text>
      <Text style={{fontSize: 13, marginBottom: 15, color: '#000', opacity: 0.5}}>{this.props.subtitle}</Text>
    </View>

    )
  }

}

export default withNavigation(ListEmpty);
