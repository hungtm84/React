import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList,Image,Alert,
    TouchableHighlight,ImageBackground,TouchableOpacity,
    
} from 'react-native';
import {horizontalFlatListData} from '../data/horizontalFlatListData';
import {horizontalStatus} from '../data/horizontalFlatListData';
import Icon from 'react-native-vector-icons/Ionicons';
type Props = {};
class HorizontalFlatListItem extends Component{
    render(){
        return(
            <View style={{flex:1, flexDirection:'column', alignItems:'center',
                width:90, borderRadius:10, borderWidth:1,
                borderColor:'gray',
                margin:4,
            }} >
                 <TouchableOpacity onPress={()=>{
                    alert('you pressed: ' + this.props.item.hour);
                    //alert('weather');
                }} style={{position:'absolute', top:0, bottom: 0, left: 0, right: 0,}}>
                
                <Text style={{fontSize:16, fontWeight:'bold', color:'white', margin:20}}>
                    {this.props.item.hour}</Text>
                <Icon name={(Platform.OS === "ios") ? this.props.item.status.ios : this.props.item.status.android}
                    size= {30} color = 'white' />
                <Text
                    style={{fontSize:16, fontWeight:'bold', color:'white', margin:10}}
                >{this.props.item.degrees} ℉</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default class HorizontalFlatList extends Component<Props>{
    render(){
        return(
            <View style={{flex:1, flexDirection:'column',marginTop:Platform.OS === 'ios' ? 34:0,
             alignItems:"center"}}>
                <View style={{position:'absolute', top:0, bottom:0, left:0, right:0}}>
                    <Image style={{flex:1, flexDirection:'column', width:null,height:null,
                    borderWidth:1, borderColor:'grey', margin:4,
                    }} source={require('../images/g3.jpg')}></Image>
                </View>
                <Text style={{fontSize:16, fontWeight:'bold', color:'white', alignItems:'center',
                    backgroundColor:'transparent', margin:10,
                }}>Weather forecast</Text>
                <View style={{height:150}}>
                    <FlatList style={{backgroundColor:'black', opacity:0.5}}
                        horizontal={true}
                        data={horizontalFlatListData}
                        renderItem={({item,index}) =>{
                            return(
                                <HorizontalFlatListItem item={item} index={index} parentFlatList={this}
                                ></HorizontalFlatListItem>
                            )

                        }}
                    >

                    </FlatList>
                </View>   
            </View>
        );
    }
}