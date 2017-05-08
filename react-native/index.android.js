import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  View
} from 'react-native';
import RootNavigator from './components/root-navigator';
import { MenuContext } from 'react-native-menu';
export default class reactNativeTest extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <MenuContext style={styles.container}>
        <RootNavigator ref="rootNavigator" />
      </MenuContext>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

AppRegistry.registerComponent('reactNativeTest', () => reactNativeTest);
