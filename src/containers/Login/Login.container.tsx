import { Loader2 } from 'lucide-react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import type { z } from 'zod';

import loginImage from '@/assets/images/login.webp';
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
import { login } from '@/features';
import { loginSchema } from '@/schemas';
import { useLoginUserMutation } from '@/services';
import { zodResolver } from '@hookform/resolvers/zod';

/**
 * - This is a Login Form Container
 * - Users can login via their email Id and password
 */
export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /**
     * RTK Query mutation for logging in the user.
     */
    const [loginUser, result] = useLoginUserMutation();

    /**
     * Indicates whether login request is in progress.
     */
    const { isLoading } = result;

    /**
     * React Hook Form instance with Zod validation.
     */
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    /**
     * Handles form submission.
     * Sends login request, stores authentication token,
     * shows error toast on failure, and redirects on success.
     */
    const onSubmit: SubmitHandler<z.infer<typeof loginSchema>> = async (
        values,
    ) => {
        try {
            const response = await loginUser(values).unwrap();
            const { access } = response;
            dispatch(login(access));
            await navigate('/');
        } catch {
            toast.error('Failed to Login. Please try again.', {
                style: {
                    color: 'red',
                },
            });
        }
    };

    return (
        <div className="max-w-240 mx-auto my-10 md:my-30 px-4 md:px-10">
            <TypographyH2 className="text-center">
                Unlock the Big Screen Experience
            </TypographyH2>
            <TypographyLead className="text-center">
                Sign in to book your favorite movies in seconds. Your next movie
                night starts here.
            </TypographyLead>

            <div className="flex mt-10 gap-4 items-center">
                <div className="h-72 w-full hidden md:block">
                    <img
                        src={loginImage}
                        alt=""
                        className="w-full h-full object-cover rounded-4xl"
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
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Email
                                        <span className="text-primary">*</span>
                                    </FormLabel>
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
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Password
                                        <span className="text-primary">*</span>
                                    </FormLabel>
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
                                    Logging In
                                </>
                            ) : (
                                'Login'
                            )}
                        </Button>
                        Don&apos;t have an Account ?{' '}
                        <Link to={ROUTES.SIGNUP} className="underline">
                            Click Here.
                        </Link>
                    </form>
                </Form>
            </div>
        </div>
    );
};
