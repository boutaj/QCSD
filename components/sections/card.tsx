"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CardProps } from "@/components/interface";

const LatestHighlights = ({title, href, date, tags, image}: CardProps) => {
  return (
    <Card
      className="p-0 pb-4 group relative overflow-hidden transition-shadow hover:shadow-lg focus-within:shadow-lg">
      <Link
        href={href}
        prefetch={false}
        aria-label={title}
        className="absolute inset-0 z-10 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      {image ? (
        <div className="group-hover:scale-[1.02] transition-transform duration-300 relative w-full aspect-[16/9]">
          <Image
            src={image.src}
            alt={image.alt ?? ""}
            fill
            sizes="(min-width: 1024px) 400px, 100vw"
            priority={image.priority}
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        </div>
      ) : null}

      <CardHeader className={cn(image ? "mt-2" : "mt-4", "space-y-2")}>
        {tags && tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 ? (
              <Badge variant="outline" className="text-xs">+{tags.length - 3}</Badge>
            ) : null}
          </div>
        ) : null}

        <CardTitle className="leading-tight text-xl">
          <span className="line-clamp-2">{title}</span>
        </CardTitle>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <time dateTime={new Date(date).toISOString()}>{new Intl.DateTimeFormat('en-GB', { dateStyle: "short" }).format(new Date(date))}</time>
        </div>
      </CardHeader>
    </Card>
  );
}

export default LatestHighlights;