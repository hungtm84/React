import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,Alert,
        TouchableHighlight,Dimensions,TextInput,
        ActivityIndicator,TouchableOpacity} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import {insertCustomerToServer} from '../../../../api/apiCustomer';
import ImagePicker from 'react-native-image-picker';
import {firebaseApp} from '../../../../api/FirebaseConfig';
const storage = firebaseApp.storage();
import RNFetchBlob  from 'react-native-fetch-blob';
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const Fetch = RNFetchBlob.polyfill.Fetch
// replace built-in fetch
window.fetch = new Fetch({
    // enable this option so that the response data conversion handled automatically
    auto : true,
    // when receiving response data, the module will match its Content-Type header
    // with strings in this array. If it contains any one of string in this array, 
    // the response body will be considered as binary data and the data will be stored
    // in file system instead of in memory.
    // By default, it only store response data to file system when Content-Type 
    // contains string `application/octet`.
    binaryContentTypes : [
        'image/',
        'video/',
        'audio/',
        'foo/',
    ]
}).build()


const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

type Props = {};

const uploadImage = (uri,mime = 'img/jpg') =>{
    return new Promise((resolve,rejects)=>{
        const uploadUri = Platform.OS ==='ios' ? uri.replace('file://','') : uri;
        const sessionId = new Date().getTime();
        let uploadBlob = null;
        const imageRef = storage.ref('images').child(sessionId+ '.jpg'); 
        fs.readFile(uploadUri,'base64')
        .then((data)=>{
            //return Blob.build(data,{type:'${mime}; base64'});
            
            return Blob.build(data,{ type:'img/jpg;BASE64' });
        })
        .then((blob)=>{
            uploadBlob = blob;
            return imageRef.put(blob,{contentType: mime});
        })
        .then(()=>{
            uploadBlob.close()
            return imageRef.getDownloadURL()
        })
        .then((url)=>{
            console.log('uploadImage: ' + url);
            resolve(url);
        })
        .catch((error)=>{
            rejects(error)
        })
    })
}
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
        console.log('_pickImage');
        try{
            ImagePicker.showImagePicker(options, (response) => {
                console.log('Response = ', response);
               
                if (response.didCancel) {
                  console.log('User cancelled image picker');
                } else if (response.error) {
                  console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                  console.log('User tapped custom button: ', response.customButton);
                } else {
                    uploadImage(response.uri)
                    .then((url)=>{
                                
                                this.setState({avatar:url});
                                console.log('url1: ' + this.state.avatar);
                            }
                        //url=>this.setState({avatarSource:url})
                    )
                    .catch(error  => console.log(error) )
                }
              });
        }
        catch(error){
            console.log('error: ' + error);
        }
        
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
                <View style={{flex:1,alignItems:'center', 
                        justifyContent:'center'}}>
                        {(()=>{
                            
                            console.log('here0:  ' + this.state.avatar);
                            switch(this.state.avatar){
                                case null:
                                    return null
                                case '':
                                    console.log('here1:  ' + this.state.avatar);
                                    return <ActivityIndicator />
                                default:
                                    console.log('here2:  ' + this.state.avatar);
                                    return(
                                        <View>
                                        <Image source={{uri:this.state.avatar}} 
                                            style={{width:300,height:300, margin:20}}></Image>
                                        </View>
                                    )
                            }})()
                        }
                        <TouchableOpacity onPress={()=>{this._pickImage()}} style={{alignItems:'center'}}>
                            {/* <Image source={this.state.avatarSource}style={{width:300,height:300, margin:20}}></Image> */}
                                <Text style={{borderRadius:10,backgroundColor:'green',color:'white',
                                    fontSize:16, padding:10, width:100,
                                    fontWeight:'bold', justifyContent:'center',
                                    alignContent:'center',textAlign:'center'}} >
                                Upload file</Text>
                        </TouchableOpacity>
                </View>
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