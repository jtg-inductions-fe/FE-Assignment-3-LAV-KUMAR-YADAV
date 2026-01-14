import { Facebook, Instagram, Linkedin, X, Youtube } from 'lucide-react';

import type { SocialMediaConfigTYpe } from './footer.types';

/**
 * Social Media Links for footer
 */
export const socialMediaConfig: SocialMediaConfigTYpe[] = [
    {
        name: 'Facebook',
        link: 'https://www.facebook.com',
        icon: <Facebook />,
    },
    {
        name: 'X',
        link: 'https://www.x.com',
        icon: <X />,
    },
    {
        name: 'Instagram',
        link: 'https://www.instagram.com',
        icon: <Instagram />,
    },
    {
        name: 'Youtube',
        link: 'https://www.youtube.com',
        icon: <Youtube />,
    },
    {
        name: 'LinkedIn',
        link: 'https://www.linkedin.com',
        icon: <Linkedin />,
    },
];
