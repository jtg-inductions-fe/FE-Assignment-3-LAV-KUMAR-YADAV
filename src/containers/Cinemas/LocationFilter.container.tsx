import { LocationEdit } from 'lucide-react';
import { useSearchParams } from 'react-router';

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
import { useLocationsQuery } from '@/services';

/**
 * LocationFilter component
 *
 * Provides a location-based filter for cinema and movie listings.
 *
 * @example
 * ```tsx
 * <LocationFilter />
 * ```
 */

export const LocationFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const { data: locations, isLoading: isLocationLoading } =
        useLocationsQuery();

    return (
        <>
            <Label className="text-primary mb-2" id="location-label">
                <LocationEdit size={18} aria-hidden />
                Location
            </Label>
            <Select
                value={searchParams.get('location') ?? '-1'}
                onValueChange={(value) => {
                    searchParams.delete('location');
                    if (value !== '-1') {
                        searchParams.append('location', value);
                    }
                    setSearchParams(searchParams);
                }}
                aria-labelledby="location-label"
            >
                <SelectTrigger className="w-50 cursor-pointer">
                    <SelectValue placeholder="Select Your Location" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Select Your Location</SelectLabel>
                        <SelectItem className="cursor-pointer" value="-1">
                            All Locations
                        </SelectItem>
                        {!isLocationLoading &&
                            locations &&
                            locations.map((location) => (
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
        </>
    );
};
