import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,AppRegistry,Image,ScrollView,Dimensions,TextInput
} from 'react-native';
export default class myScrollView extends Component{
    render(){
        let screenWidth = Dimensions.get('window').width;
        return(
            <ScrollView
                keyboardDismissMode='on-drag'
                contentContainerStyle={{paddingLeft:20}}
            >
                <Image
                    source={require('../images/girl.png')}
                    style = {{ width:screenWidth,height:screenWidth * 195 / 185, marginTop: 2}}
                >
                </Image>
                <Text
                    style={{font:20,padding:15,color:'white',backgroundColor:'green', textAlign:'center'}}
                >
                    This is text
                </Text>
                <TextInput
                    style={{padding:10,margin:10,borderWidth:1}}
                    placeholder='Enter text here'
                >
                </TextInput>
                <View style={{backgroundColor:'#a03b51', height:50}}>
                    <Text
                        style={{fontSize:20,padding:15,color:'white', textAlign:'center'}}
                    >
                        This is view
                    </Text>
                </View>
                <Image
                    source={require('../images/girl.png')}
                    style = {{ width:screenWidth,height:screenWidth * 195 / 185, marginTop: 2}}
                >
                </Image>
                <Image
                    source={require('../images/girl.png')}
                    style = {{ width:screenWidth,height:screenWidth * 195 / 185, marginTop: 2}}
                >
                </Image>
                <Image
                    source={require('../images/girl.png')}
                    style = {{ width:screenWidth,height:screenWidth * 195 / 185, marginTop: 2}}
                >
                </Image>
                <Image
                    source={require('../images/girl.png')}
                    style = {{ width:screenWidth,height:screenWidth * 195 / 185, marginTop: 2}}
                >
                </Image>
                <Image
                    source={require('../images/girl.png')}
                    style = {{ width:screenWidth,height:screenWidth * 195 / 185, marginTop: 2}}
                >
                </Image>
                <Image
                    source={require('../images/girl.png')}
                    style = {{ width:screenWidth,height:screenWidth * 195 / 185, marginTop: 2}}
                >
                </Image>
            </ScrollView>
            // <View>
            //     <Image
            //         source={require('../images/girl.png')}
            //     >
            //     </Image>
            //     <Text>Hung</Text>
            // </View>
        );
    }
}
