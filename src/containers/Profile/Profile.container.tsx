import { useState } from 'react';

import { Edit, User } from 'lucide-react';

import UserNotFound from '@/assets/images/user-not-found.svg';
import { ErrorBoundary, TypographyH1, TypographyP } from '@/components';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserDetailsQuery } from '@/services';
import { useAppSelector } from '@/store';

import { PastBookings } from './PastBookings.container';
import { ProfileUpdateForm } from './ProfileUpdateForm.container';
import { Tickets } from './Tickets.container';
import { ErrorFallback } from '../ErrorFallback';

/**
 * - This is the container which contains
 *   - users Profile Details
 *   - User Can Update His Details
 *   - Can See His Tickets
 *   - Can Cancel the ticket
 *   - Can see his Past bookings details
 */
export const Profile = () => {
    const token = useAppSelector((state) => state.authReducer.token);
    const { data: user, isLoading: isUserDetailsLoading } = useUserDetailsQuery(
        undefined,
        { skip: !token },
    );
    const [isProfileUpdateModalOpen, setIsProfileUpdateModalOpen] =
        useState<boolean>(false);

    return (
        <>
            {user && (
                <div className="my-6">
                    {/* Profile Details */}
                    <Card className="p-5 max-w-200 mx-auto">
                        {!isUserDetailsLoading && user && (
                            <>
                                <Avatar className="size-40 mx-auto">
                                    <AvatarImage src={user.profile_pic || ''} />
                                    <AvatarFallback>
                                        <User className="size-30" />
                                    </AvatarFallback>
                                </Avatar>
                                <TypographyP>Name : {user.name}</TypographyP>
                                <TypographyP>Email : {user.email}</TypographyP>
                                <TypographyP>
                                    Phone Number :{' '}
                                    {user.phone_number || 'Not Available'}
                                </TypographyP>
                                <Button
                                    className="self-center"
                                    onClick={() =>
                                        setIsProfileUpdateModalOpen(true)
                                    }
                                >
                                    <Edit />
                                    Update Your Profile
                                </Button>
                            </>
                        )}
                        {isUserDetailsLoading && (
                            <Skeleton className="h-105 w-full" />
                        )}
                        {!isUserDetailsLoading && !user && (
                            <div className="flex flex-col items-center">
                                <img src={UserNotFound} alt="" aria-hidden />
                                <TypographyH1 className="">
                                    User Not Found
                                </TypographyH1>
                            </div>
                        )}
                    </Card>

                    {/* Profile Modal */}
                    <Dialog
                        open={isProfileUpdateModalOpen}
                        onOpenChange={(val) => setIsProfileUpdateModalOpen(val)}
                    >
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Update Profile</DialogTitle>
                                <DialogDescription>
                                    To update Your Account Details Fill the form
                                    and click on Update button.
                                </DialogDescription>
                            </DialogHeader>
                            <ProfileUpdateForm
                                onSuccess={() =>
                                    setIsProfileUpdateModalOpen(false)
                                }
                            />
                        </DialogContent>
                    </Dialog>

                    {/* User tickets and Past bookings Tabs*/}
                    <Tabs defaultValue="tickets" className="mt-10">
                        <TabsList>
                            <TabsTrigger
                                value="tickets"
                                className="cursor-pointer"
                            >
                                Tickets
                            </TabsTrigger>
                            <TabsTrigger
                                value="past-bookings"
                                className="cursor-pointer"
                            >
                                Past Bookings
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="tickets">
                            <ErrorBoundary fallback={<ErrorFallback />}>
                                <Tickets />
                            </ErrorBoundary>
                        </TabsContent>
                        <TabsContent value="past-bookings">
                            <ErrorBoundary fallback={<ErrorFallback />}>
                                <PastBookings />
                            </ErrorBoundary>
                        </TabsContent>
                    </Tabs>
                </div>
            )}
        </>
    );
};
