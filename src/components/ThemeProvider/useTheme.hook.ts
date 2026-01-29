import { createContext, useContext } from 'react';

import type { ThemeProviderState } from './ThemeProvider.types';

/**
 * React context for theme management.
 */
export const ThemeProviderContext = createContext<
    ThemeProviderState | undefined
>(undefined);

/** Hook to access and manage the current theme. */
export const useTheme = (): ThemeProviderState => {
    const context = useContext(ThemeProviderContext);

    if (!context)
        throw new Error('useTheme must be used within a ThemeProvider');

    return context;
};
