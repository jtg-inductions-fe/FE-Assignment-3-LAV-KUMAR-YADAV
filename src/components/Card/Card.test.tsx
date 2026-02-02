import { describe, expect, it } from 'vitest';

import { render } from '@/lib';
import { screen } from '@testing-library/react';

import { Card } from './Card.component';
import type { CardProps } from './Card.types';

describe('Card Component', () => {
    const data: CardProps = {
        heading: 'heading',
        subheading: 'subheading',
        imageUrl: 'image-url',
    };

    const setup = () =>
        render({
            children: <Card {...data} />,
        });

    it('renders heading and subheading', () => {
        setup();
        expect(screen.getByText(data.heading)).toBeInTheDocument();
        expect(screen.getByText(data.subheading)).toBeInTheDocument();
    });
});
