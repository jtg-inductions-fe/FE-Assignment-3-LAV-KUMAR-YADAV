import { TypographyMuted } from '@/components';

import { socialMediaConfig } from './footer.config';
/**
 *
 * @returns Footer container
 */
export const Footer = () => (
    <footer>
        <div className="h-0.5 w-full bg-accent mb-5"></div>
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
        <TypographyMuted className="text-center p-4 select-none">
            CopyRight 2026 © Josh Entertainment Pvt. Ltd. All rights reserved.
        </TypographyMuted>
    </footer>
);
