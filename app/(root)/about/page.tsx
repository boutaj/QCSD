import type { Metadata } from "next";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Leader } from "@/components/interface";

export const metadata: Metadata = {
  title: "About | QCSD",
  description:
    "Learn about UC San Diego's Quantum Computing Club, our mission, what we do, and meet the leadership team.",
};

const leadership: Leader[] = [
  { name: "Rebecca Breihan", role: "President"},
  { name: "Dan Van", role: "Vice President" },
  { name: "Anne Kelley", role: "Officer"},
  { name: "Kathleen Ngo", role: "Officer"},
];

const AboutPage = () => {
  return (
    <main className="pb-20">
      <section className="relative overflow-hidden">
        <div className="rounded pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600/10 via-sky-400/10 to-emerald-400/10" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          
          <Badge className="mb-4" variant="secondary">
            UC San Diego • Student Organization
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            UC San Diego&rsquo;s Quantum Computing Club
          </h1>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-muted-foreground">
            We're a student-run community advancing quantum information science
            at UCSD. We explore the theory and practice of quantum computing
            through talks, hands-on workshops, reading groups, and collaborative
            projects—welcoming all backgrounds.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <Badge>Talks</Badge>
            <Badge>Workshops</Badge>
            <Badge>Reading / Journal Club</Badge>
            <Badge>Projects</Badge>
            <Badge>Career &amp; Research</Badge>
            <Badge>Outreach</Badge>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Build a welcoming community that demystifies quantum computing,
              develops practical skills, and connects Tritons with research and
              industry opportunities in quantum technologies.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What We Do</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Weekly technical talks &amp; demos</p>
              <p>• Hands-on workshops (Qiskit, Cirq, PennyLane, etc.)</p>
              <p>• Reading groups on QIS/quantum algorithms</p>
              <p>• Project teams &amp; hack nights</p>
              <p>• Panels with researchers &amp; alumni</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Get Involved</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>
                All majors welcome—no prior quantum or physics background
                required. Start by joining our next meeting!
              </p>
              <div className="flex flex-wrap gap-2">
                <Link href="#" className="text-sm underline underline-offset-4 hover:no-underline">
                  Join the Discord
                </Link>
                <Separator orientation="vertical" />
                <Link href="#" className="text-sm underline underline-offset-4 hover:no-underline">
                  Upcoming Events
                </Link>
                <Separator orientation="vertical" />
                <Link href="#" className="text-sm underline underline-offset-4 hover:no-underline">
                  Become a Member
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-14">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Club Leadership
          </h2>
          <p className="mt-2 text-muted-foreground">
            Meet the team organizing programming and supporting our members.
          </p>

          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((person) => (
              <li key={person.name}>
                <LeaderCard person={person} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

const LeaderCard = ({ person }: { person: Leader }) => {
  const { name, role } = person;
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <div className="min-w-0">
            <div className="font-medium leading-tight">{name}</div>
            <div className="text-xs text-muted-foreground">{role}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default AboutPage;