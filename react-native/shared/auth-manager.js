import { Platform } from 'react-native';
import OAuthManager from 'react-native-oauth';
import env from '../env.js';
const authManager = new OAuthManager('mobile-performance-react-native-ios');

authManager.configure({
  github: {
    client_id: Platform.OS === 'ios' ? env.IOS_CLIENT_ID : env.ANDROID_CLIENT_ID,
    client_secret: Platform.OS === 'ios' ? env.IOS_CLIENT_SECRET: env.ANDROID_CLIENT_SECRET,
  },
});

export default authManager;