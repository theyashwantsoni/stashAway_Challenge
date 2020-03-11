import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar} from 'react-native';
import {  NavigationScreenProp } from 'react-navigation';

interface props{
  navigation: NavigationScreenProp<any,any>
}
interface state{
}

export default class SplashScreen extends Component<props, state> {
  constructor(props: props){
    super(props)
  }

  componentDidMount(){
    this._splashTimer();
  }
  _splashTimer():void{
    setTimeout(()=>{
      this.props.navigation.navigate('home');
    },3000)
  }
  render() {
    return (
      <View style={styles.mainContainer}>
          <StatusBar backgroundColor="#F5F6FA" barStyle="dark-content"></StatusBar>
          <Text style={{color:'#1F3279',fontFamily:'Montserrat-Bold',fontSize:32}}>{'Eatery'}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor:"#F5F6FA", 
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
});