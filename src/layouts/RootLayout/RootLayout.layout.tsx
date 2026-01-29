import { Outlet } from 'react-router';

import { Header } from '@/containers';
import { Footer } from '@/containers/Footer';
/**
 * This is a layout component for whole application
 * @returns A Layout for whole application
 */
export const RootLayout = () => (
    <div className="mx-auto flex min-h-screen max-w-480 min-w-75 flex-col">
        <Header />
        <main className="flex-1 px-4 md:px-10">
            <Outlet />
        </main>
        <Footer />
    </div>
);
