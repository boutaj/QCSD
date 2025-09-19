import type { Metadata } from "next";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import * as z from "zod"; 
import ContactForm from "@/components/contact-form";
import { prisma } from "@/lib/db";
import { ContactActionState } from "@/components/interface";

export const metadata: Metadata = {
  title: "Contact | QCSD",
  description: "Get in touch with UC San Diego's Quantum Computing Club. Questions, partnerships, speakers, and general inquiries.",
};

const contactValidation = z.object({
  name:     z.string().min(1, "Don't forget to enter your name"),
  email:    z.email("Enter a valid email address (e.g., you@ucsd.edu)"),
  subject:  z.string().min(1, "You forgot to enter the subject"),
  message:  z.string().min(1, "You forgot to enter your message"),
});

const contactHandler = async (initialState: ContactActionState, formData: FormData): Promise<ContactActionState> => {
  "use server";

  const raw = {
    name:    (formData.get("name") as string) ?? "",
    email:   (formData.get("email") as string) ?? "",
    subject: (formData.get("subject") as string) ?? "",
    message: (formData.get("message") as string) ?? "",
  };

  const parsed = contactValidation.safeParse(raw);

  if (!parsed.success) {
    return {
      messages: parsed.error.issues.map((i) => i.message),
      data: raw,
      success: false,
    };
  }

  await prisma.contact.create({ data: parsed.data });

  return {
    messages: [],
    data: null,
    success: true,
  };
};


const ContactPage = () => {
  return (
    <main className="pb-20">
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-10">
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <ContactForm serverHandler={contactHandler} />
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
