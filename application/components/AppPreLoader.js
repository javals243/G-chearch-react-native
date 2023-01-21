import React, { Component } from 'react';
import {ActivityIndicator, View, StyleSheet, Dimensions} from 'react-native';
import ColorsApp from '../utils/ColorsApp';
const {width, height} = Dimensions.get('window');

class AppPreLoader extends React.Component {
	
	render (){
		return (
<View style={styles.preloader}>
<ActivityIndicator style={{height: 80}} size="large" color={ColorsApp.PRIMARY} />
</View>
			)
	}
}

const styles = StyleSheet.create({
	preloader:{
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: height,
		backgroundColor: '#FFFFFF',
	}
})

export default AppPreLoader;