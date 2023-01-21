import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import PlacesCategoriesScreen from '../screens/PlacesCategories';
import OffersCategoriesScreen from '../screens/OffersCategories';
import PlacesByCategoryScreen from '../screens/PlacesByCategory';
import OffersByCategoryScreen from '../screens/OffersByCategory';
import PostsByCategoryScreen from '../screens/PostsByCategory';
import PlaceDetailsScreen from '../screens/PlaceDetails';
import OfferDetailsScreen from '../screens/OfferDetails';
import OrderDetailsScreen from '../screens/OrderDetails';
import PostDetailsScreen from '../screens/PostDetails';
import CategoryByTypeScreen from '../screens/CategoryByType';
import ProfileScreen from "../screens/Profile";
import NewsScreen from "../screens/News";
import LogoutScreen from "../screens/Logout";
import SettingsScreen from "../screens/Settings";
import TermsScreen from "../screens/Terms";
import AboutUsScreen from "../screens/AboutUs";
import ContactUsScreen from "../screens/ContactUs";
import PaypalScreen from "../screens/Paypal";
import StripeScreen from "../screens/Stripe";
import SearchScreen from "../screens/Search";
import CategoriesScreen from "../screens/Categories";
import { Ionicons } from '@expo/vector-icons';
import Strings from '../utils/Strings';

var styles = require('../../assets/files/Styles');

const Stack = createStackNavigator();

export default function Logged(props){

  const {navigation} = props;

  const navigationOptions = {
    headerStyle: styles.headerStyle,
    headerBackTitle: null,
    headerTintColor: '#fff',
    headerTitleAlign: 'center',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center',
      justifyContent: 'space-between',
      fontSize: 16,
      color: '#fff',
      fontWeight: 'bold'
    },
    headerBackTitleVisible:false,
  }

const buttonLeft = () => {
  return (
    <Ionicons name={'md-arrow-back'} onPress={ () => { navigation.goBack() }} style={styles.arrowbackicon}/>
    )
};

return (
	<Stack.Navigator screenOptions={navigationOptions}>
	<Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
  <Stack.Screen name="PlacesCategoriesScreen" component={PlacesCategoriesScreen} options={{ title: Strings.ST1 }}/>
  <Stack.Screen name="OffersCategoriesScreen" component={OffersCategoriesScreen} options={{ title: Strings.ST2 }}/>
  <Stack.Screen name="PlacesByCategoryScreen" component={PlacesByCategoryScreen}/>
  <Stack.Screen name="OffersByCategoryScreen" component={OffersByCategoryScreen}/>
  <Stack.Screen name="PostsByCategoryScreen" component={PostsByCategoryScreen}/>
  <Stack.Screen name="PlaceDetailsScreen" component={PlaceDetailsScreen}/>
  <Stack.Screen name="OfferDetailsScreen" component={OfferDetailsScreen}/>
  <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} options={{ title: Strings.ST62 }}/>
  <Stack.Screen name="PostDetailsScreen" component={PostDetailsScreen}/>
  <Stack.Screen name="CategoryByTypeScreen" component={CategoryByTypeScreen}/>
  <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: Strings.ST6 }}/>
  <Stack.Screen name="NewsScreen" component={NewsScreen} options={{ title: Strings.ST46 }}/>
  <Stack.Screen name="LogoutScreen" component={LogoutScreen}/>
  <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ title: Strings.ST7 }}/>
  <Stack.Screen name="TermsScreen" component={TermsScreen} options={{ title: Strings.ST82 }}/>
  <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} options={{ title: Strings.ST9 }}/>
  <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} options={{ title: Strings.ST73 }}/>
  <Stack.Screen name="PaypalScreen" component={PaypalScreen} options={{ title: Strings.ST71 }}/>
  <Stack.Screen name="StripeScreen" component={StripeScreen} options={{ title: Strings.ST71 }}/>
  <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ title: Strings.ST19 }}/>
  <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} options={{ title: Strings.ST98 }}/>
	</Stack.Navigator>
	)

}
