import { SunMoon } from 'lucide-react';

import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/button';

/**
 * Theme mode toggle button.
 *
 * Allows the user to switch between light and dark themes.
 * Uses the global ThemeProvider context.
 */
export const ModeToggle = () => {
    const { theme, setTheme } = useTheme();

    /**
     * Toggles the theme between light and dark mode.
     */
    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Theme"
        >
            <SunMoon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
    );
};
