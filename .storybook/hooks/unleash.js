import { useFlags, useUnleashClient } from '../context-providers';

export { useFlags, useUnleashClient };

// Mock other exports that might be used
export const FlagProvider = ({ children }) => children;
export const UnleashClient = class {};
export const useVariant = () => ({ name: 'disabled', enabled: false });
export const IToggle = {};


