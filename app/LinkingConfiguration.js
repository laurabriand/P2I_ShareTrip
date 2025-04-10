// LinkingConfiguration.js
import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.createURL('/'), 'myapp://'],
  config: {
    screens: {
      '(tabs)': {
        screens: {
          index: '',
          activities: 'activities',
          archive: 'archive',
          profile: 'profile',
          participants: 'participants',
        },
      },
      auth: {
        screens: {
          login: 'login',
          signup: 'signup',
        },
      },
      firstScreen: 'first',
      '+not-found': '*',
    },
  },
};
