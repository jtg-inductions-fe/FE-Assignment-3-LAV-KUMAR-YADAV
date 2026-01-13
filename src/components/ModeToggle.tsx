import { SunMoon } from 'lucide-react';

import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/button';

export const ModeToggle = () => {
    const { theme, setTheme } = useTheme();

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
