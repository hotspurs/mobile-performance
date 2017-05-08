import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#fff'
    },
    label: {
        fontSize: 14,
        fontFamily: 'Roboto',
        marginBottom: 10,
    },
    nameText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    owner: {
        fontSize: 16,
    },
    description: {
        fontSize: 14,
    },
    fork: {
        color: 'red'
    },
    count: {
        fontSize: 20,
        color: 'green'
    }
});

export default class Repo extends Component {
    constructor(props) {
        super(props);
        console.log(props.data);
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Название: <Text style={styles.nameText}>{this.props.data.name}</Text></Text>
                <Text style={styles.label}>Создатель: <Text style={styles.owner}>{this.props.data.owner.login}</Text></Text>
                {this.props.data.description ? <Text style={styles.label}>Описание: <Text style={styles.description}>{this.props.data.description}</Text></Text> : null }
                {this.props.data.fork ? <Text style={[styles.label, styles.fork]}>Это Форк</Text> : null}
                <Text style={styles.label}>Количество звезд: <Text style={styles.count}>{this.props.data.stargazers_count}</Text></Text>
                <Text style={styles.label}>Количество наблюдателей: <Text style={styles.count}>{this.props.data.watchers_count}</Text></Text>
            </View>
        );
    }
}