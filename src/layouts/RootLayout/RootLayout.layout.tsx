import { Outlet } from 'react-router';

import { Header } from '@/containers';
import { Footer } from '@/containers/Footer';
/**
 * This is a layout component for whole application
 * @returns A Layout for whole application
 */
export const RootLayout = () => (
    <div>
        <Header />
        <main>
            <Outlet />
        </main>
        <Footer />
    </div>
);
