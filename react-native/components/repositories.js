import React, { Component } from 'react';
import Button from './button';
import { View, Text } from 'react-native';

import AccessToken from '../shared/access-token';

export default class Repositories extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<View>
                <Button onPress={() => { this.logout()}}>Выйти</Button>
            </View>);
    }
    logout() {
        AccessToken.clear();
        this.props.toRoute('login');
    }
}