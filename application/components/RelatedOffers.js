import React, {Component} from 'react';
import{ Image, View, Dimensions, Text, TouchableOpacity, ImageBackground} from 'react-native';
import { withNavigation } from '@react-navigation/compat';
import Strings from '../utils/Strings';
import GridView from 'react-native-super-grid';
import { LinearGradient } from 'expo-linear-gradient';
import ConfigApp from '../utils/ConfigApp';


const { width, height } = Dimensions.get('window'); 

class RelatedOffers extends React.Component {

  OfferDetails (item) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'OfferDetailsScreen',
      params: {item},
      key: item.offer_id
    });
    this.props.navigation.navigate(navigateAction);
  }

  render () {

    return (
<View>

<View style={{borderTopWidth: 1,  borderBottomWidth: 1, borderColor: '#EEE', paddingTop: 10, paddingBottom: 10, marginTop: 0, marginLeft: 0, paddingLeft: 12, marginBottom: 10}}>
<Text style={{fontWeight: 'bold'}}>{Strings.ST110}</Text>
</View>

<GridView
  itemDimension={130}
  spacing={8}
  data={this.props.items}
  renderItem={({ item }) => (
	<TouchableOpacity onPress={() => this.OfferDetails(item)} activeOpacity={1}>
    <ImageBackground source={{uri: ConfigApp.URL+'images/'+item.offer_image}} style={{ height: 130,  width : null, borderRadius: 10}} imageStyle={{ borderRadius: 10 }}>
    <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)']} style={{ alignItems: 'flex-start', borderRadius: 10, justifyContent: 'flex-end', height: 130, paddingBottom: 12, paddingLeft: 12, paddingRight: 12,   width : null}}>
    <Text numberOfLines={1} style={{ color: '#FFF', fontSize: 13, marginBottom: 4}}>{item.offer_title}</Text>
    </LinearGradient>
    </ImageBackground>
    </TouchableOpacity>

    )}
/>

</View>

    )
  }

}

export default withNavigation(RelatedOffers);
