import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,Alert,
        TouchableHighlight,Dimensions,TextInput} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import {updateCustomerToServer} from '../../../../api/apiCustomer';
//import console = require('console');
type Props = {};
var screen = Dimensions.get('window');
export default class EditModal extends Component<Props>{
    constructor(props){
        super(props);
        this.state={
            first_name:'',
            last_name:'',
            email:'',
            note:'',
        };
    }
    showEditModal = (customer, flatListItem) =>{
        this.setState({
            id:customer.id,
            first_name: customer.first_name,
            last_name: customer.last_name,
            email: customer.email,
            note: customer.note,
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
                style={{justifyContent:'center', borderRadius:Platform.OS === 'ios'? 30: 20,
                shadowRadius:10, width:screen.width -80, height:500

                }}
            position='center'
            backdrop = {true}
            onClosed={()=>{
                //alert("modal close");
            }}
            >
                <Text style={{fontSize:16,fontWeight:'bold',textAlign:"center", marginBottom:10}}>New Customer information</Text>
                <TextInput
                    style={{height:40,borderBottomColor:'gray',marginLeft:30,marginRight:30,
                    marginTop:0,marginBottom:10,borderBottomWidth:1}}
                    placeholder="Enter first name"
                    onChangeText={(text)=> this.setState({first_name:text})}
                    value={this.state.first_name}
                >
                </TextInput>
                <TextInput
                    style={{height:40,borderBottomColor:'gray',marginLeft:30,marginRight:30,
                    marginTop:20,marginBottom:10,borderBottomWidth:1}}
                    placeholder="Enter last name"
                    onChangeText={(text)=> this.setState({last_name:text})}
                    value={this.state.last_name}
                ></TextInput>
                <TextInput
                    style={{height:40,borderBottomColor:'gray',marginLeft:30,marginRight:30,
                    marginTop:20,marginBottom:10,borderBottomWidth:1}}
                    placeholder="Enter email"
                    onChangeText={(text)=> this.setState({email:text})}
                    value={this.state.email}
                ></TextInput>
                <TextInput
                    style={{height:40,borderBottomColor:'gray',marginLeft:30,marginRight:30,
                    marginTop:20,marginBottom:10,borderBottomWidth:1}}
                    placeholder="Enter note"
                    onChangeText={(text)=> this.setState({note:text})}
                    value={this.state.note}
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
                            if(this.state.first_name.length == 0 || this.state.last_name == 0){
                                alert("you must enter full information");
                                return;
                            }
                            //var foundIndex = flatListData.findIndex(item =>this.state.id == item.id);
                            //if(foundIndex<0){ return; }
                            //flatListData[foundIndex].name = this.state.editGirlName;
                            //flatListData[foundIndex].description = this.state.editGirlDesc;
                            let params = {
                                id:this.state.id,
                                first_name:this.state.first_name,
                                last_name: this.last_name,
                                email:this.state.email,
                                note: this.note
                            };
                            updateCustomerToServer(params).then((result)=>{
                                try{
                                    if(result ==='ok'){
                                        this.state.flatListItem.refreshFlatListItem({
                                            id:this.state.id,
                                            first_name:this.state.first_name,
                                            last_name:this.state.last_name,
                                            email:this.state.email,
                                            note:this.state.note
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