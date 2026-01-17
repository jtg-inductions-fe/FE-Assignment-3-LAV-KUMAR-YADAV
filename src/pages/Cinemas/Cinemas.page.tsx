import { format } from 'date-fns';
import { LocationEdit } from 'lucide-react';
import { Link, useSearchParams } from 'react-router';

import CinemasNotAvailable from '@/assets/images/cinemas-not-available.svg';
import { TypographyH2, TypographyH4, TypographyMuted } from '@/components';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { capitalizeFirstCharacter } from '@/lib';
import { useCinemasQuery, useLocationsQuery } from '@/services';

/**
 * Cinemas Component
 *
 * Displays a list of cinemas available in the system and allows the user
 * to filter them based on location.
 *
 * Features:
 * - Fetches and displays available locations in a dropdown selector
 * - Fetches cinemas filtered by the selected location
 * - Updates the selected location in the URL search parameters
 * - Dynamically re-fetches cinema data when location changes
 *
 * This component acts as both:
 * - A location filter control
 * - A cinema listing view
 *
 */
export const Cinemas = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const { data: cinemas, isLoading: isCinemasLoading } = useCinemasQuery({
        location: searchParams.get('location') ?? undefined,
    });
    const { data: locations } = useLocationsQuery();

    return (
        <div className="my-6">
            <Label className="mb-2 text-primary">
                <LocationEdit size={18} />
                Location
            </Label>
            <Select
                onValueChange={(value) => {
                    searchParams.delete('location');
                    if (value !== '-1') {
                        searchParams.append('location', value);
                    }
                    setSearchParams(searchParams);
                }}
            >
                <SelectTrigger className="w-50 cursor-pointer">
                    <SelectValue placeholder="Select Your Location" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel> Select Your Locations</SelectLabel>
                        <SelectItem className="cursor-pointer" value="-1">
                            Select All
                        </SelectItem>
                        {locations?.map((location) => (
                            <SelectItem
                                key={location.id}
                                value={location.location}
                                className="cursor-pointer"
                            >
                                {location.location}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <div className="flex flex-wrap justify-center gap-8 mt-2">
                {!isCinemasLoading &&
                    !!cinemas?.length &&
                    cinemas?.map((cinema) => (
                        <Link
                            to={`/cinema/${cinema.id}?date=${format(new Date(), 'yyyy-MM-dd')}`}
                            key={cinema.id}
                        >
                            <div className="border rounded-xl p-6 w-70 h-40 flex flex-col  gap-5">
                                <TypographyH4>{cinema.name}</TypographyH4>
                                <TypographyMuted>
                                    {capitalizeFirstCharacter(
                                        cinema.location.location,
                                    )}
                                </TypographyMuted>
                            </div>
                        </Link>
                    ))}

                {isCinemasLoading &&
                    Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="h-40 w-70 rounded-xl"
                        />
                    ))}

                {!isCinemasLoading && !cinemas?.length && (
                    <div className="flex flex-col justify-center items-center">
                        <div>
                            <img
                                src={CinemasNotAvailable}
                                alt="Cinemas Not Available Fallback"
                            />
                        </div>
                        <TypographyH2 className="text-center">
                            There is no Cinemas Available
                        </TypographyH2>
                    </div>
                )}
            </div>
        </div>
    );
};
