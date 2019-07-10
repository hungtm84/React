import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,Alert,
        TouchableHighlight,Dimensions,TextInput} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import flatListData from '../data/flatListData';
import {insertGirlsToServer} from '../networking/server';
//import console = require('console');
type Props = {};
var screen = Dimensions.get('window');
export default class AddModal extends Component<Props>{
    constructor(props){
        super(props);
        this.state={
            newGirlName:'',
            newGirlDesc:''
        };
    }
    showAddModal = () =>{
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
                    onChangeText={(text)=> this.setState({newGirlName:text})}
                    value={this.state.newGirlName}
                >
                </TextInput>
                <TextInput
                    style={{height:40,borderBottomColor:'gray',marginLeft:30,marginRight:30,
                    marginTop:20,marginBottom:10,borderBottomWidth:1}}
                    placeholder="Enter girl description"
                    onChangeText={(text)=> this.setState({newGirlDesc:text})}
                    value={this.state.newGirlDesc}
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
                            if(this.state.newGirlName.length == 0 || this.state.newGirlDesc == 0){
                                alert("you must enter full information");
                                return;
                            }
                            const newKey = this.generateKey(3);
                            //alert(newKey);
                            const newGirl = {
                                id:newKey,
                                name: this.state.newGirlName,
                                description:this.state.newGirlDesc,
                                //Url:'https://vnn-imgs-f.vgcloud.vn/2018/06/19/16/ngam-ve-dep-nong-bong-goi-cam-cua-hot-girl-doi-tuyen-nhat-ban-6.jpg'
                            };
                            //flatListData.push(newGirl);
                            //this.props.parentFlatList.refreshFlatList(newKey);
                            insertGirlsToServer(newGirl).then((result) => {
                                try{
                                    if(result === 'ok'){
                                        this.props.parentFlatList.refreshDataFromServer();
                                        console.log('reload finish');
                                    }
                                }catch(error){
                                    console.log('insertGirlsToServer: ' + error);
                                }

                            });
                            this.refs.myModal.close();
                        }}
                >
                    save
                </Button>
            </Modal>
        );
    }
}