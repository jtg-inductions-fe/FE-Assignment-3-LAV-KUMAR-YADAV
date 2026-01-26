import { Trash2, User } from 'lucide-react';
import { Link } from 'react-router';
import { toast } from 'sonner';

import { ModeToggle, TypographyH1 } from '@/components';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    NavigationMenu,
    NavigationMenuLink,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { ROUTES } from '@/constants';
import { logout } from '@/features';
import { useLogoutMutation, useUserDetailsQuery } from '@/services';
import { useAppDispatch, useAppSelector } from '@/store';

/**
 * Header component
 *
 * Renders the application’s primary navigation bar.
 *
 * @example
 * ```tsx
 * <Header />
 * ```
 */

export const Header = () => {
    const { token } = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch();
    const [logoutUser] = useLogoutMutation();
    const { data: user } = useUserDetailsQuery(undefined, {
        skip: !token,
    });

    const handleLogout = async () => {
        try {
            await logoutUser();
            dispatch(logout());
            toast.success('You are Logged out Successfully', {
                style: {
                    color: 'green',
                },
            });
        } catch {
            toast.error('Failed to logout. Please try again', {
                style: {
                    color: 'red',
                },
            });
        }
    };

    return (
        <header className="bg-card">
            <NavigationMenu
                className="max-w-full flex justify-between p-2"
                aria-label="Primary navigation"
            >
                <TypographyH1>
                    <Link
                        to="/"
                        className="flex items-center"
                        aria-label="BookMyShow home"
                    >
                        <img
                            src="/logo.svg"
                            alt=""
                            className="size-10 mr-2 object-contain"
                        />
                        <span className="hidden sm:block text-primary">
                            BookMyShow
                        </span>
                    </Link>
                </TypographyH1>
                <NavigationMenuList aria-label="navigation links">
                    <li>
                        <ModeToggle />
                    </li>
                    <NavigationMenuLink asChild>
                        <li>
                            <Link
                                to={ROUTES.MOVIES}
                                className="text-lg font-semibold"
                            >
                                Movies
                            </Link>
                        </li>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                        <li>
                            <Link
                                to={ROUTES.CINEMAS}
                                className="text-lg font-semibold"
                            >
                                Cinemas
                            </Link>
                        </li>
                    </NavigationMenuLink>
                    {!token && (
                        <NavigationMenuLink asChild>
                            <li>
                                <Link
                                    to={ROUTES.PUBLIC.LOGIN}
                                    className="text-lg font-semibold"
                                >
                                    Login
                                </Link>
                            </li>
                        </NavigationMenuLink>
                    )}
                    {token && (
                        <DropdownMenu>
                            <li>
                                <DropdownMenuTrigger className="cursor-pointer">
                                    <Avatar aria-label="Open user menu">
                                        <AvatarImage
                                            src={user?.profile_pic || ''}
                                            alt={
                                                user?.name
                                                    ? `Profile picture of ${user.name}`
                                                    : 'User profile picture'
                                            }
                                        />
                                        <AvatarFallback>
                                            <User aria-hidden />
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                            </li>
                            <DropdownMenuContent
                                className="border p-5 rounded-xl w-56 "
                                align="start"
                            >
                                <DropdownMenuItem asChild>
                                    <Link
                                        to={ROUTES.PROTECTED.PROFILE}
                                        className="flex gap-2 cursor-pointer"
                                    >
                                        <User aria-hidden /> Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator aria-hidden />
                                <DropdownMenuItem
                                    className="flex gap-2 text-destructive cursor-pointer"
                                    asChild
                                >
                                    <button
                                        onClick={() => void handleLogout()}
                                        className="w-full"
                                    >
                                        <Trash2 aria-hidden /> Logout
                                    </button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </NavigationMenuList>
            </NavigationMenu>
            <div className="h-0.5 w-full bg-accent"></div>
        </header>
    );
};
