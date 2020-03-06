import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
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
          {/* <Text>{'splash'}</Text> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor:"#3884D9", 
    flex:1,
  }
});