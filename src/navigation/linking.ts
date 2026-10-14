import type { LinkingOptions } from '@react-navigation/native';
import type { RootStackParamList } from './types';

/**
 * Deep-link configuration. A configured scheme means every screen is reachable
 * by URL, which is what lets the screenshot/visual-verification tooling capture
 * each screen automatically instead of only the launch screen.
 */
export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['appstarter://'],
  config: {
    screens: {
      Tabs: {
        screens: {
          Home: 'home',
          Settings: 'settings',
        },
      },
      Details: 'details',
    },
  },
};
