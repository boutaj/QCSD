"use client";

import { useActionState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MailCheck, ShieldX } from "lucide-react";

const ContactForm = ({ serverHandler }: { serverHandler: any }) => {

  const initialState = {
    messages: [],
    data: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    success: null,
  };

  const [state, formAction, pending] = useActionState(serverHandler, initialState);

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        {state.success && (
          <Alert variant="default" className="bg-accent text-accent-foreground">
            <MailCheck />
            <AlertTitle>Sent!</AlertTitle>
            <AlertDescription className="!text-accent-foreground">
              Thank for contacting us, we got your message. We'll reply via email.
            </AlertDescription>
          </Alert>
        )}
        {state.messages?.length > 0 && (
          <Alert variant="destructive" className="bg-accent text-accent-foreground">
            <ShieldX />
            <AlertTitle>Oops!</AlertTitle>
            <AlertDescription className="!text-accent-foreground">
                {state.messages.map(error => <p key={error}>• {error}</p>)}
            </AlertDescription>
          </Alert>
         )}
        <CardTitle>Contact Us</CardTitle>
      </CardHeader>

      <CardContent>
        <form className="space-y-5" action={formAction} method="POST">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Your full name" defaultValue={state.data?.name} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@ucsd.edu"
                defaultValue={state.data?.email}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" name="subject" placeholder="What's this about?" defaultValue={state.data?.subject} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="How can we help?"
              className="min-h-[140px]"
              defaultValue={state.data?.message}
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" disabled={pending}>
              Send Message
            </Button>
            <span className="text-xs text-muted-foreground">We&apos;ll reply via email.</span>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
