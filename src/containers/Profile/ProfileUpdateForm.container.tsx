import { Edit, Loader2 } from 'lucide-react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type z from 'zod';

import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { updateProfileSchema } from '@/schemas';
import { useUpdateUserDetailsMutation, useUserDetailsQuery } from '@/services';
import { useAppSelector } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';

/**
 * - This is Form which will be render in a Dialogue
 * - From here User Can update his Details
 * - User's Previous Details are already filled in the form
 * - He just needs to change his details and click on update form
 */
export const ProfileUpdateForm = () => {
    const token = useAppSelector((state) => state.authReducer.token);
    const { data: user } = useUserDetailsQuery(token);
    const [updateProfile, { isLoading }] = useUpdateUserDetailsMutation();
    const form = useForm<z.infer<typeof updateProfileSchema>>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            email: user?.email,
            name: user?.name,
            phone_number: user?.phone_number || '',
            profile_pic: undefined,
        },
        mode: 'onBlur',
    });

    const onSubmit: SubmitHandler<z.infer<typeof updateProfileSchema>> = async (
        values,
    ) => {
        try {
            await updateProfile({ token, data: values }).unwrap();
            toast.success('Profile Details Updated Successfully', {
                style: {
                    color: 'green',
                },
            });
        } catch {
            toast.error('Failed to update profile', {
                style: {
                    color: 'var(--primary)',
                },
            });
        }
    };

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={(...args) =>
                        void form.handleSubmit(onSubmit)(...args)
                    }
                    className="space-y-8 w-full"
                >
                    <FormField
                        control={form.control}
                        name="profile_pic"
                        render={({
                            field: { name, onBlur, onChange, ref },
                        }) => (
                            <FormItem>
                                <FormLabel>Profile Picture</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        ref={ref}
                                        name={name}
                                        onBlur={onBlur}
                                        onChange={(e) =>
                                            onChange(e.target.files?.[0])
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Type Your Name"
                                        type="text"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Type Your Email"
                                        type="email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone_number"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Type Your Phone Number"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DialogClose asChild>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Updating Profile
                                </>
                            ) : (
                                <>
                                    <Edit className="h-4 w-4" />
                                    Update Profile
                                </>
                            )}
                        </Button>
                    </DialogClose>
                </form>
            </Form>
        </>
    );
};
