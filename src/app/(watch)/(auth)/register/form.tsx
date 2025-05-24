'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signup } from '@/features/auth/api/auth';
import { useFormState, useFormStatus } from 'react-dom';
import { ActionState } from '@/features/auth/utils/form-state';

const initialState: ActionState = {
    errors: undefined,
    message: null
};

export function SignupForm() {
    const [state, action] = useFormState<ActionState, FormData>(signup, initialState);

    return (
        <form action={action}>
            <div className="flex flex-col gap-2">
                <div>
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" name="username" placeholder="John Doe" />
                </div>
                {state?.errors?.username && (
                    <p className="text-sm text-red-500">{state.errors.username}</p>
                )}
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" placeholder="john@example.com" />
                </div>
                {state?.errors?.email && (
                    <p className="text-sm text-red-500">{state.errors.email}</p>
                )}
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" />
                </div>
                {state?.errors?.password && (
                    <div className="text-sm text-red-500">
                        <p>Password must:</p>
                        <ul>
                            {state.errors.password.map((error: string) => (
                                <li key={error}>- {error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {
                    state?.message && (
                        <div className="text-sm text-red-500">
                            {state.message}
                        </div>
                    )
                }
                <SignupButton />
            </div>
        </form>
    );
}

export function SignupButton() {
    const { pending } = useFormStatus();

    return (
        <Button aria-disabled={pending} type="submit" className="mt-2 w-full">
            {pending ? 'Submitting...' : 'Sign up'}
        </Button>
    );
}