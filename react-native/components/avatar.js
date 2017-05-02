import React, { Component } from 'react';
import { StyleSheet, 
         View,
         Image, AsyncStorage, Text} from 'react-native';
import Menu, { MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import authManager from '../shared/auth-manager';
import AccessToken from '../shared/access-token';
import Routes from '../shared/routes';

const styles = StyleSheet.create({
    container: {
        height: 30,
        width: 30,
        marginTop: 5,
        marginRight: 10,
    },
    avatar: {
        height: 30,
        width: 30,
        borderRadius: 15
    }
});

export default class Avatar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
        }
    }
    componentDidMount() {
       AsyncStorage.getItem('user').then((data) => {
         this.setState({
             url: JSON.parse(data).avatar_url
         })
       });
    }
    render() {
        return (
            <Menu onSelect={this.logout.bind(this)} style={styles.container}>
                <MenuTrigger>
                    <Image style={styles.avatar} source={{  uri: this.state.url }} resizeMode="contain" />
                </MenuTrigger>
                <MenuOptions>
                    <MenuOption value={1}>
                        <Text>Выйти</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        );
    }
    logout() {
        const route = Routes.get('login')
        AccessToken.clear();
        authManager.deauthorize('github');
        this.props.navigator.push(route);
    }
}