/**
 * @format
 */

import {AppRegistry,} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TextBlink from './components/test01';
//import InputForm from './components/test02';
//import ReactButton from './components/ReactButton';
import Touchable from './components/Touchable';
import myScrollView from './components/myScrollView';
import myHorizontalScrollView from './components/myHorizontalScrollView';
import viewPagerExample from './components/viewPagerExample';
import flatListExample from './components/flatListExample';
import flatListExample2 from './components/flatListExample2';
import HorizontalFlatList from './components/HorizontalFlatList';
import BasicSectionList from './components/BasicSectionList';

//AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => TextBlink);
//AppRegistry.registerComponent(appName, () => ReactButton);
//AppRegistry.registerComponent(appName, () => Touchable);
//AppRegistry.registerComponent(appName, () => myScrollView);
//AppRegistry.registerComponent(appName, () => viewPagerExample);
//AppRegistry.registerComponent(appName, () => flatListExample2);
//AppRegistry.registerComponent(appName, () => BasicSectionList);