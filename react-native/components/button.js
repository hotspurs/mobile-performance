import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    button: {
        width: windowWidth*0.5, 
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#000'
    },
    buttonText: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        flex: 1,
        justifyContent: 'center',
    }
})

export default class Button extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <TouchableOpacity onPress={() => { this.props.onPress() }} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.buttonText}>{this.props.children}</Text>
            </TouchableOpacity>
        );
    }
}