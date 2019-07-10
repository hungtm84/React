
import React, {Component} from 'react';
import  {Platform, StyleSheet, Text, View,TouchableOpacity,Image, ActivityIndicator} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import Login from '../components/Login';
import Register from '../components/Register';
import Welcome from './Welcome';
import {firebaseApp} from './FirebaseConfig';
//import RNFetchBlob from 'rn-fetch-blob';
import RNFetchBlob  from 'react-native-fetch-blob';
const storage = firebaseApp.storage();
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
import ImagePicker from 'react-native-image-picker';
//import { resolve } from 'dns';
//import { rejects } from 'assert';
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
            resolve(url)
        })
        .catch((error)=>{
            rejects(error)
        })
    })
}
export default class ImageExample extends Component<Props> {
    constructor(props){
        super(props);
        this.state={
            //avatarSource:null
        }
    }
    _pickImage(){
        ImagePicker.showImagePicker(options, (response) => {
            this.setState({avatarSource:''});
            
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                
                uploadImage(response.uri)
                .then((url)=>{
                            
                            this.setState({avatarSource:url});
                            console.log('url1: ' + this.state.avatarSource);
                        }
                    //url=>this.setState({avatarSource:url})
                )
                .catch(error  => console.log(error) )
            }
        });
    }
    render(){
    return(
       <View style={{flex:1,alignItems:'center', 
            justifyContent:'center'}}>
            {(()=>{
                
                console.log('here0:  ' + this.state.avatarSource);
                switch(this.state.avatarSource){
                    case null:
                        return null
                    case '':
                        console.log('here1:  ' + this.state.avatarSource);
                        return <ActivityIndicator />
                    default:
                        console.log('here2:  ' + this.state.avatarSource);
                        return(
                            <View>
                            <Image source={{uri:this.state.avatarSource}} 
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
    );
  }
}
