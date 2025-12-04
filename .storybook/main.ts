import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/react-webpack5',
  webpackFinal: async (config) => {
    // Mock hooks for Storybook - replace real implementations with context-aware versions
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@redhat-cloud-services/frontend-components/useChrome': path.resolve(process.cwd(), '.storybook/hooks/useChrome'),
        '@unleash/proxy-client-react': path.resolve(process.cwd(), '.storybook/hooks/unleash'),
        '@scalprum/core': path.resolve(process.cwd(), '.storybook/hooks/scalprum'),
      },
    };

    // Add SCSS support
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    
    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    });

    return config;
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
