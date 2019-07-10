import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput,Keyboard} from 'react-native';
import Button from 'react-native-button'
import { thisExpression } from '@babel/types';
type Props = {};
export default class ReactButton extends Component<Props>{
    constructor(props){
        super(props);
        this.state = {
            typeText: 'Please type your text',
        };
    }
    _onPressButton(){
        alert("this is button");
    }
    render(){
        return(
            <View style={styles.view}>
                <Button style={styles.button}
                    onPress={this._onPressButton}>
                    This is blue button
                </Button>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    view: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    button:{
        fontSize:25,
        color:'white',
        backgroundColor:'green',
        padding:15,
        borderRadius:20
    }

  });
  