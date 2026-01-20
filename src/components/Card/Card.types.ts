import type { ComponentProps } from 'react';

export type CardProps = ComponentProps<'div'> & {
    /**
     * To Show the Image in the card
     */
    imageUrl: string;

    /**
     * Heading of the card
     */
    heading: string;

    /**
     * Subheading of the card
     */
    subheading: string;
};
