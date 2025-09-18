'use client';

import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react";

export default function InfoMenu() {

  const {resolvedTheme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [])

  if(!mounted)
    return null;

  return (
    <Button
      size="icon"
      variant="ghost"
      className="size-8 rounded-full shadow-none cursor-pointer"
      aria-label="Open edit menu"
      onClick={() => setTheme(resolvedTheme == 'dark' ? 'light' : 'dark')}
    >
      {
          resolvedTheme == 'dark' &&
          <Moon className="text-muted-foreground" size={16} aria-hidden="true" />
      }
      {
          resolvedTheme == 'light' &&
          <Sun className="text-muted-foreground" size={16} aria-hidden="true" />
      }
    </Button>
  )
}
