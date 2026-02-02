import { createMemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { render } from '@/lib';
import { useSlotDetailsQuery } from '@/services';
import { screen } from '@testing-library/react';

import { Booking } from './Booking.page';

const slotDetailsMock = {
    slot: {
        id: 10,
        date_time: '2026-02-01T18:30:00+05:30',
        price: '200',
        language: 1,
    },
    movie: {
        id: 5,
        name: 'Pippa',
        languages: [{ id: 1, language: 'hindi' }],
    },
    cinema: {
        id: 1,
        name: 'PVR',
        rows: 5,
        seats_per_row: 6,
        location: {
            id: 1,
            location: 'gurugram',
        },
    },
    booked_seats: [],
};

vi.mock('@/services', async () => {
    const actual = await vi.importActual('@/services');

    return {
        ...actual,
        useSlotDetailsQuery: vi.fn(),
        useBookingMutation: () => [vi.fn(), { isLoading: false }],
    };
});

describe('Booking Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const setup = () =>
        render({
            router: createMemoryRouter(
                [
                    {
                        path: '/booking/:slotId',
                        element: <Booking />,
                    },
                ],
                {
                    initialEntries: ['/booking/10'],
                },
            ),
        });

    it('renders booking details when slot data is available', () => {
        vi.mocked(useSlotDetailsQuery).mockReturnValue({
            data: slotDetailsMock,
            isLoading: false,
            error: null,
            refetch: vi.fn(),
        });

        setup();

        expect(
            screen.getByRole('heading', {
                name: /pippa - \(hindi\)/i,
            }),
        ).toBeInTheDocument();

        expect(screen.getByText(/gurugram pvr/i)).toBeInTheDocument();

        expect(screen.getByText(/screen this way/i)).toBeInTheDocument();
    });

    it('renders seat legends (Available / Selected / Booked)', () => {
        vi.mocked(useSlotDetailsQuery).mockReturnValue({
            data: slotDetailsMock,
            isLoading: false,
            error: null,
            refetch: vi.fn(),
        });

        setup();

        expect(screen.getByText(/available/i)).toBeInTheDocument();
        expect(screen.getByText(/selected/i)).toBeInTheDocument();
        expect(screen.getByText(/booked/i)).toBeInTheDocument();
    });

    it('renders SeatGrid component', () => {
        vi.mocked(useSlotDetailsQuery).mockReturnValue({
            data: slotDetailsMock,
            isLoading: false,
            error: null,
            refetch: vi.fn(),
        });

        setup();

        expect(screen.getByAltText(/cinema screen/i)).toBeInTheDocument();
    });
});
