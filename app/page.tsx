import UpComingEvents from "@/components/sections/carousel";
import LatestHighlights from "@/components/sections/card";
import Hero from "@/components/sections/hero";
import {events, highlights} from "@/mock-data"
import { auth } from "@/auth";

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
            <UpComingEvents items={events} />
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