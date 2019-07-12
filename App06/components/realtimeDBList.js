
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity,
    TextInput, ListView} from 'react-native';
import {firebaseApp} from './FirebaseConfig';
//import { thisExpression } from '@babel/types';

type Props = {};
export default class realtimeDBList extends Component<Props> {
    constructor(props){
        super(props);
        this.itemRef = firebaseApp.database();
        this.state = { 
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            text:'',
        };
    }
    listenForItems(itemRef){
        var items =[];    
        console.log('FB LINK ' + this.itemRef.ref('N1').child('N2'));
        console.log('itemsFB LINK ' + items.length);
        this.itemRef.ref('N1').child('N2').on('child_added', (data)=>{
            items.push({
                name:data.val(),
                key: data.key
            });
            console.log('data ' + data.val() + items.length);
        });
        console.log('items cout ' + items.length);
        this.setState({
           dataSource:this.state.dataSource.cloneWithRows(items),
        });
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
    listen
    render() {
        //listenForItems(this.itemRef);
        return (
        <View style={{flex:1, justifyContent:"center",alignItems:'center'}}>
            {/* <View style={{flexDirection:'column',
            alignContent:'center',justifyContent:'center'}}>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    placeholder="input text"/>
                <TouchableOpacity onPress={()=>{this._addData()}}
                    style={{backgroundColor:'green', borderRadius:10, padding:10,backgroundColor:'red',
                    margin:5,width:100}}>
                    <Text style={{color:'white', fontWeight:"bold",
                    textAlign:'center',}}>addDBonce</Text>
                </TouchableOpacity>
            </View> */}
            <View>
            <TouchableOpacity onPress={()=>{this.listenForItems(this.itemRef)}}>
            <Text>List</Text>
            </TouchableOpacity>
                
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow = {(rowData) => 
                        <View style={{borderWidth:1, padding:5, backgroundColor:'green'}}>
                            {/* <Text>{rowData.name}</Text> */}
                            <Text style={{fontSize:16,color:'white', fontWeight:'bold'}}>{rowData.name}</Text>
                        </View>
                    }
                    
                    />
                
            </View>
        </View>
        );
    }
    componentDidMount(){
        this.listenForItems(this.itemRef);
    }
}
