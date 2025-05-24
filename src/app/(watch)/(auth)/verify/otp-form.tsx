'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm, FormState as ReactHookFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
    Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
    InputOTP, InputOTPGroup, InputOTPSlot,
} from '@/components/ui/input-otp';
import { Input } from '@/components/ui/input';
import { verify } from './action';
import { VerifyResponse } from './form-state';


const FormSchema = z.object({
    code: z.string().length(4, {
        message: 'Your one-time password must be 4 characters.',
    }),
    email: z.string().email('Invalid email format.'),
});

type FormValues = z.infer<typeof FormSchema>;

export function OtpForm({ email }: { email: string }) {

    console.log("Rendering OtpForm client component with email:", email);

    const [generalMessage, setGeneralMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            code: '',
            email: email,
        },
    });

    async function onSubmit(values: FormValues) {
        setGeneralMessage('');
        form.clearErrors();
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('email', values.email);
            formData.append('code', values.code);

            const result: VerifyResponse = await verify(undefined, formData);

            if (result?.errors) {
                if (result.errors.code) {
                    form.setError('code', {
                        type: 'server',
                        message: result.errors.code.join(', '),
                    });
                }
                if (result.errors.email) {
                    form.setError('email', {
                        type: 'server',
                        message: result.errors.email.join(', '),
                    });
                }

                if (result.message && result.message !== 'Invalid input provided.') {
                    setGeneralMessage(result.message);
                }


            } else if (result?.message) {
                setGeneralMessage(result.message);

                if (result.message === "Verification successful!") {
                }
            } else {
                setGeneralMessage('An unexpected response was received from the server.');
            }


        } catch (error) {
            console.error('Error calling server action:', error);
            setGeneralMessage('An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    }

    const messageColorClass = generalMessage.includes('successful') ? 'text-green-600' : (generalMessage ? 'text-red-600' : 'text-gray-700');

    if (!email) {
        return <div className="text-center mt-20 text-red-600">Email is not provided to the form.</div>;
    }

    return (
        <div className="max-w-md mx-auto mt-20 p-6 shadow rounded-xl border bg-white">
            <h1 className="text-2xl font-semibold mb-4">Verify your email</h1>
            <p className="mb-4 text-gray-600">
                We’ve sent a code to <strong>{email}</strong>. Enter it below to verify your account.
            </p>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="hidden">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="hidden" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>One-Time Password</FormLabel>
                                <FormControl>
                                    <InputOTP maxLength={4} {...field}
                                        onChange={(value) => field.onChange(value)}
                                        onBlur={field.onBlur}
                                        value={field.value}
                                        disabled={isSubmitting}
                                    >
                                        <InputOTPGroup>
                                            {[...Array(4)].map((_, index) => (
                                                <InputOTPSlot key={index} index={index} />
                                            ))}
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                                <FormDescription>
                                    Please enter the one-time password sent to your email.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Verifying...' : 'Submit'}
                    </Button>
                </form>
            </Form>

            {generalMessage && (
                <p className={`mt-4 text-sm text-center ${messageColorClass}`}>
                    {generalMessage}
                </p>
            )}
        </div>
    );
}