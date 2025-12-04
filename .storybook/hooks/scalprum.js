// Mock @scalprum/core for Storybook
export const getScalprum = () => ({
  appsConfig: {
    'test-app': {
      name: 'test-app',
      manifestLocation: '/apps/test-app/fed-mods.json',
    },
  },
});

export const ScalprumProvider = ({ children }) => children;

