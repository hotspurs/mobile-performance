import React, { Component } from 'react';
import { View, 
         Text, 
         StyleSheet,
         Dimensions,
         Image 
} from 'react-native';
import OAuthManager from 'react-native-oauth';
import env from '../env.js';
import AccessToken from '../shared/access-token';
const manager = new OAuthManager('mobile-performance-react-native-ios');

manager.configure({
  github: {
    client_id: env.IOS_CLIENT_ID,
    client_secret: env.IOS_CLIENT_SECRET,
  },
});

import Button from './button';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        manager.authorize('github', { scopes: 'user'})
        .then(resp => {
            AccessToken.set(resp.response.credentials.accessToken);
            this.props.toRoute('repositories');
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