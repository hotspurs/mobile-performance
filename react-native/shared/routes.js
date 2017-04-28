import Repositories from '../components/repositories';
import Login from '../components/login';
import Avatar from '../components/avatar';

class Routes {
    get(route, args) {
        if ("undefined" == typeof this[route]) {
            console.warn('No route found  with name' + route);
            return false;
        } else {
            return this[route].call(this, args);
        }
    }
    login() {
        return {
            name: 'login',
            title: 'Логин',
            component: Login,
            leftButton: null,
            rightButton: null,
            hideNavigationBar: true,
            statusBarStyle: 'default'
        };
    }
    repositories() {
        return {
            name: 'repositories',
            title: 'Мои репозитории',
            component: Repositories,
            leftButton: null,
            rightButton: Avatar,
            hideNavigationBar: false,
            statusBarStyle: 'default'
        };
    }
}

export default new Routes();