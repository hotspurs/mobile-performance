import React, { Component } from 'react';
import { 
    Navigator, 
    StatusBar, 
    Text,
    StyleSheet,
    View } from 'react-native';

import SharedStyles from '../shared/styles';
import Routes from '../shared/routes';
import Tabs from 'react-native-tabs';

const styles = StyleSheet.create({
    sceneContainer: {
        flex: 1,
        paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight,
        paddingBottom: 50,
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
    onTabSelect(el) {
        if (this.state.route !== el.props.name) {
            this.toRoute(el.props.name);
        }
    }
    renderScene(route, navigator) {
        let style = route.hideNavigationBar ? { paddingTop: 0} : {};

        let selected;

        if (route.name === 'repositories' || route.name === 'repo') {
            selected = 'repositories';
        } else {
            selected = route.name;
        }

        let tabs = <Tabs selected={selected} style={{backgroundColor:'white'}}
                    selectedStyle={{color:'red'}} onSelect={this.onTabSelect.bind(this)}>
                        <Text locked={route.name === 'repositories'} name="repositories">Мои репозитории</Text>
                        <Text locked={route.name === 'search'} name="search">Поиск</Text>
                    </Tabs>
        return (
            <View style={[styles.sceneContainer, style]}>
                <route.component
                    data={route.data ? route.data : {}}
                    navigator={navigator}
                    back={() => this.back()}
                    backToHome={() => this.backToHome()}
                    toRoute={(route, args)=> this.toRoute(route, args)}
                    replaceRoute={(route, args) => this.replaceRoute(route, args)}
                />
                {route.name !== 'login' ? tabs : null}      
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
            state.route = route.name;

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
