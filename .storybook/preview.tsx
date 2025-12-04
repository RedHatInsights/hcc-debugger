import React from 'react';
import type { Preview } from '@storybook/react-webpack5';
import '@patternfly/react-core/dist/styles/base.css';
import { ChromeProvider, UnleashProvider, ChromeConfig, FlagConfig } from './context-providers';

// Default mock data
const defaultPermissions = [
  { permission: 'inventory:hosts:read' },
  { permission: 'inventory:hosts:write' },
  { permission: 'inventory:groups:read' },
  { permission: 'cost-management:cost_model:read' },
  { permission: 'cost-management:cost_model:write' },
  { permission: 'cost-management:rate:read' },
  { permission: 'playbook-dispatcher:run:read' },
  { permission: 'playbook-dispatcher:run:write' },
  { permission: 'advisor:recommendation:read' },
  { permission: 'advisor:system:read' },
  { permission: 'rbac:principal:read' },
  { permission: 'rbac:group:read' },
  { permission: 'rbac:group:write' },
  { permission: 'rbac:role:read' },
  { permission: 'sources:source:read' },
  { permission: 'sources:source:write' },
];

const defaultFlags: FlagConfig[] = [
  { name: 'platform.chrome.notifications', enabled: true, variant: { name: 'enabled' } },
  { name: 'platform.chrome.dark-mode', enabled: false, variant: { name: 'disabled' } },
  { name: 'platform.chrome.new-nav', enabled: true, variant: { name: 'enabled' } },
  { name: 'platform.insights.advisor-new-ui', enabled: true, variant: { name: 'variant-a', payload: { showBanner: true, maxItems: 10 } } },
  { name: 'platform.insights.inventory-groups', enabled: false, variant: { name: 'disabled' } },
  { name: 'platform.rbac.new-permissions', enabled: true, variant: { name: 'enabled' } },
  { name: 'platform.cost.enhanced-reports', enabled: false, variant: { name: 'disabled' } },
  { name: 'platform.sources.webhook-support', enabled: true, variant: { name: 'beta', payload: 'v2-webhooks' } },
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'fullscreen',
    // Default configurations
    chrome: {
      app: 'test-app',
      bundle: 'insights',
      bundleTitle: 'RHEL',
      permissions: defaultPermissions,
    },
    flags: defaultFlags,
  },
  decorators: [
    (Story, { parameters }) => {
      const chromeConfig: ChromeConfig = {
        app: 'test-app',
        bundle: 'insights',
        bundleTitle: 'RHEL',
        permissions: defaultPermissions,
        ...parameters.chrome,
      };

      const flags: FlagConfig[] = parameters.flags || defaultFlags;

      return (
        <ChromeProvider value={chromeConfig}>
          <UnleashProvider flags={flags}>
            <div style={{ height: '600px', display: 'flex', flexDirection: 'column' }}>
              <Story />
            </div>
          </UnleashProvider>
        </ChromeProvider>
      );
    },
  ],
};

export default preview;

