// ** CAROUSEL ** //
export interface CarouselProps {
  items: EventItem[];
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
  image?: string;
  startDate: string | Date;
  endDate?: string | Date;
  location?: string;
  description?: string;
  code?: string;
  points?: number;
};
