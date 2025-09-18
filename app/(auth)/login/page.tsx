import type { Metadata } from "next";
import LoginForm from "@/components/auth/login-form"
import Link from "next/link";
import * as z from "zod"; 
import { prisma } from "@/lib/db";
import bcryptjs from 'bcryptjs';
import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login | QCSD",
  description: "Sign in to your account",
};

const loginValidation = z.object({
  email:    z.email("Enter a valid email address (e.g., you@ucsd.edu)"),
  password: z.string().nonempty("You forgot to enter your password"),
});

const loginHandler = async (initialState: any, FormData: FormData) => {
  'use server';

  const messages: string[] = [];

  const data = {
      email:    FormData.get('email'),
      password: FormData.get('password'),
  };
  
  try {
    
    // Data validation
    const parsedData = loginValidation.parse(data);

    // Find the account in the db
    const account = await prisma.user.findUnique({
      where: {email: parsedData.email}
    });

    // Check password hash
    const hash = account?.password ?? "";
    if(await bcryptjs.compare(parsedData.password, hash)) {

      // Sign in automaticly
      return await signIn("credentials", {
          userId: String(account?.id),
          username: account?.username,
          email: account?.email,
          role: account?.role,
          redirectTo: "/dashboard",
      });

    } else {
      messages.push("Your email or password is wrong!");
    }

  } catch (error: any) {

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

const Login = async () => {

  const session = await auth();
  
  if(session) redirect('/dashboard');

  return (
    <main className="min-h-dvh grid place-items-center bg-gradient-to-br from-background via-background to-muted px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Please sign in to continue</p>
        </div>
        <LoginForm serverHandler={loginHandler} />
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?
          <Link href="/signup" className="ml-1 underline underline-offset-4 hover:text-foreground">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
