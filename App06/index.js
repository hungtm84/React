/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import App from './App';
import App from './components/App';
import {name as appName} from './app.json';
import ImageExample from './components/ImageExample';
import realtimeDB from './components/realtimeDB';
import realtimeDBList from './components/realtimeDBList';

//AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => realtimeDBList);
