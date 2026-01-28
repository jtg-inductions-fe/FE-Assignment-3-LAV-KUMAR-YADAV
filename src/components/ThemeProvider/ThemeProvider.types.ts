import type { ReactNode } from 'react';

/**
 * Supported theme modes.
 */
export type Theme = 'dark' | 'light' | 'system';

/**
 * Props accepted by the ThemeProvider component.
 */
export type ThemeProviderProps = {
    /**
     * Child components that will receive theme context.
     */
    children: ReactNode;

    /**
     * Default theme when no value is found in localStorage.
     *
     * @default 'system'
     */
    defaultTheme?: Theme;

    /**
     * Key used to store the selected theme in localStorage.
     *
     * @default 'vite-ui-theme'
     */
    storageKey?: string;
};

/**
 * Shape of the theme context state.
 */
export type ThemeProviderState = {
    /**
     * Current selected theme.
     */
    theme: Theme;

    /**
     * Updates the active theme.
     *
     * @param theme - New theme value.
     */
    setTheme: (theme: Theme) => void;
};
