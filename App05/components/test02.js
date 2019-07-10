import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput,Keyboard,Button} from 'react-native';
import { thisExpression } from '@babel/types';
type Props = {};
export default class InputForm extends Component<Props>{
    constructor(props){
        super(props);
        this.state = {
            typeText: 'Please type your text',
            typePassword: '',
            typeDescription:''
        };
    }
    _onChangeText(text){
        this.setState(
            (previousState)=>{
                return{
                    typeText:text
                };
            }
        );
    }
    _onChangePassword(text){
        this.setState(
            (previousState)=>{
                return{
                    typePassword:text
                };
            }
        );
    }
    _onChangeDescription(text){
        this.setState(
            (previousState)=>{
                return{
                    typeDescription:text
                };
            }
        );
    }
    componentWillMount(){
        this.CheckingStatusShow = Keyboard.addListener('keyboardDidShow',()=>{
            this.setState(()=>{
                return{typeText:'Keyboard is show'}
            })
        });
        
        this.CheckingStatusHide = Keyboard.addListener('keyboardDidHide',()=>{
            this.setState(()=>{
                return{typeText:'Keyboard is hide'}
            })
        });
    }
    componentWillUnmount(){
        this.CheckingStatusShow.remove();
        this.CheckingStatusHide.remove();
    }
    render(){
        return(
            <View>
                <TextInput style={styles.inputText}
                    keyboardType='email-address'
                    placeholder='Enter your email'
                    placeholderTextColor='red'
                    onChangeText ={this._onChangeText.bind(this)} 
                />
                <Text style={styles.typeText}>{this.state.typeText}</Text>
                <TextInput style={styles.inputText}
                    keyboardType='default'
                    placeholder='Enter your password'
                    secureTextEntry = {true}
                    onChangeText ={this._onChangePassword.bind(this)} 
                />
                <TextInput style={styles.descriptionText}
                    multiline={true}
                    borderBottomColor = 'green'
                    borderBottomWidth = {3}
                    borderLeftColor='green'
                    borderLeftWidth = {3}
                    borderRightColor='green'
                    borderRightWidth = {3}
                    keyboardType='default'
                    editable = {true}
                    autoFocus = {true}
                    returnKeyType='done'
                    onSubmitEditing={Keyboard.dismiss}
                    onChangeText ={this._onChangeDescription.bind(this)} 
                />
                <Button
                    title="Learn More"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    inputText: {
      height:40,
      margin:20,
      padding:10,
      borderColor:'gray',
      borderWidth:1
    },
    typeText:{
        marginLeft:20
    },
    descriptionText:{
        margin:20,
        height:100,
        padding:10,
        borderColor:'gray',
        borderWidth:1
    }
  });
  