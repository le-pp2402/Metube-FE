'use server';

import { z } from 'zod';
import { VerifyEmailSchema } from './validation';
import { VerifyResponse } from './form-state';

const BACKEND_API_URL = process.env.API;

if (!BACKEND_API_URL) {
    console.error("BACKEND_API_URL is not set in environment variables!");
}

export async function verify(prevState: VerifyResponse | undefined, formData: FormData) : Promise<VerifyResponse> {

  if (!BACKEND_API_URL) {
       return { message: "Server configuration error: Backend URL not set." };
  }

  const validatedFields = VerifyEmailSchema.safeParse({
    email: formData.get('email'),
    code: formData.get('code')
  });

  if (!validatedFields.success) {
    console.error('Server Action Validation Failed:', validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors as VerifyResponse['errors'],
      message: 'Invalid input provided.'
    };
  }

  console.log("Validated verification data (Server Action):", validatedFields.data);

  try {
      const res = await fetch(`${BACKEND_API_URL}/verify`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(validatedFields.data),
      });

      console.log("Backend verify API response status:", res.status);

      if (!res.ok) {
          return {
              message: `Verification failed (Status: ${res.status}).`,
          };
      }

      console.log("Verification successful via backend API.");
      return {
          message: "Verification successful!",
      };

  } catch (err) {
      console.error('Error during backend verify fetch:', err);
      return {
          message: 'An unexpected error occurred during verification.',
      };
  }
}