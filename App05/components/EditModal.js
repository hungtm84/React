import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,Alert,
        TouchableHighlight,Dimensions,TextInput} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import flatListData from '../data/flatListData';
import { updateGirlsToServer } from '../networking/server';
//import console = require('console');
type Props = {};
var screen = Dimensions.get('window');
export default class EditModal extends Component<Props>{
    constructor(props){
        super(props);
        this.state={
            editGirlName:'',
            editGirlDesc:''
        };
    }
    showEditModal = (editingGirl, flatListItem) =>{
        this.setState({
            id:editingGirl.id,
            editGirlName: editingGirl.name,
            editGirlDesc: editingGirl.description,
            flatListItem:flatListItem
        });
        this.refs.myModal.open();
    }
    generateKey = (lengthKey)=>{
        return require('random-string')({
            length:lengthKey,
            numeric: true,
            letters: false,
            special: false,
            exclude: ['a', 'b', '1']
         });
    }
    render(){
        return(
            <Modal ref={"myModal"}
                style={{justifyContent:'center', borderRadius:Platform.OS === 'ios'? 30: 0,
                shadowRadius:10, width:screen.width -80, height:280

                }}
            position='center'
            backdrop = {true}
            onClosed={()=>{
                //alert("modal close");
            }}
            >
                <Text style={{fontSize:16,fontWeight:'bold',textAlign:"center", marginTop:10}}>New girl information</Text>
                <TextInput
                    style={{height:40,borderBottomColor:'gray',marginLeft:30,marginRight:30,
                    marginTop:0,marginBottom:10,borderBottomWidth:1}}
                    placeholder="Enter girl name"
                    onChangeText={(text)=> this.setState({editGirlName:text})}
                    value={this.state.editGirlName}
                >
                </TextInput>
                <TextInput
                    style={{height:40,borderBottomColor:'gray',marginLeft:30,marginRight:30,
                    marginTop:20,marginBottom:10,borderBottomWidth:1}}
                    placeholder="Enter girl description"
                    onChangeText={(text)=> this.setState({editGirlDesc:text})}
                    value={this.state.editGirlDesc}
                ></TextInput>
                <Button style={{fontSize:18,color:'white'}}
                    containerStyle={{
                        padding:8,
                        marginLeft:100,
                        marginRight:100,
                        height:40,
                        borderRadius:6,
                        backgroundColor:'mediumseagreen'
                        
                    }}
                    onPress={()=>{
                            if(this.state.editGirlName.length == 0 || this.state.editGirlDesc == 0){
                                alert("you must enter full information");
                                return;
                            }
                            //var foundIndex = flatListData.findIndex(item =>this.state.id == item.id);
                            //if(foundIndex<0){ return; }
                            //flatListData[foundIndex].name = this.state.editGirlName;
                            //flatListData[foundIndex].description = this.state.editGirlDesc;
                            let params = {
                                id:this.state.id,
                                name:this.state.editGirlName,
                                description: this.editGirlDesc
                            };
                            updateGirlsToServer(params).then((result)=>{
                                try{
                                    if(result ==='ok'){
                                        this.state.flatListItem.refreshFlatListItem({
                                            id:this.state.id,
                                            name:this.state.editGirlName,
                                            description:this.state.editGirlDesc
                                        });
                                    }
                                    this.refs.myModal.close();

                                }catch(error){
                                    console.log(error);
                                    this.refs.myModal.close();
                                }
                            });
                            //this.state.flatListItem.refresh
                            //this.refs.myModal.close();
                        }}
                >
                    save
                </Button>
            </Modal>
        );
    }
}