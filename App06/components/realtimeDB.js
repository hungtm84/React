
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity,TextInput} from 'react-native';
import {firebaseApp} from './FirebaseConfig';

type Props = {};
export default class realtimeDB extends Component<Props> {
    constructor(props){
        super(props);
        this.itemRef = firebaseApp.database();
        this.state = { text: '' };
    }

    _setDB(){
        try{
            const sessionId = new Date().getTime();
            this.itemRef.ref('khoahoc').set({
                K1:'ngay 20/03',
                K2:'ngay 30/3',
                K4: 'ngay 40/3 ' + sessionId
            })
        }
        catch(error){
            console.log(error);
        }
    }
    _pushDB(){
        try{
            const sessionId = new Date().getTime();
            this.itemRef.ref('TTCNTT').push({
                K1:'ngay 20/03 ' + sessionId,
                K2:'ngay 30/3',
                K4: 'ngay 40/3'
            });
        }
        catch(error){
            console.log(error);
        }
    }
    _addDBon(){
        try{
            this.itemRef.ref('khoahoc').child('K1').on('value',function(_val){
                alert('_addDBon '+ _val.val());
            })
        }
        catch(error){
            console.log(error);
        }
    }
    _addDBonce(){
        try{
            this.itemRef.ref('khoahoc').child('K1').once('value',function(_val){
                alert('_addDBonce '+ _val.val());
            })
        }
        catch(error){
            console.log(error);
        }
    }
    _addData(){
        try{
            this.itemRef.ref('Node1').child('Nod2').push({
                Key1:this.state.text
            });
            this.setState({
                text:''
            });
        }
        catch(error){
            console.log(error);
        }
    }
    render() {
        return (
        <View style={{flex:1, justifyContent:"center",alignItems:'center'}}>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>{this._setDB()}}
                    style={{backgroundColor:'green', borderRadius:10, padding:10,margin:5,}}>
                    <Text style={{color:'white', fontWeight:"bold",width:70
                    ,textAlign:'center',}}>set db</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this._pushDB()}}
                    style={{backgroundColor:'green', borderRadius:10, padding:10,margin:5,}}>
                    <Text style={{color:'white', fontWeight:"bold",width:70
                    ,textAlign:'center',}}>push db</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this._addDBon()}}
                    style={{backgroundColor:'green', borderRadius:10, padding:10,margin:5,}}>
                    <Text style={{color:'white', fontWeight:"bold",width:70
                    ,textAlign:'center',}}>addDBon</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this._addDBonce()}}
                    style={{backgroundColor:'green', borderRadius:10, padding:10,margin:5,}}>
                    <Text style={{color:'white', fontWeight:"bold",width:75
                    ,textAlign:'center',}}>addDBonce</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'column',
            alignContent:'center',justifyContent:'center'}}>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    placeholder="input text"
                />
                <TouchableOpacity onPress={()=>{this._addData()}}
                    style={{backgroundColor:'green', borderRadius:10, padding:10,backgroundColor:'red',
                    margin:5,width:100}}>
                    <Text style={{color:'white', fontWeight:"bold",
                    textAlign:'center',}}>addDBonce</Text>
                </TouchableOpacity>
            </View>
        </View>
        );
    }
}
