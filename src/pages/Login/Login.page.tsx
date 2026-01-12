import { Loader2 } from 'lucide-react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import type z from 'zod';

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

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginUser, result] = useLoginUserMutation();
    const { isLoading } = result;
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<z.infer<typeof loginSchema>> = async (
        values,
    ) => {
        try {
            const response = await loginUser(values).unwrap();
            const { access } = response;
            dispatch(login(access));
            await navigate('/');
        } catch (e) {
            const error = e as Record<'data', Record<string, string>>;
            toast.error(Object.values(error.data).flat().join('\n'));
        }
    };

    return (
        <div className="max-w-240 mx-auto my-10 md:my-30 px-4 md:px-10">
            <TypographyH2 className="text-center">
                Unlock the Big Screen Experience
            </TypographyH2>
            <TypographyLead className="text-center">
                Sign in to book your favorite movies in seconds.Your next movie
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
                        <Link to={ROUTES.SIGNUP}>Click Here.</Link>
                    </form>
                </Form>
            </div>
        </div>
    );
};
