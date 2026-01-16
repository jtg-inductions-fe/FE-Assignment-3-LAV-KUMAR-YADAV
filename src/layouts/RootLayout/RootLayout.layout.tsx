import { Outlet } from 'react-router';
/**
 * This is a layout component for whole application
 * @returns A Layout for whole application
 */
export const RootLayout = () => (
    <div>
        <main>
            <Outlet />
        </main>
    </div>
);
