/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from '../App';
import {name as appName} from '../app.json';
import fs from 'fs';
AppRegistry.registerComponent(appName, () => App);
