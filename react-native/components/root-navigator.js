import React, { Component } from 'react';
import { 
    Navigator, 
    StatusBar, 
    Text,
    StyleSheet,
    View } from 'react-native';

import SharedStyles from '../shared/styles';
import Routes from '../shared/routes';

const styles = StyleSheet.create({
    sceneContainer: {
        flex: 1,
        paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight,
    },
    navBar: {
        backgroundColor: '#CCC',
        borderBottomColor: '#000',
        borderBottomWidth: 1
    },
    buttonStyle: { marginTop: 13 },
    titleStyle: { marginTop: 10 }
});

const navigationBarRouteMapper = {
    LeftButton: (route, navigator, index, navState) => {
        return route.leftButton ? (
            <route.leftButton
                style={styles.buttonStyle}
                navigator={navigator}
                route={route}
            />
        ) 
        : null;
    },
    Title: (route, navigator, index, navState) => {
        return route.title ? (
            <Text
                style={[styles.titleStyle, SharedStyles.navBarTitleText]}
                numberOfLines={1}>
                {route.title}
            </Text>
        ) : null;
    },
    RightButton: (route, navigator, index, navState) => {
        return route.rightButton ? (
            <route.rightButton
                style={styles.buttonStyle}
                navigator={navigator}
                route={route}
            />
        ) 
        : null;
    },
};

export default class RootNavigator extends Component {
    constructor(props) {
        super(props);
        this.state = { hideNavigationBar: false };
    }
    componentDidMount() {
        this._setupRoute(this._getInitialRoute());
    }
    componentWillUnmount() {
        if (this._listeners) {
            this._listeners.forEach((listener) => listener.remove());
        }
    }
    onNavWillFocus(route) {
        this._setupRoute(route.currentTarget.currentRoute)
    }
    render() {

        let NavigatorBar = (
            <Navigator.NavigationBar
                routeMapper={navigationBarRouteMapper}
                style={styles.navBar}
            />
        );

        return (<Navigator 
            ref={(navigator) => this._setNavigatorRef(navigator)}
            initialRoute={this._getInitialRoute()}
            renderScene={(route, navigator) => this.renderScene(route, navigator)}
            navigationBar={this.state.hideNavigationBar ? null : NavigatorBar}
        />);
    };
    _setNavigatorRef(navigator) {
        if (navigator !== this.navigator) {
            this.navigator = navigator;

            if (navigator) {
                this._listeners = [
                    navigator.navigationContext.addListener('willfocus', this.onNavWillFocus.bind(this)),
                ];
            } else {
                if (this._listeners) {
                    this._listeners.forEach((listener) => {
                        listener.remove();
                    });
                }
            }
        }
    }
    _getInitialRoute() {
        return Routes.login();
    }
    renderScene(route, navigator) {
        let style = route.hideNavigationBar ? { paddingTop: 0} : {};
        return (
            <View style={[styles.sceneContainer, style]}>
                <route.component
                    navigator={navigator}
                    back={() => this.back()}
                    backToHome={() => this.backToHome()}
                    toRoute={(route, args)=> this.toRoute(route, args)}
                    replaceRoute={(route, args) => this.replaceRoute(route, args)}
                />
            </View>
        );
    }
    back() {
        this.navigation.pop();
    }
    backToHome() {
        this.navigation.popToTop();
    }
    toRoute(route, args) {
        if ('string' !== typeof route || (route = Routes.get(route, args))) {
            this.navigator.push(route);
        }
    }
    replaceRoute(route, args) {
        if ('string' !== typeof route || (route = Routes.get(route, args))) {
            this.navigator.replace(route);
        }
    }
    _setupRoute(route) {
        if (route) {
            let state = {};

            if (this.state.hideNavigationBar !== route.hideNavigationBar) {
                state.hideNavigationBar = route.hideNavigationBar;
            }

            if (this.state.statusBarStyle !== route.statusBarStyle) {
                state.statusBarStyle = route.statusBarStyle;
                StatusBar.setBarStyle(route.statusBarStyle, true);
                StatusBar.setHidden(false, "slide");
            }

            this.setState(state);
        }
    }
}
