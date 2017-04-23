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
import OAuthManager from 'react-native-oauth';
import env from './env.js';
const manager = new OAuthManager('mobile-performance-react-native-ios');

manager.configure({
  github: {
    client_id: env.IOS_CLIENT_ID,
    client_secret: env.IOS_CLIENT_SECRET,
  },
});

manager.authorize('github', { scopes: 'user'})
.then(resp => console.log('Your users ID', resp))
.catch(err => console.log('There was an error', err));

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
