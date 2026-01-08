import { Outlet } from 'react-router';

import { Button } from '@/components/ui/button';

export const RootLayout = () => (
    <div>
        <h1 className="text-red-600">Tailwind works</h1>
        <Button>shadcn works</Button>
        <Outlet />
    </div>
);
