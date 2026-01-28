import { createContext, useContext } from 'react';

import type { ThemeProviderState } from './ThemeProvider.types';

/**
 * Initial context state.
 */
const initialState: ThemeProviderState = {
    theme: 'system',
    setTheme: () => null,
};

/**
 * React context for theme management.
 */
export const ThemeProviderContext =
    createContext<ThemeProviderState>(initialState);

/** Hook to access and manage the current theme. */
export const useTheme = () => {
    const context = useContext(ThemeProviderContext);

    if (!context)
        throw new Error('useTheme must be used within a ThemeProvider');

    return context;
};
