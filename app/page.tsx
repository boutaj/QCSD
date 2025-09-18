import UpComingEvents from "@/components/sections/carousel";
import LatestHighlights from "@/components/sections/card";
import Hero from "@/components/sections/hero";
import { highlights} from "@/mock-data"
import { auth } from "@/auth";
import { EventItem } from "@/components/interface";
import { prisma } from "@/lib/db";

const getUpComingEvents = async () => {
  
  const events: EventItem[] = (await prisma.events.findMany({
    orderBy: {startDate: "asc"},
    take: 3,
  })).map(e => ({
      id: String(e.id),   
      title: e.title,
      image: e.image,
      startDate: e.startDate,
      endDate: e.endDate,
      location: e.location,
      description: e.description,
  }));

  return events;
};

const HomePage = async () => {

  return (
    <>     
        <div className="flex justify-center flex-col">
          <Hero session={await auth()} />
          <hr />
          <h2 className="text-2xl md:text-3xl font-semibold text-center tracking-wide text-gray-900 dark:text-gray-100 my-8">
            Upcoming Events
          </h2>
          <section className="sm:px-6 mb-6 lg:px-8">
            <UpComingEvents items={await getUpComingEvents()} />
          </section>
          <h2 className="text-2xl md:text-3xl font-semibold text-center tracking-wide text-gray-900 dark:text-gray-100 my-8">
            Latest Highlights
          </h2>
          <section className="grid grid-cols-1 gap-6 px-6 sm:grid-cols-3 lg:grid-cols-4">
            {highlights.map((p) => (
              <LatestHighlights key={p.href} {...p} />
            ))}
          </section>
        </div>
    </>
  )
}

export default HomePage;