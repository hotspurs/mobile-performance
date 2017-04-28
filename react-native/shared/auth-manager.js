import OAuthManager from 'react-native-oauth';
import env from '../env.js';
const authManager = new OAuthManager('mobile-performance-react-native-ios');

authManager.configure({
  github: {
    client_id: env.IOS_CLIENT_ID,
    client_secret: env.IOS_CLIENT_SECRET,
  },
});

export default authManager;