import React, {Component} from 'react';
import {
    Alert,AppRegistry,StyleSheet,View,Image,Text,TouchableHighlight,TouchableNativeFeedback,
    TouchableOpacity,TouchableWithoutFeedback,
} from 'react-native';
type Props = {};
export default class Touchable extends Component<Props>{
    constructor(props){
        super(props);
        this.state = {
            typeText: 'Please type your text',
        };
    }
    _onShowUnderlay(){
        //alert("onShowUnderlay")
    }
    _onPress(){
        //alert("_onPress")
    }
    render(){
        return(
            <View style={styles.view1}>
                <TouchableHighlight
                    underlayColor='red'
                    onPress = {this._onPress}
                    onShowUnderlay={this._onShowUnderlay}
                    >
                    <View style={styles.view2}>
                        <Image style={styles.image}
                             source={require('../images/g1.jpg')}
                        >
                        </Image>
                        <Text style={styles.Text} >abcd</Text>
                    </View>
                </TouchableHighlight>
                <TouchableNativeFeedback
                    onPress = {this._onPress}
                    useForeground={true}
                >
                    <View style={{width:300,height:50,margin:20,backgroundColor:'blue'}}>
                        <Text style={{margin:10,fontSize:20,color:'white',textAlign:'center'}}>
                        TouchableNativeFeedback
                        </Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableOpacity
                    onPress = {this._onPress}
                    activeOpacity={0.1}
                >
                    <View style={{width:300,height:50,margin:20,backgroundColor:'green'}}>
                        <Text style={{margin:10,fontSize:20,color:'white',textAlign:'center'}}>
                        TouchableNativeFeedback
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableWithoutFeedback
                    onPress = {this._onPress}
                    activeOpacity={0.1}
                    onPressIn ={()=>{
                        alert("onPressIn");
                    }}
                >
                    <View style={{width:300,height:50,margin:20,backgroundColor:'yellow'}}>
                        <Text style={{margin:10,fontSize:20,color:'white',textAlign:'center'}}>
                        TouchableWithoutFeedback
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    view1: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    view2:{
        backgroundColor:'green',
    },
    image:{
        width:100,
        height:100
    },
    Text:{
        width:150,
        
    },
  });
  