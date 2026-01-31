import { TypographyMuted } from '@/components';

import { socialMediaConfig } from './footer.config';

/**
 * Footer container
 *
 * Renders the application footer with social media links and copyright
 * information.
 *
 * @example
 * ```tsx
 * <Footer />
 * ```
 */

export const Footer = () => (
    <footer className="bg-card">
        <div className="bg-accent mb-5 h-0.5 w-full"></div>
        <ul
            className="flex items-center justify-center gap-4 p-2"
            aria-label="social media links"
        >
            {socialMediaConfig.map((social, index) => (
                <li key={index}>
                    <a
                        href={social.link}
                        aria-label={social.name}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {social.icon}
                    </a>
                </li>
            ))}
        </ul>
        <TypographyMuted className="p-4 text-center select-none">
            Copyright 2026 © Josh Entertainment Pvt. Ltd. All rights reserved.
        </TypographyMuted>
    </footer>
);
