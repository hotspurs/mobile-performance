import React, { Component } from 'react';
import Button from './button';
import RepoPreview from './repo-preview';
import { View, ListView, Text, StyleSheet } from 'react-native';
import authManager from '../shared/auth-manager';
import AccessToken from '../shared/access-token';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    rowItemSeparator: {
        borderWidth: 1,
        borderColor: '#F5F5F5',      
    }
});

export default class Repositories extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
        };

        this.loadRepositories().then((repositories) => {
            this.setSource(repositories);
        });
    }
    loadRepositories() {
        return authManager.makeRequest('github', '/user/repos')
        .then(resp => {
            return resp.data;
        });
    }
    setSource(data) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data)
        });
    }
    render() {
        return (<View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <RepoPreview toRoute={this.props.toRoute} info={rowData} />}
                    renderSeparator={(sectionId, rowId) => {
                        return <View key={rowId} style={styles.rowItemSeparator}/>
                    }}
                />            
            </View>);
    }
    logout() {
        AccessToken.clear();
        authManager.deauthorize('github');
        this.props.toRoute('login');
    }
}