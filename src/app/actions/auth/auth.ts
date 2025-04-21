'use server';

import { VerifyEmailSchema } from '@/app/(watch)/(auth)/verify/validation';
import {
  FormState,
  LoginFormSchema,
  SignupFormSchema,
} from '@/app/actions/auth/definitions';
import { createSession, deleteSession } from '@/app/actions/auth/session';
import { redirect } from 'next/navigation';
import { format } from 'path';
import { emit } from 'process';

const BACKEND_API_URL = process.env.API as string;

export async function signup (state: FormState, formData: FormData): Promise<FormState> {

  console.log(BACKEND_API_URL);

  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const res = await fetch(`${BACKEND_API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(validatedFields.data),
  });

  if (!res.ok) {
    const error = await res.json();
    console.log(error);
    return {
      message: error.message ?? 'Signup failed.',
    };
  } else {
    redirect(`/verify?email=${validatedFields.data.email}`);
  }
}

export async function login(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const res = await fetch(`${BACKEND_API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(validatedFields.data),
  });

  if (!res.ok) {
    const error = await res.json();
    return {
      message: error.message ?? 'Invalid login credentials.',
    };
  }

  const { userId } = await res.json();
  await createSession(userId.toString());

  return {};
}

export async function logout() {
  await deleteSession();
}
