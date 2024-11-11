'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/db';

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  try {
    // Check the user's input validation
    console.log('formData', formData);
    const title = formData.get('title');
    const code = formData.get('code');

    if (typeof title !== 'string' || title.length < 3) {
      return {
        message: 'Title must be longer',
      };
    }

    if (typeof code !== 'string' || code.length < 10) {
      return {
        message: 'Code must be longer',
      };
    }

    // Create a new record in the db
    const snippet = await db.snipet.create({
      data: {
        title,
        code,
      },
    });
    console.log('snippet', snippet);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    }

    return {
      message: 'Something went wrong...',
    };
  }

  revalidatePath('/');
  // Redirect to the root route
  redirect('/');
}

export async function editSnippet(id: number, code: string) {
  await db.snipet.update({
    where: { id },
    data: { code },
  });

  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snipet.delete({
    where: { id },
  });

  revalidatePath('/');
  redirect('/');
}
