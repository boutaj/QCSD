"use client";

import {useState, useRef, useEffect} from "react";
import Image from "next/image";
import {CarouselProps} from '@/components/interface';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const UpComingEvents = ({items}: CarouselProps) => {

  const [api, setApi]     = useState<CarouselApi | null>(null);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);

  const autoplay = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  useEffect(() => {
    
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setIndex(api.selectedScrollSnap());

    const onSelect = () => setIndex(api.selectedScrollSnap());
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
    
  }, [api]);

  if (!items?.length) return null;

  return (
    <div className="w-full" aria-label="Top tech blog of this week">
      <Carousel setApi={setApi} opts={{ loop: true, align: "start" }} plugins={[autoplay.current]} className="relative">
        <CarouselContent>
          {items.map((item) => (
            <CarouselItem key={item.id} className="basis-full">
              <article style={{ aspectRatio: "21/9" }} className="relative w-full overflow-hidden rounded-xl">
                <div className="group block h-full w-full focus:outline-none">
                  <div className="absolute inset-0">
                    <Image
                      src={item.image ?? ""}
                      alt={item.title}
                      fill
                      sizes="100vw"
                      priority
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/0" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-white">
                    <div className="flex items-center gap-3 mb-3">
                      {item.location ? (
                        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur">
                          {item.location}
                        </span>
                      ) : null}
                      {item.startDate ? (
                        <time
                          className="text-xs text-white/80"
                          dateTime={item.startDate as string}
                          suppressHydrationWarning
                        >
                          {new Date(item.startDate).toLocaleDateString()}
                        </time>
                      ) : null}
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-semibold leading-tight drop-shadow pb-5">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-3 md:left-4 cursor-pointer" />
        <CarouselNext className="right-3 md:right-4 cursor-pointer" />
        
        <DotIndicators
          count={count}
          activeIndex={index}
          onDotClick={(i) => api?.scrollTo(i)}
        />
      </Carousel>
    </div>
  );
}

const DotIndicators = ({count, activeIndex, onDotClick}: {count: number; activeIndex: number;onDotClick: (i: number) => void}) => {
  
  if (count <= 1) return null;
  
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">
      <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-black/40 px-2 py-1 backdrop-blur">
        {Array.from({ length: count }).map((_, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={isActive}
              onClick={() => onDotClick(i)}
              className={[
                "h-2.5 w-2.5 rounded-full transition-all",
                isActive ? "w-5" : "opacity-70 hover:opacity-100",
              ].join(" ")}
              style={{
                background: "white",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}


export default UpComingEvents;