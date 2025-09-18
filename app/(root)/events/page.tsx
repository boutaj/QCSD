import { auth } from "@/auth";
import EventCalendar from "@/components/events/event";
import { sampleEvents } from "@/mock-data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | QCSD",
  description: "See our upcoming events",
};

const Events = async () => {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <EventCalendar events={sampleEvents} session={await auth()} />
    </main>
  );
}

export default Events;