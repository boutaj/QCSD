// ** CAROUSEL ** //
export interface UpComingEventsT {
  id: string | number;
  title: string;
  imageSrc: string;
  category?: string;
  dateISO?: string;
};

export interface CarouselProps {
  items: UpComingEventsT[];
  className?: string;
  aspect?: string;
  autoPlayMs?: number;
};

// ** CARD **//
export interface Image {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

export interface CardProps {
  title: string;
  href: string;
  date: string | Date;
  tags?: string[];
  image?: Image;
  className?: string;
  variant?: "default" | "compact";
};

// ** About ** //
export interface Leader {
  name: string;
  role: string;
};

// ** Events ** //
export interface EventItem {
  id: string;
  title: string;
  start: string | Date;
  end?: string | Date;
  location?: string;
  desc?: string;
};
