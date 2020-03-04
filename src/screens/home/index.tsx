import React, { Component } from 'react';
import { View, Text, FlatList, AsyncStorage, StyleSheet, ImageBackground, Image} from 'react-native';
import {  NavigationScreenProp } from 'react-navigation';
interface props{
  navigation: NavigationScreenProp<any,any>
}
interface state{
}

export default class HomeScreen extends Component<props, state> {
  constructor(props: props){
    super(props)
  }
  render() {
    return (
      <View style={styles.mainContainer}>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor:"white", 
    flex:1,
  }
});