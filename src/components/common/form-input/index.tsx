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
                <TextInput style={styles.inputField}
                    onChangeText={this.handleChangeInput}
                    value={this.state.input}
                    secureTextEntry={this.state.isHidden}
                    placeholder={this.state.placeholder}
                    placeholderTextColor="lightgrey"
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
        height: 35,
        backgroundColor: '#f2f2f230',
        borderRadius:25,
        marginHorizontal:15,
        paddingHorizontal:20,
        alignItems:"center"
    },
    searchIcon :{
        width:35,
        height:35
    },
    inputField :{
        height:50,
        color:'white'
    },
    placeholderStyle:{
        fontSize : 20,
    },
    
});