import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList,Image,Alert,TouchableHighlight} from 'react-native';
import flatListData from '../data/flatListData';
//import { whileStatement } from '@babel/types';
import Swipeout from 'react-native-swipeout';
import AddModal from './AddModal';
import EditModal from './EditModal';
//import console = require('console');
type Props = {};

class FlatListItem extends Component<Props>{
    constructor(props){
        super(props);
        this.state = {
            activeRowKey:null
        };
    }
    render(){
        const swipeSettings = {
            autoClose:true,
            onClose: (secId, rowId, direction) =>{
                if(this.state.activeRowKey !=null){
                    this.setState({activeRowKey:null});
                }
            },
            onOpen: (secId, rowId, direction) =>{
                this.setState({activeRowKey:this.props.item.id});
            },
            right:[
                {
                    onPress:()=>{
                        //alert('edit here');
                        this.props.parentFlatList.refs.editModal.showEditModal(flatListData[this.props.index],this);
                        
                    },
                    text:'Edit', type:'primary'
                },
                {
                    onPress:()=>{
                            const deletingRow = this.state.activeRowKey;
                            Alert.alert('alert','are you sure want to delete ?',
                            [
                                //{text:'No', onPress:()=>console.log('Cancel Pressed'), style:'cancel'},
                                {text:'Yes', onPress:()=>{
                                    flatListData.splice(this.props.index,1);
                                    //refreshFlatList
                                    this.props.parentFlatList.refreshFlatList(deletingRow);
                                }},
                            ],
                            { cancelable:true}
                        );
                    },
                    text:'Delete', type:'delete'
                }
            ],
            rowId: this.props.index,
            sectionId:1
        }
        return(
            <Swipeout {...swipeSettings}>
                <View style={{
                    flex:1,
                    flexDirection:'column',
                    //backgroundColor:this.props.index%2 == 0 ? 'mediumseagreen' : 'tomato'
                    }}>
                    <View style={{backgroundColor:'mediumseagreen', flex:1,flexDirection:'row'}}>
                        <Image source={{uri:this.props.item.Url}} style={{width:100,height:100,margin:5}}>
                        </Image>
                        {/* <Text>{this.props.item.Url}</Text> */}
                        <View style={{flex:1, flexDirection:'column'}}>
                            <Text style={styles.flatListItem}>{this.props.item.name}</Text>
                            <Text style={styles.flatListItem}>{this.props.item.description}</Text>
                        </View>
                    </View>
                    <View style={{height:1,backgroundColor:'white'}}>
                    </View>
                </View>
            </Swipeout>
        );
    }
}
const styles = StyleSheet.create({
    flatListItem:{
        color:'white',
        padding:10,
        fontSize:16,
    }
});

export default class flatListExample extends Component<Props>{
    constructor(props){
        super(props);
        this.state = {
            curItem: "0",
            curIndex: 0,
            deletedRowKey:null,
        };
        this._onPressAdd = this._onPressAdd.bind(this);
    }
    refreshFlatList = (key)=>{
        this.setState((prevState) =>{
            return{
                deletedRowKey:key
            };
        });
        this.refs.flatList.scrollToEnd();
    }
    _onPressAdd(){
        //alert('you press add');
        this.refs.addModal.showAddModal();
    }
    render(){
        return(
            <View style={{flex:1, marginTop:Platform.OS === 'ios' ? 34:0}}>
                <View style={{backgroundColor:'tomato', height:64, flexDirection:'row',
                justifyContent:'flex-end',alignItems:'center'}}>
                    <TouchableHighlight style={{marginRight:10}}
                        underlayColor='tomato'
                        onPress={this._onPressAdd}
                    >
                        <Image style={{width:48,height:48}} source={require('../icons/icons-add.png')}>
                            
                        </Image>
                    </TouchableHighlight>
                </View>
                <FlatList data={flatListData} ref={"flatList"}
                renderItem = {({item,index})=>{
                    return(
                        <FlatListItem item={item} index={index} parentFlatList={this}>
                        </FlatListItem>
                    );
                }}
                >
                </FlatList>
                <AddModal ref={"addModal"} parentFlatList={this}>
                </AddModal>
                <EditModal ref={"editModal"} parentFlatList={this}>
                </EditModal>
                
            </View>
        );
    }
}