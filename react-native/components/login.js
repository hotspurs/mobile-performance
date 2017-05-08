import React, { Component } from 'react';
import { View, 
         Text, 
         StyleSheet,
         Dimensions,
         Image,
         AsyncStorage
} from 'react-native';

import AccessToken from '../shared/access-token';
import authManager from '../shared/auth-manager';
import Button from './button';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        width: windowWidth * 0.5,
        height: windowWidth * 0.5,
    },
});

export default class Login extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        AccessToken.get().then(() => {
            this.props.replaceRoute('repositories');
        });
    }
    login() {
        authManager.authorize('github', { scopes: 'user'})
        .then(resp => {
            AccessToken.set(resp.response.credentials.accessToken);
            authManager
            .makeRequest('github', '/user')
            .then(resp => {
                AsyncStorage.setItem('user', JSON.stringify(resp.data));
                this.props.toRoute('repositories');
            });
        })
        .catch(err => {
            console.log('There was an error', err);
        });        
    }
    render() {
        return (
            <View style={styles.container}>
                <Image source={require("../images/logo.png")} resizeMode="contain" style={styles.logo} />
                <Button onPress={() => { this.login()}}>
                    Войти
                </Button>
            </View>
        );
    }
}