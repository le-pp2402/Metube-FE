'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
    Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoginFormSchema } from './validation';
import { login } from './auth';
import { ActionState } from './form-state';


type FormValues = z.infer<typeof LoginFormSchema>;

export function LoginForm() {
    const [generalMessage, setGeneralMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    async function onSubmit(values: FormValues) {
        setGeneralMessage('');
        form.clearErrors();
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('username', values.username);
            formData.append('password', values.password);

            const result: ActionState = await login({}, formData);

            if (result?.errors) {
                if (result.errors.username) {
                    form.setError('username', {
                        type: 'server',
                        message: result.errors.username.join(', '),
                    });
                }
                if (result.errors.password) {
                    form.setError('password', {
                        type: 'server',
                        message: result.errors.password.join(', '),
                    });
                }
                if (result.message) {
                    setGeneralMessage(result.message);
                }

            } else if (result?.message) {
                setGeneralMessage(result.message);
            } else {
                setGeneralMessage('An unexpected response was received from the server.');
            }

        } catch (error) {
            console.error('Error calling login server action:', error);
            setGeneralMessage('An unexpected error occurred during login.');
        } finally {
            setIsSubmitting(false);
        }
    }

    const messageColorClass = generalMessage.includes('success') ? 'text-green-600' : (generalMessage ? 'text-red-600' : 'text-gray-700');

    return (
        <div className="max-w-sm mx-auto mt-20 p-6 shadow rounded-xl border bg-white">
            <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your username" {...field} disabled={isSubmitting} />
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
                                    <Input type="password" placeholder="Enter your password" {...field} disabled={isSubmitting} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Logging In...' : 'Login'}
                    </Button>

                    {generalMessage && (
                        <p className={`mt-4 text-sm text-center ${messageColorClass}`}>
                            {generalMessage}
                        </p>
                    )}

                </form>
            </Form>
        </div>
    );
}