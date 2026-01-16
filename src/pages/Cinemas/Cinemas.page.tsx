import { LocationEdit } from 'lucide-react';
import { useSearchParams } from 'react-router';

import { TypographyH4, TypographyMuted } from '@/components';
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

    const { data: cinemas } = useCinemasQuery({
        location: searchParams.get('location') ?? undefined,
    });
    const { data: locations } = useLocationsQuery();

    return (
        <div className="mt-6">
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
            <div className="flex flex-wrap justify-center gap-6 mt-2">
                {cinemas?.map((cinema) => (
                    <div
                        key={cinema.id}
                        className="border rounded-xl p-2 min-w-50"
                    >
                        <TypographyH4>{cinema.name}</TypographyH4>
                        <TypographyMuted>
                            {cinema.location.location}
                        </TypographyMuted>
                    </div>
                ))}
            </div>
        </div>
    );
};
