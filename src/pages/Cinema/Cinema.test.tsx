import { createMemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { render } from '@/lib';
import { useCinemaQuery, useSlotsByCinemaQuery } from '@/services';
import { screen } from '@testing-library/react';

import { Cinema } from './Cinema.page';

const cinemaData = {
    id: 1,
    name: 'PVR',
    location: {
        id: 1,
        location: 'gurugram',
    },
    rows: 20,
    seats_per_row: 30,
};

const movieSlots = [
    {
        id: 2,
        name: 'Pippa',
        languages: [{ id: 1, language: 'hindi' }],
        genres: [
            { id: 1, genre: 'drama' },
            { id: 3, genre: 'fight' },
        ],
        description: 'Movie description',
        duration: '03:00:00',
        slug: 'pippa',
        release_date: '2026-01-30',
        slots: [
            {
                id: 50,
                date_time: '2026-01-31T21:00:00+05:30',
                price: '178.00',
                cinema: 1,
                movie: 2,
                language: 1,
            },
        ],
        movie_poster: 'poster.png',
    },
];

vi.mock('@/services', async () => {
    const actual = await vi.importActual('@/services');

    return {
        ...actual,
        useCinemaQuery: vi.fn(),
        useSlotsByCinemaQuery: vi.fn(),
    };
});

describe('Cinema Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        vi.mocked(useCinemaQuery).mockReturnValue({
            data: cinemaData,
            isLoading: false,
            fetchNextPage: vi.fn(),
            fetchPreviousPage: vi.fn(),
            refetch: vi.fn(),
        });

        vi.mocked(useSlotsByCinemaQuery).mockReturnValue({
            data: movieSlots,
            isLoading: false,
            fetchNextPage: vi.fn(),
            fetchPreviousPage: vi.fn(),
            refetch: vi.fn(),
        });
    });

    const setup = () =>
        render({
            router: createMemoryRouter(
                [
                    {
                        path: '/cinema/:id',
                        element: <Cinema />,
                    },
                ],
                {
                    initialEntries: ['/cinema/1'],
                },
            ),
        });

    it('renders cinema section with correct aria-label', () => {
        setup();

        expect(
            screen.getByRole('region', {
                name: /pvr cinema/i,
            }),
        ).toBeInTheDocument();
    });

    it('renders cinema name and location', () => {
        setup();

        expect(
            screen.getByRole('heading', { name: 'PVR' }),
        ).toBeInTheDocument();

        expect(screen.getByText(/gurugram/i)).toBeInTheDocument();
    });

    it('renders movie name', () => {
        setup();

        expect(
            screen.getByRole('heading', { name: /pippa/i }),
        ).toBeInTheDocument();
    });

    it('renders movie slot card with price and language', () => {
        setup();

        expect(screen.getByText(/hindi/i)).toBeInTheDocument();
        expect(screen.getByText(/178.00/)).toBeInTheDocument();
    });

    it('renders booking link for slot', () => {
        setup();

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/booking/50');
    });
});
