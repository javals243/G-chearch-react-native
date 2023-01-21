import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Dimensions, ScrollView, View, Image, TouchableOpacity} from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Thumbnail, Button, Body, Right, Switch } from 'native-base';
import Strings from '../utils/Strings';
import ColorsApp from '../utils/ColorsApp';
import Icon from 'react-native-vector-icons/AntDesign';

var {height, width} = Dimensions.get('window');
var styles = require('../../assets/files/Styles');

export default class SideMenu extends Component {
  
  navigateToScreen = (route) => () => {
    this.props.navigation.navigate(route);
  }

  render () {
    return (

		<View style={styles.container_menu}>
          <View style={styles.sideMenu}>
<Image
      source={require('../../assets/images/logo.png')}
      style={{flex: 1, width: 120, height: 120}}
      resizeMode='contain'/>
</View>

        <ScrollView>

              <ListItem style={styles.item_menu} onPress={this.navigateToScreen('PlacesCategoriesScreen')} icon>
            <Left style={{borderBottomWidth: 0}}>
                <Icon name="isv" style={styles.iconSidemenu}/>
            </Left>
            <Body style={{borderBottomWidth: 0}}>
                <Text style={styles.text_menu}>{Strings.ST1}</Text>
              </Body>
              <Right style={{borderBottomWidth: 0}}>
                <Icon name="right" style={styles.icon_menu} />
              </Right>
            </ListItem>

                <ListItem style={styles.item_menu} onPress={this.navigateToScreen('OffersCategoriesScreen')} icon>
                        <Left style={{borderBottomWidth: 0}}>
                <Icon name="gift" style={styles.iconSidemenu}/>
            </Left>
            <Body style={{borderBottomWidth: 0}}>
                <Text style={styles.text_menu}>{Strings.ST2}</Text>
              </Body>
              <Right style={{borderBottomWidth: 0}}>
                <Icon name="right" style={styles.icon_menu} />
              </Right>
            </ListItem>

                <ListItem style={styles.item_menu} onPress={this.navigateToScreen('NewsScreen')} icon>
                        <Left style={{borderBottomWidth: 0}}>
                <Icon name="profile" style={styles.iconSidemenu}/>
            </Left>
            <Body style={{borderBottomWidth: 0}}>
                <Text style={styles.text_menu}>{Strings.ST46}</Text>
              </Body>
              <Right style={{borderBottomWidth: 0}}>
                <Icon name="right" style={styles.icon_menu} />
              </Right>
            </ListItem>

                <ListItem style={styles.item_menu} onPress={this.navigateToScreen('ProfileScreen')} icon>
                        <Left style={{borderBottomWidth: 0}}>
                <Icon name="user" style={styles.iconSidemenu}/>
            </Left>
            <Body style={{borderBottomWidth: 0}}>
                <Text style={styles.text_menu}>{Strings.ST6}</Text>
              </Body>
              <Right style={{borderBottomWidth: 0}}>
                <Icon name="right" style={styles.icon_menu} />
              </Right>
            </ListItem>

                <ListItem style={styles.item_menu} onPress={this.navigateToScreen('SettingsScreen')} icon>
                        <Left style={{borderBottomWidth: 0}}>
                <Icon name="setting" style={styles.iconSidemenu}/>
            </Left>
            <Body style={{borderBottomWidth: 0}}>
                <Text style={styles.text_menu}>{Strings.ST7}</Text>
              </Body>
              <Right style={{borderBottomWidth: 0}}>
                <Icon name="right" style={styles.icon_menu} />
              </Right>
            </ListItem>
 
        </ScrollView>

        <TouchableOpacity onPress={this.navigateToScreen('LogoutScreen')} activeOpacity={1}>
        <View style={styles.footer_menu}>
          <Text style={{fontSize: 15, color: '#fff'}}>{Strings.ST8}</Text>
        </View>
        </TouchableOpacity>


      </View>

    )
  }
}