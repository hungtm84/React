import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { thisExpression } from '@babel/types';
type Props = {};

export default class TextBlink extends Component<Props>{
    render(){
        return(
            <View>
                <Blink inputText='Hello How are u ?'></Blink>
                <Blink inputText='I am fine tks ?'></Blink>
                <Text>âdaf</Text>
            </View>
        );
    }
}

class Blink extends Component<Props>{
    constructor(props){
        super(props);
        this.state = {
            showText:true
        };
        var taskToDo = () => {
            this.setState(previousState => {
                return {
                    showText: !previousState.showText
                };
            });

        };
        const timeToBlink = 500; 
        setInterval(taskToDo,timeToBlink);
    }
    render(){
        //let textToDisplay = this.state.showText ? this.props.inputText: '';
        let textToDisplay = this.state.showText ? this.props.inputText: '';
        //let textToDisplay = this.props.inputText;
        return(
            <Text>{textToDisplay}</Text>
        );
    }
}