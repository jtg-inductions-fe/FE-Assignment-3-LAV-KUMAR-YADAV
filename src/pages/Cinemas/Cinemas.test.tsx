import { createMemoryRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';

import { render } from '@/lib';
import { useCinemasQuery, useLocationsQuery } from '@/services';
import { screen } from '@testing-library/react';

import { Cinemas } from './Cinemas.page';

const cinemasData = [
    {
        id: 3,
        name: 'Inox',
        location: {
            id: 1,
            location: 'gurugram',
        },
        rows: 20,
        seats_per_row: 20,
    },
    {
        id: 2,
        name: 'Inox',
        location: {
            id: 2,
            location: 'delhi',
        },
        rows: 20,
        seats_per_row: 30,
    },
    {
        id: 1,
        name: 'PVR',
        location: {
            id: 1,
            location: 'gurugram',
        },
        rows: 20,
        seats_per_row: 30,
    },
];

const locationData = [
    { id: 1, location: 'gurugram' },
    { id: 2, location: 'delhi' },
];

vi.mock(import('@/services'), async (importOriginals) => {
    const actual = await importOriginals();

    return {
        ...actual,
        useCinemasQuery: vi.fn(),
        useLocationsQuery: vi.fn(),
    };
});

describe('Cinemas Page', () => {
    const setup = () => {
        vi.mocked(useCinemasQuery).mockReturnValue({
            fetchNextPage: vi.fn(),
            fetchPreviousPage: vi.fn(),
            refetch: vi.fn(),
            data: cinemasData,
            isLoading: false,
        });
        vi.mocked(useLocationsQuery).mockReturnValue({
            fetchNextPage: vi.fn(),
            fetchPreviousPage: vi.fn(),
            refetch: vi.fn(),
            data: locationData,
            isLoading: false,
        });

        return render({
            router: createMemoryRouter([
                {
                    path: '/',
                    element: <Cinemas />,
                },
            ]),
        });
    };

    it('should renders Cinemas', () => {
        setup();
        expect(
            screen.getByRole('region', {
                name: 'Cinemas',
            }),
        ).toBeInTheDocument();
    });
});
