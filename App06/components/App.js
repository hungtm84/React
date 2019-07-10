
import React, {Component} from 'react';
import  {Platform, StyleSheet, Text, View} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
//import {Navigator} from 'react-native-custom-components';
import Login from '../components/Login';
import Register from '../components/Register';
import Welcome from './Welcome';

type Props = {};
export default class App extends Component<Props> {
  renderScene(route,navigator){
    switch (route.name){
      case 'login':return(
        <Login
          goRegister={()=>{
            navigator.push({name:'register'})
          }}
          goWelcome={()=>{
            navigator.push({name:'welcome'})
          }}
        />
      );
      case 'register':return(
        <Register
           goLogin={()=>{
            navigator.push({name:'login'})
          }}
        />
        );
      case 'welcome':return(
        <Welcome
          

        />
        );
    }
  }
  render(){
    return(
        <Navigator initialRoute={{name:'login'}} renderScene={this.renderScene}>
        </Navigator>

    );
  }
}
