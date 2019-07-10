import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,AppRegistry,Image,ScrollView,Dimensions,TextInput
} from 'react-native';
export default class myHorizontalScrollView extends Component{
    render(){
        let screenWidth = Dimensions.get('window').width;
        let screenHeight = Dimensions.get('window').height;
        return(
            <ScrollView horizontal={true} pagingEnabled={true}
                showsHorizontalScrollIndicator={true}
                scrollIndicatorInsets={{top:10,left:10,right:10,bottom:10}}
                contentContainerStyle={{paddingLeft:20}}
                onMomentumScrollBegin={()=>{
                        alert('onMomentumScrollBegin');
                    }
                }
                onMomentumScrollEnd={()=>{
                        alert('onMomentumScrollEnd');
                    }
                }
                onScroll={(event)}
            >
                <View
                    style={{backgroundColor:'#5f9ea0', flex:1, marginTop:20, 
                    width:screenWidth,height:screenHeight,justifyContent:'center',alignItems:'center'}}
                >
                    <Text style={{fontSize:20,padding:15,color:'white',textAlign:'center'}}>
                        Screen1
                    </Text>
                </View>
                <View
                    style={{backgroundColor:'tomato', flex:1, marginTop:20, 
                    width:screenWidth,height:screenHeight,justifyContent:'center',alignItems:'center'}}
                >
                    <Text style={{fontSize:20,padding:15,color:'white',textAlign:'center'}}>
                        Screen2
                    </Text>
                </View>
                <View
                    style={{backgroundColor:'red', flex:1, marginTop:20, 
                    width:screenWidth,height:screenHeight,justifyContent:'center',alignItems:'center'}}
                >
                    <Text style={{fontSize:20,padding:15,color:'white',textAlign:'center'}}>
                        Screen3
                    </Text>
                </View>
            </ScrollView>
          
        );
    }
}
