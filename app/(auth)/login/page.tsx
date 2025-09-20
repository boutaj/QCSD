import type { Metadata } from "next";
import LoginForm from "@/components/auth/login-form"
import Link from "next/link";
import * as z from "zod"; 
import { prisma } from "@/lib/db";
import bcryptjs from 'bcryptjs';
import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
import { AuthActionState } from "@/components/interface";

export const metadata: Metadata = {
  title: "Login | QCSD",
  description: "Sign in to your account",
};

const loginValidation = z.object({
  email:    z.email("Enter a valid email address (e.g., you@ucsd.edu)"),
  password: z.string().nonempty("You forgot to enter your password"),
});

const loginHandler = async (initialState: any, FormData: FormData): Promise<AuthActionState> => {
  'use server';

  const data = {
      email:    (FormData.get('email')    as string) ?? "",
      password: (FormData.get('password') as string) ?? "",
  };
  
  // Data validation
  const parsedData = loginValidation.safeParse(data);
  if(!parsedData.success) {
    return {
      messages: parsedData.error.issues.map((i) => i.message),
      data,
    };
  }

  // Verify hCaptcha
  const captcha = await fetch("https://api.hcaptcha.com/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: process.env.CAPTCHA_SECRET!,
      response: FormData.get("h-captcha-response") as string,
    }),
    cache: "no-store",
  });
  
  const cRespone = await captcha.json();
  if(!cRespone.success)
  {
    return {messages: ["Captcha verification failed. Please try again."], data};
  }

  // Find the account in the db
  const account = await prisma.user.findUnique({
      where: {email: parsedData.data.email}
  });

  // Check password hash
  const hash = account?.password ?? "";
  const checkHash = await bcryptjs.compare(parsedData.data.password, hash);

  if(checkHash) {
    // Sign in automaticly
    return await signIn("credentials", {
        userId: String(account?.id),
        username: account?.username,
        email: account?.email,
        role: account?.role,
        redirectTo: "/dashboard",
    });
  }

  return {messages: ["Your email or password is wrong!"], data};
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
