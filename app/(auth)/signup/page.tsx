import type { Metadata } from "next";
import SignUpForm from "@/components/auth/signup-form";
import Link from "next/link";
import * as z from "zod"; 
import { auth, signIn } from "@/auth";
import { prisma } from "@/lib/db";
import bcryptjs from 'bcryptjs';
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Create account",
  description: "Sign up for a new account",
};

const signUpValidation = z.object({
  username: z.string().min(1, "Don't forget to enter your username"),
  email:    z.email("Enter a valid email address (e.g., you@ucsd.edu)"),
  password: z.string().min(6, "Your password is too short. Please use at least 6 characters"),
})

const signUpHandler = async (initialState: any, FormData: FormData) => {
  'use server';

  const messages: string[] = [];

  const data = {
      username: FormData.get('username'),
      email:    FormData.get('email'),
      password: FormData.get('password'),
  };

  try {
    
    // Data validation
    const parsedData = signUpValidation.parse(data);
    
    // Check if the user exist
    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          { email: parsedData.email },
          { username: parsedData.username },
        ],
      }
    });

    if (existing) {
      messages.push("This account already exist!");
      return {messages, parsedData};
    }

    // Hash password & create user in the database
    parsedData.password = await bcryptjs.hash(parsedData.password, 8);
    const create = await prisma.user.create({
      data: parsedData
    });

    // Sign in automaticly
    return await signIn("credentials", {
      userId: String(create?.id),
      username: create?.username,
      email: create?.email,
      role: create?.role,
      redirectTo: "/dashboard",
    });
    
  } catch (error) {
    
    if(error instanceof z.ZodError) {
  
      error.issues.map(error => {
        messages.push(error.message);
      })

    } else {
      throw error;
    }

  }
  
  return {messages, data};
};

const Signup = async () => {

  const session = await auth();

  if(session) redirect('/dashboard');

  return (
    <main className="min-h-dvh grid place-items-center bg-gradient-to-br from-background via-background to-muted px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
          <p className="text-sm text-muted-foreground">Join us in a minute</p>
        </div>
        <SignUpForm serverHandler={signUpHandler}/>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?
          <Link href="/login" className="ml-1 underline underline-offset-4 hover:text-foreground">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Signup;