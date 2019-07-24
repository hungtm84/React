import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,Alert,
        TouchableHighlight,Dimensions,TextInput,
        ActivityIndicator,TouchableOpacity} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import {insertCustomerToServer} from '../../../../api/apiCustomer';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob  from 'react-native-fetch-blob';
const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
//import console = require('console');
type Props = {};
var screen = Dimensions.get('window');
export default class AddModal extends Component<Props>{
    constructor(props){
        super(props);
        this.state={
            first_name:'',
            last_name:'',
            email:'',
            note:'',
            avatar:''
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
    _pickImage(){
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
           
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.uri };
           
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
           
              this.setState({
                avatar: source,
              });
            }
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
                <Text style={{fontSize:16,fontWeight:'bold',textAlign:"center", marginTop:10}}>New Customer information</Text>
                <TextInput
                    style={{height:40,borderBottomColor:'gray',marginLeft:30,marginRight:30,
                    marginTop:0,marginBottom:10,borderBottomWidth:1}}
                    placeholder="Enter first_name"
                    onChangeText={(text)=> this.setState({first_name:text})}
                    value={this.state.first_name}
                >
                </TextInput>
                <TextInput
                    style={{height:40,borderBottomColor:'gray',marginLeft:30,marginRight:30,
                    marginTop:20,marginBottom:10,borderBottomWidth:1}}
                    placeholder="Enter last_name"
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
                    onChangeText={(text)=> this.setState({email:text})}
                    value={this.state.email}
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
                            const newKey = this.generateKey(3);
                            //alert(newKey);
                            const newCustomer = {
                                id:newKey,
                                first_name: this.state.first_name,
                                last_name: this.state.last_name,
                                email: this.state.email,
                                note: this.state.note
                                //Url:'https://vnn-imgs-f.vgcloud.vn/2018/06/19/16/ngam-ve-dep-nong-bong-goi-cam-cua-hot-girl-doi-tuyen-nhat-ban-6.jpg'
                            };
                            //flatListData.push(newGirl);
                            //this.props.parentFlatList.refreshFlatList(newKey);
                            insertCustomerToServer(newCustomer).then((result) => {
                                try{
                                    if(result === 'ok'){
                                        this.props.parentFlatList.refreshDataFromServer();
                                        console.log('reload finish');
                                    }
                                }catch(error){
                                    console.log('insertCustomerToServer: ' + error);
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