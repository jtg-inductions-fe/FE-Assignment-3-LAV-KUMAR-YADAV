import type { ReactNode } from 'react';

/**
 * Configuration structure for a social media link.
 *
 * Used to define social media platform metadata including
 * display name, destination link, and icon representation.
 */
export type SocialMediaConfigTYpe = {
    /**
     * URL of the social media profile or page.
     */
    link: string;

    /**
     * Display name of the social media platform.
     */
    name: string;

    /**
     * React node representing the platform's icon.
     */
    icon: ReactNode;
};
