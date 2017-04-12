/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  View
} from 'react-native';

export default class reactNativeTest extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };

    this.loadData().then((movies) => {
      console.log('=>', movies);
      this.setSource(movies);
    });
  }
  loadData() {
    return fetch('https://api.github.com/users/hotspurs/repos')
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      });
  }
  setSource(data) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data)
    });
  }
  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text>{rowData.name}</Text>}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('reactNativeTest', () => reactNativeTest);
