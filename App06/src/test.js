/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; 
import Drawer from 'react-native-drawer';
import {Navigator} from 'react-native-deprecated-custom-components';
import Swiper from 'react-native-swiper';
import TabNavigator from 'react-native-tab-navigator';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class test extends Component<Props> {
    closeControlPanel = () => {
    this._drawer.close()
    };
    openControlPanel = () => {
    this._drawer.open()
    };
    renderScene(route,navigator){
        switch (route.name){
          case 'login':return(
            <View><Text>login</Text></View>
          );
          case 'welcome':return(
           <View><Text>welcome</Text></View>
            );
        }
      };
  render() {
    const routes = [
        {title: 'First Scene', index: 0},
        {title: 'Second Scene', index: 1},
      ];
    return (
      <View style={styles.container}>
        <View style={styles.container}>
            <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }}
            >
            </MapView>
            
        </View>
        <View>
            <Drawer></Drawer>
        </View>
        <View>
        <Navigator initialRoute={{name:'login'}} renderScene={this.renderScene}>
        </Navigator>
        <TabNavigator>
           
            </TabNavigator>
            <Swiper>
            <View>
          <Text >Beautiful</Text>
        </View>
        <View >
          <Text >And simple</Text>
        </View>

            </Swiper>
        </View>
      </View>
    );
  }
}
    
const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });