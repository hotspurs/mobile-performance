import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    name: {
        fontFamily: 'Roboto',
        fontSize: 18,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#000',
        padding: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
    }
});

export default class RepoPreview extends Component {
    constructor(props) {
        super(props)
    }
    onButtonPress() {
        this.props.toRoute('repo', this.props.info);
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.name}>
                        {this.props.info.name}
                    </Text>
                    <Text>
                        {this.props.info.owner ? this.props.info.owner.login : null}
                    </Text>
                </View>
                <TouchableOpacity onPress={this.onButtonPress.bind(this)} style={styles.button}>
                    <Text style={styles.buttonText}>Подробнее</Text>
                </TouchableOpacity>
            </View>
        );
    }
}