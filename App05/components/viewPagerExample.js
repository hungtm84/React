import React, {Component} from 'react';
import {Platform, StyleSheet,
    Text, View,ScrollView,
    ViewPagerAndroid} from 'react-native';
type Props = {};
export default class viewPagerExample extends Component<Props>{
    constructor(props){
        super(props);
        this.state = {
            log1: 'aaa',
            log2: 'bbb',
            log3: 'ccc'
        };
    }
    render(){
        return(
            <ViewPagerAndroid
                style={{flex:1,}}
                initialPage={0}
                onPageScroll={(event)=>{
                    //console.log('offset = ${event.nativeEvent.offset}');
                    let value = "offset: " + event.nativeEvent.offset;
                    this.setState(()=>{
                        return{log1:value};
                    });
                }}
                onPageScrollStateChanged={(state)=>{
                    let value = "state " + state;
                    this.setState(()=>{
                        return{log2:value};
                    });
                }}
                onPageSelected = {(event)=>{
                    let value = "scroll to page:" + (event.nativeEvent.position + 1);
                    this.setState(()=>{
                        return{log3: value};
                    });
                }}
            >
                <View style={{backgroundColor:'lightseagreen'}}>
                    <Text style={styles.textStyle}>Screen 1 {this.state.log3}</Text>
                    <Text style={styles.textStyle}>{this.state.log1}</Text>
                    <Text style={styles.textStyle}>{this.state.log2}</Text>
                    <Text style={styles.textStyle}>{this.state.log3}</Text>
                </View>
                <View style={{backgroundColor:'palevioletred'}}>
                    <Text style={styles.textStyle}>Screen 2 {this.state.log3}</Text>
                    <Text style={styles.textStyle}>{this.state.log1}</Text>
                    <Text style={styles.textStyle}>{this.state.log2}</Text>
                    <Text style={styles.textStyle}>{this.state.log3}</Text>
                </View>
                <View style={{backgroundColor:'salmon'}}>
                    <Text style={styles.textStyle}>Screen 3</Text>
                    <Text style={styles.textStyle}>{this.state.log1}</Text>
                    <Text style={styles.textStyle}>{this.state.log2}</Text>
                    <Text style={styles.textStyle}>{this.state.log3}</Text>
                </View>
            </ViewPagerAndroid>
        );
    }
}
const styles = StyleSheet.create({
    textStyle: {
        fontSize:20,
        fontWeight:'bold',
        padding:15,
        color:'white',
        textAlign:'center'
    }
})
