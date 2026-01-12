import { Loader2 } from 'lucide-react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import type { z } from 'zod';

import signupImage from '@/assets/images/signup.webp';
import { TypographyH2, TypographyLead } from '@/components';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ROUTES } from '@/constants';
import { login, setUser } from '@/features';
import { signupSchema } from '@/schemas';
import { useRegisterUserMutation } from '@/services';
import { zodResolver } from '@hookform/resolvers/zod';

export const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [registerUser, result] = useRegisterUserMutation({
        fixedCacheKey: undefined,
    });
    const { isLoading } = result;
    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: '',
            email: '',
            phone_number: undefined,
            profile_pic: undefined,
            password: '',
            confirm_password: '',
        },
    });

    const onSubmit: SubmitHandler<z.infer<typeof signupSchema>> = async (
        values,
    ) => {
        try {
            const response = await registerUser(values).unwrap();
            const { access, ...user } = response;
            dispatch(login(access));
            dispatch(setUser(user));
            await navigate('/');
        } catch (e) {
            const error = e as Record<'data', Record<string, string>>;
            toast.error(Object.values(error.data).flat().join('\n'));
        }
    };

    return (
        <div className="max-w-240 mx-auto my-10 px-4 md:px-10">
            <TypographyH2 className="text-center">
                Your Seat Awaits - SignUp Now{' '}
            </TypographyH2>
            <TypographyLead className="text-center">
                Because every great movie deserves a great seat. Your seat is
                just one click away.
            </TypographyLead>

            <div className="flex mt-10 gap-4">
                <div className="h-144 w-full hidden md:block">
                    <img
                        src={signupImage}
                        alt=""
                        className="w-full h-full object-fit rounded-4xl"
                    />
                </div>
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
                                            type="number"
                                            placeholder="Type Your Phone Number"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            {...field}
                                            placeholder="Please type Your Password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirm_password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            {...field}
                                            placeholder="Please type Your Password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Signing Up
                                </>
                            ) : (
                                'SignUp'
                            )}
                        </Button>
                        Already have an Account ?{' '}
                        <Link to={ROUTES.LOGIN}>Click Here.</Link>
                    </form>
                </Form>
            </div>
        </div>
    );
};
