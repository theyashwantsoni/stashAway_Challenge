import React, { Component } from 'react';
import {Button,TouchableOpacity, View,Text, StyleSheet, TouchableNativeFeedback, ViewStyle }from 'react-native';
import {Platform} from 'react-native';

interface props{
    title: string,
    triggerEvt : (data:any) => void,
    background : {
        color:string,
        ripple:string
    }
}
interface state{

}
export default class FormButton extends Component<props, state> {
    constructor (props : props) {
        super(props)
        this.state  = {
        }
    }
    btnStyle(prop : string): typeof styles.btnStyle{
        return {
          width: "95%",
          height: 55,
          marginRight: "2.5%",
          marginLeft: "2.5%",
          marginBottom: 20,
          padding: 5,
          backgroundColor: prop,
          borderRadius: 16,
          alignItems: "center"
        }
      }
    platformSpecificBtn= ()=>{
        let btnStyle = this.btnStyle(this.props.background.color);
        let ripple = this.props.background.ripple;
        if(Platform.OS == "android"){
          return    <TouchableNativeFeedback
                        onPress={this.props.triggerEvt}
                        background={TouchableNativeFeedback.Ripple(ripple)}>
                        <View style={btnStyle}>
                            <Text style={styles.btnText}> {this.props.title}</Text>
                        </View>
                    </TouchableNativeFeedback>
        }else{
           return   <TouchableOpacity
                        onPress={this.props.triggerEvt}>
                        <View style={btnStyle}>
                            <Text style={styles.btnText}> {this.props.title}</Text>
                        </View>
                    </TouchableOpacity>
        }
    }
    render(){
 
    return (
        <View style={{width:"95%",marginRight:"2.5%",marginLeft:"2.5%"}}>
            {this.platformSpecificBtn()}
        </View>
    )
  }
}
const styles = StyleSheet.create({
    btnStyle :{
        width :"95%",
        height: 55,
        marginRight : "2.5%",
        marginLeft : "2.5%",
        marginBottom: 20,
        padding:5,
        backgroundColor:"#4DEF8F",
        borderRadius : 16,
        alignItems : "center"
    },
    btnText :{
        fontSize:16,
        color:"white",
        justifyContent:"center",
        height:45,
        textAlignVertical:"center",
        letterSpacing:1
    }
});


