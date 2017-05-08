import React, { Component } from 'react';
import { View, ListView, Text, StyleSheet, TextInput } from 'react-native';
import authManager from '../shared/auth-manager';
import RepoPreview from './repo-preview';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    input: {
        marginTop: 25,
        borderColor: 'gray', 
        borderWidth: 1,
        paddingLeft: 20,
        paddingRight: 20,
        height: 50
    },
    rowItemSeparator: {
        borderWidth: 1,
        borderColor: '#F5F5F5',      
    }
});

export default class Search extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
            value: '',
        };
    }
    setSource(data) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data)
        });
    }
    onInputChange(value) {
        this.setState({ value })
    }
    onSubmit() {
        return authManager.makeRequest('github', `/search/repositories?q=${this.state.value}`)
        .then(resp => {
            this.setSource(resp.data.items);
        });
    }
    render() {
        return <View style={styles.container}>

            <TextInput
                value={this.state.value}
                onChangeText={this.onInputChange.bind(this)}
                onSubmitEditing={this.onSubmit.bind(this)}
                placeholder="Введите поисковый запрос"
                blurOnSubmit={true}
                returnKeyType="done"
                style={styles.input}
            />
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData) => <RepoPreview toRoute={this.props.toRoute} info={rowData} />}
                renderSeparator={(sectionId, rowId) => {
                    return <View key={rowId} style={styles.rowItemSeparator}/>
                }}
            />
        </View>
    }
}