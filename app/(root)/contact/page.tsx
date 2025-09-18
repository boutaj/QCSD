import type { Metadata } from "next";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact | QCSD",
  description: "Get in touch with UC San Diego's Quantum Computing Club. Questions, partnerships, speakers, and general inquiries.",
};

const ContactPage = () => {
  return (
    <main className="pb-20">
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-10">
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>

            <form className="space-y-5" action="/api/contact" method="POST">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" placeholder="Your full name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="you@ucsd.edu" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" placeholder="What's this about?" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" placeholder="How can we help?" className="min-h-[140px]" required />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button type="submit">Send Message</Button>
                  <span className="text-xs text-muted-foreground">
                    We'll reply via email.
                  </span>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Office Hours &amp; Location</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>
                <span className="font-medium text-foreground">Weekly: </span>
                Check our Events page for the latest time/place each quarter.
              </p>
              <p>
                <span className="font-medium text-foreground">Campus: </span>
                UC San Diego, La Jolla, CA
              </p>
              <Separator />
              <div className="space-y-2">
                <p className="text-foreground font-medium">Social</p>
                <div className="flex flex-wrap gap-2">
                  <Link href="https://discord.gg/your-invite" className="underline underline-offset-4 hover:no-underline">
                    Discord
                  </Link>
                  <Separator orientation="vertical" />
                  <Link href="https://instagram.com/your-handle" className="underline underline-offset-4 hover:no-underline">
                    Instagram
                  </Link>
                  <Separator orientation="vertical" />
                  <Link href="https://linkedin.com/company/your-page" className="underline underline-offset-4 hover:no-underline">
                    LinkedIn
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
