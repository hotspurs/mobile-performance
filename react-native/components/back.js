import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    button: {
        marginLeft: 10,
        marginTop: 5,
        padding: 8,
    },
    buttonText: {
        fontSize: 14,
    }
})

export default class Repo extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.back.bind(this)} style={styles.button}>
                    <Text style={styles.buttonText}>Назад</Text>
                </TouchableOpacity>
            </View>
        );
    }
    back() {
        this.props.navigator.pop();
    }
}