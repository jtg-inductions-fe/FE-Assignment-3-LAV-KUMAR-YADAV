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
        <TypographyMuted className="text-center p-4">
            CopyRight 2026 © Josh Entertainment Pvt. Ltd. All rights reserved.
            The content and Images used on this site are copyright protected
            vests with the respective owners. The usage of the content and
            images on this website is intended to promote the works and no
            endorsement of the artist shall be implied. Unauthorised use is
            prohibited and punishable by law.
        </TypographyMuted>
    </footer>
);
