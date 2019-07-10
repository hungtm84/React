import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, SectionList, 
    Alert,AppRegistry,Image, TouchableHighlight, TouchableOpacity} from 'react-native';
import {sectionListData} from '../data/sectionListData';
type Props = {};

class SectionListItem extends Component{
    render(){
        return(
            <TouchableHighlight underlayColor="grey" onPress={()=>{
                alert(this.props.item.name);
            }}>
                <View style = {{ flex:1, flexDirection:'column', marginTop:10,marginLeft:10,marginRight:10}}>
                    <Text style={{fontSize:18,fontWeight:'bold', color:'rgb(173,252,250)',
                        marginLeft:20, marginRight:10,}}>
                        {this.props.index + 1}. {this.props.item.name}
                    </Text>
                    <View style={{flexDirection:'row', marginTop:5}}>
                            <Image source={{uri:this.props.item.url}}
                                style={{width:150, marginRight:10, alignContent:'center'}}></Image>    
                        <View style={{flex:1,flexDirection:'column'}}>
                            <Text style={{fontSize:16, color:'rgb(173,252,250)'}}>
                                {this.props.item.description}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}
class SectionHeader extends Component{
    render(){
        return(
            <View style = {{ flex:1, marginTop:(this.props.index === 0) ? 0:10,   backgroundColor:'rgb(77,120,140)'}}>
                <Text style={{fontSize:20,fontWeight:'bold', color:'rgb(173,252,250)', margin:20}}>
                    {this.props.section.index}
                    {this.props.section.title}
                    {this.props.index}
                </Text>
            </View>
        );
    }
}

export default class BasicSectionList extends Component<Props>{
    render(){
        return(
            <View style={{flex:1,backgroundColor:'mediumseagreen', marginTop:(Platform.OS === "ios") ? 34:0}}>
                <SectionList
                    
                    keyExtractor = {(item,index)=>{item.Id}}
                    renderItem={({item,index})=>{
                        return(<SectionListItem item={item} index={index}></SectionListItem>);
                    }}
                    renderSectionHeader = {({section, index})=>{
                        return(<SectionHeader section={section} index={index}></SectionHeader>);
                    }}
                    sections={sectionListData}
                >
                </SectionList>
                
            </View>
        );
    }
}