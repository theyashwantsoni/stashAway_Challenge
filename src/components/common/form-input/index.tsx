import React, { Component } from 'react';
import { TextInput, ViewStyle, StyleSheet, View, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';

interface props{
    conf : any
    updateState : (name:string,value : string) => void,
}
interface state{
    input: string, 
    isHidden: boolean, 
    placeholder: string
}
interface style {
    inputField: ViewStyle;
    placeholderStyle: ViewStyle;
}
export default class FormInput extends Component<props, state> {
    constructor (props : props) {
        super(props)
        this.state  = {
          input: this.props.conf.value,
          isHidden: this.props.conf.isHidden,
          placeholder : this.props.conf.placeholder
        }
    }

    handleChangeInput = (text : string) => {
        this.setState({ input: text })
        this.props.updateState(this.props.conf.name,text)
    }
   
    render() {
        return (
            <View style={styles.searchBox}>
                <Icon name="search" size={22} color="#6a8680" />
                <TextInput style={styles.inputField}
                    onChangeText={this.handleChangeInput}
                    value={this.state.input}
                    secureTextEntry={this.state.isHidden}
                    placeholder={this.state.placeholder}
                    placeholderTextColor="#6a8680"
                />
            </View>
        )
  }
  
}
const styles = StyleSheet.create({

    searchBox :{
        // flex:1,
        flexDirection:"row",
        // width :"95%",
        height: 50,
        borderColor: '#f2f2f2',
        borderWidth : 3,
        borderRadius:25,
        marginHorizontal:15,
        paddingHorizontal:10,
        alignItems:"center"
    },
    searchIcon :{
        width:35,
        height:35
    },
    inputField :{
        height:50,
    },
    placeholderStyle:{
        fontSize : 20,
        color : "darkgray"
    },
    
});