import { Outlet } from 'react-router';

import { Header } from '@/containers';
import { Footer } from '@/containers/Footer';
/**
 * This is a layout component for whole application
 * @returns A Layout for whole application
 */
export const RootLayout = () => (
    <div className="min-w-75 max-w-480 mx-auto">
        <Header />
        <main className="min-h-150">
            <Outlet />
        </main>
        <Footer />
    </div>
);
