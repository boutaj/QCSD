'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useActionState } from "react";
import { ShieldX } from "lucide-react";

const LoginForm = ({serverHandler}: {serverHandler: any}) => {

  const initialState = {messages : [], data: {
    name: '',
    email: '',
    password: '',
  }};

  const [state, formAction, pending] = useActionState(serverHandler, initialState);

  return (
    <Card className="shadow-sm">
      <CardHeader className="space-y-1">
        {state.messages?.length > 0 && (
          <Alert variant="destructive" className="bg-accent text-accent-foreground">
            <ShieldX />
            <AlertTitle>Oops!</AlertTitle>
            <AlertDescription className="!text-accent-foreground">
              {state.messages.map(error => <p key={error}>• {error}</p>)}
            </AlertDescription>
          </Alert>
        )}
        <CardTitle className="text-xl">Sign in</CardTitle>
        <CardDescription>Use your email and password</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" action={formAction}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="text" placeholder="you@example.com" autoComplete="email" defaultValue={state.data?.email} />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              defaultValue={state.data?.password}
            />
          </div>
          <Button type="submit" className="w-full cursor-pointer" disabled={pending}>
            Sign in
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default LoginForm;