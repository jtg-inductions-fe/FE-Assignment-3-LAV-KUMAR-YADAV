import { createContext, useContext, useEffect, useState } from 'react';

/**
 * Supported theme modes.
 */
type Theme = 'dark' | 'light' | 'system';

/**
 * Props accepted by the ThemeProvider component.
 */
type ThemeProviderProps = {
    /**
     * Child components that will receive theme context.
     */
    children: React.ReactNode;

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
type ThemeProviderState = {
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
const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

/**
 * ThemeProvider component.
 *
 * Provides theme state and updater function to the component tree.
 * Applies the selected theme to the document root and persists
 * the preference in localStorage.
 */
export const ThemeProvider = ({
    children,
    defaultTheme = 'system',
    storageKey = 'vite-ui-theme',
    ...props
}: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
    );

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove('light', 'dark');

        if (theme === 'system') {
            const systemTheme = window.matchMedia(
                '(prefers-color-scheme: dark)',
            ).matches
                ? 'dark'
                : 'light';

            root.classList.add(systemTheme);

            return;
        }

        root.classList.add(theme);
    }, [theme]);

    const value = {
        theme,
        setTheme: (localTheme: Theme) => {
            localStorage.setItem(storageKey, localTheme);
            setTheme(localTheme);
        },
    };

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);

    if (context === undefined)
        throw new Error('useTheme must be used within a ThemeProvider');

    return context;
};
