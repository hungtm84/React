/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import App from './App';
import App from './components/App';
import {name as appName} from './app.json';
import ImageExample from './components/ImageExample';

//AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => ImageExample);
