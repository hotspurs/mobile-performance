import React, { Component } from 'react';
import { StyleSheet, 
         View, 
         TouchableOpacity, 
         Image, AsyncStorage} from 'react-native';

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
            <View style={styles.container}>
                <TouchableOpacity>
                    <Image style={styles.avatar} source={{  uri: this.state.url }} resizeMode="contain" />
                </TouchableOpacity>
            </View>
        );
    }
}