import { Filter } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import { Filters } from './Filters.container';
import { MoviesCards } from './MovieCards.container';

/**
 * Movies container
 *
 * Displays a list of movies with filter controls.
 *
 * @example
 * ```tsx
 * <Movies />
 * ```
 */

export const Movies = () => (
    <div className="h-180 overflow-y-auto [&::-webkit-scrollbar]:hidden flex flex-col md:flex-row gap-6 my-5">
        <div className="min-w-80 hidden md:block"></div>
        <aside
            className="hidden absolute h-180 md:block min-h-[70vh] w-80"
            aria-label="Movie filters"
        >
            <Filters />
        </aside>

        <div className="md:hidden md:min-h-[70vh]">
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        className="fixed bottom-30 left-20"
                        aria-label="Open movie filters"
                    >
                        <Filter aria-hidden />
                    </Button>
                </DialogTrigger>
                <DialogContent
                    className="bg-accent md:hidden h-[60%] overflow-y-auto"
                    aria-description="filter"
                >
                    <DialogHeader>
                        <DialogTitle>Filters</DialogTitle>
                        <DialogDescription>
                            Apply filters to customize the results
                        </DialogDescription>
                    </DialogHeader>

                    <Filters inModal />
                </DialogContent>
            </Dialog>
        </div>
        <MoviesCards />
    </div>
);
