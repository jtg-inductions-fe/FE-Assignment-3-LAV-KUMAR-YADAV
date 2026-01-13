import { useEffect } from 'react';

import { Trash2, User } from 'lucide-react';
import { Link } from 'react-router';
import { toast } from 'sonner';

import Logo from '@/assets/images/logo.svg';
import { ModeToggle, TypographyH2 } from '@/components';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
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
import { login, logout, setUser } from '@/features';
import {
    useLogoutMutation,
    useRefreshTokenMutation,
    useUserDetailsQuery,
} from '@/services';
import { useAppDispatch, useAppSelector } from '@/store';

export const Header = () => {
    const { token, user, isAuthenticated } = useAppSelector(
        (state) => state.authReducer,
    );
    const dispatch = useAppDispatch();
    const [refreshTokenMutate] = useRefreshTokenMutation();
    const [logoutUser] = useLogoutMutation();
    const { data: userData } = useUserDetailsQuery(token, {
        skip: !!user || !token,
    });

    const refreshToken = async () => {
        const response = await refreshTokenMutate().unwrap();
        const { access } = response;
        dispatch(login(access));
    };

    useEffect(() => {
        if (!token) {
            void refreshToken();
        }
    }, [token]);

    useEffect(() => {
        if (userData && !user) {
            dispatch(setUser(userData));
        }
    }, [userData]);

    const handleLogout = async () => {
        try {
            await logoutUser();
            dispatch(logout());
        } catch (error) {
            toast.error(JSON.stringify(error));
        }
    };

    return (
        <div>
            <NavigationMenu className="max-w-full flex justify-between p-2">
                <Link to="/" className="flex justify-center items-center">
                    <div className="h-10 w-10 mr-2">
                        <img
                            src={Logo}
                            alt="bookmyshow logo"
                            className="h-full w-full object-contain"
                        />
                    </div>
                    <TypographyH2 className="hidden sm:block">
                        BookMyShow
                    </TypographyH2>
                </Link>
                <NavigationMenuList aria-label="navigation links">
                    <li>
                        <ModeToggle />
                    </li>
                    <NavigationMenuLink asChild>
                        <li>
                            <Link to={ROUTES.MOVIES}>Movies</Link>
                        </li>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                        <li>
                            <Link to={ROUTES.CINEMAS}>Cinemas</Link>
                        </li>
                    </NavigationMenuLink>
                    {!isAuthenticated && (
                        <NavigationMenuLink asChild>
                            <li>
                                <Link to={ROUTES.LOGIN}>Login</Link>
                            </li>
                        </NavigationMenuLink>
                    )}
                    {isAuthenticated && (
                        <DropdownMenu>
                            <li>
                                <DropdownMenuTrigger className="cursor-pointer">
                                    <Avatar>
                                        <AvatarImage
                                            src={user?.profile_pic || ''}
                                        />
                                        <AvatarFallback>
                                            <User />
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
                                        to={ROUTES.PROFILE}
                                        className="flex gap-2 cursor-pointer"
                                    >
                                        <User /> Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator aria-hidden />
                                <DropdownMenuItem
                                    className="flex gap-2 text-destructive cursor-pointer"
                                    asChild
                                >
                                    <Button
                                        variant="ghost"
                                        onClick={() => void handleLogout()}
                                    >
                                        <Trash2 /> Logout
                                    </Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </NavigationMenuList>
            </NavigationMenu>
            <div className="h-0.5 w-full bg-accent"></div>
        </div>
    );
};
