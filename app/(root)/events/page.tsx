import { auth } from "@/auth";
import EventCalendar from "@/components/events/event";
import { Metadata } from "next";
import { prisma } from "@/lib/db";
import { EventItem } from "@/components/interface";

export const metadata: Metadata = {
  title: "Events | QCSD",
  description: "See our upcoming events",
};

const Events = async () => {

  const events: EventItem[] = (await prisma.events.findMany()).map(e => ({
    id: String(e.id),   
    title: e.title,
    startDate: e.startDate,
    endDate: e.endDate,
    location: e.location,
    description: e.description,
  }));

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <EventCalendar events={events} session={await auth()} />
    </main>
  );
}

export default Events;