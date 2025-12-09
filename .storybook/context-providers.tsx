import React, { createContext, useContext, ReactNode, useMemo, useState, useRef, useCallback } from 'react';

// Chrome Context
export interface ChromeConfig {
  app?: string;
  bundle?: string;
  bundleTitle?: string;
  permissions?: { permission: string }[];
}

const ChromeContext = createContext<ChromeConfig>({
  app: 'test-app',
  bundle: 'insights',
  bundleTitle: 'RHEL',
  permissions: [],
});

export const ChromeProvider: React.FC<{ value: ChromeConfig; children: ReactNode }> = ({ value, children }) => (
  <ChromeContext.Provider value={value}>{children}</ChromeContext.Provider>
);

export const useChrome = () => {
  const config = useContext(ChromeContext);
  
  return useMemo(() => ({
    getApp: () => config.app || 'test-app',
    getBundle: () => config.bundle || 'insights',
    getBundleData: () => ({ bundleTitle: config.bundleTitle || 'RHEL' }),
    getUserPermissions: () => Promise.resolve(config.permissions || []),
    on: () => () => {},
  }), [config]);
};

// Unleash/Feature Flags Context
export interface FlagConfig {
  name: string;
  enabled: boolean;
  variant: {
    name: string;
    payload?: unknown;
  };
}

interface UnleashContextType {
  flags: FlagConfig[];
  setFlags: React.Dispatch<React.SetStateAction<FlagConfig[]>>;
  togglesRef: React.MutableRefObject<FlagConfig[]>;
}

const UnleashContext = createContext<UnleashContextType | null>(null);

export const UnleashProvider: React.FC<{ flags: FlagConfig[]; children: ReactNode }> = ({ flags: initialFlags, children }) => {
  const [flags, setFlags] = useState<FlagConfig[]>(initialFlags);
  const togglesRef = useRef<FlagConfig[]>(initialFlags.map(f => ({ ...f })));

  // Keep togglesRef in sync with flags
  React.useEffect(() => {
    togglesRef.current = flags.map(f => ({ ...f }));
  }, [flags]);

  return (
    <UnleashContext.Provider value={{ flags, setFlags, togglesRef }}>
      {children}
    </UnleashContext.Provider>
  );
};

export const useFlags = () => {
  const context = useContext(UnleashContext);
  if (!context) {
    return [];
  }
  return context.flags;
};

export const useUnleashClient = () => {
  const context = useContext(UnleashContext);
  
  const emit = useCallback((event: string) => {
    if (event === 'update' && context) {
      // Sync state from toggles ref
      context.setFlags([...context.togglesRef.current]);
    }
  }, [context]);

  if (!context) {
    return { toggles: [], emit: () => {} };
  }

  return {
    toggles: context.togglesRef.current,
    emit,
  };
};

export { ChromeContext, UnleashContext };


