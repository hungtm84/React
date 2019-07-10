
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Alert,
  TextInput,TouchableOpacity, Dimensions} from 'react-native';
//import firebase from 'react-native-firebase';
import {firebaseApp} from './FirebaseConfig';
type Props = {};
export default class Login extends Component<Props> {
  //let screenWidth =  Dimensions.get('window').width;
  constructor(props){
    super(props);
    this.state = {
      email:'',
      password:''
    }
  }
  _onLogin(){
    
    firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(()=>{
      Alert.alert(
        'Title',
        'Login successful! username: ' + this.state.email,
        [
          {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => this.props.goWelcome()}
        ],
        { cancelable: false }
      )
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      Alert.alert(
        'Title',
        'Login fail code: ' + errorMessage,
        [
          {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => console.log('OK Pressed'), style: 'cancel'},
        ],
        { cancelable: false }
      )
      // ...
    });
    this.setState({
      email:'',
      password:''
    });
  }
  render() {
    let screenWidth =  Dimensions.get('window').width - 20;
    return (
      <View style={{flex:1,justifyContent:'center', alignItems:'center',}}>
        <Text style={{marginBottom:50, fontSize:25, fontWeight:'bold'}}>DANG NHAP</Text>
        <View style={{flexDirection:'column'}}>
          <TextInput
            style={{height:40, width:screenWidth, borderColor: 'gray', borderWidth:1,fontWeight:'bold',
            }}
            onChangeText={(email) => {this.setState({email})}}
            value={this.state.email}
            placeholder = "please input email"
          />
          <TextInput
            style={{height:40, borderColor: 'gray', marginTop:10, borderWidth:1,fontWeight:'bold'}} 
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            placeholder = "please input password"
            secureTextEntry={true}
          />
        </View>
        <View style={{flexDirection:'row', color:'white', fontWeight:'bold'}}>
          <TouchableOpacity
            style={{backgroundColor:'red', width:100, borderRadius:10,alignItems:"center",fontWeight:'bold', margin:10, padding:10}}
            onPress={()=>this._onLogin()}
          >  
            <Text style={{color:'white', }}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{backgroundColor:'green',borderRadius:10, width:100, alignItems:"center", color:'white', fontWeight:'bold', margin:10, padding:10}}
            onPress={()=>{this.props.goRegister()}}>
            <Text style={{color:'white'}}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
