'use client';

import ThemeSwitcher from "@/components/sections/navbar/theme-switcher"
import Logo from "@/components/sections/navbar/logo"
import UserMenu from "@/components/sections/navbar/user-menu"
import { Button } from "@/components/ui/button"
import {NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList} from "@/components/ui/navigation-menu"
import { Popover,PopoverContent,PopoverTrigger} from "@/components/ui/popover"
import { LogIn } from "lucide-react"

// Routing
import Link from 'next/link'
import { usePathname } from "next/navigation"
import { Session } from "next-auth";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact Us" }
];

const rightNavigationLink = [
  { href: "/login", label: "Login Area"},
]

const Header = ({session}: {session: Session | null}) => {

  // Current path
  const currentPath = usePathname();

  return (
    <header className="px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="group size-8 md:hidden" variant="ghost" size="icon">
                <svg className="pointer-events-none" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 12L20 12" className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"/>
                  <path d="M4 12H20" className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45" />
                  <path d="M4 12H20" className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"/>
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink asChild>
                        <Link href={link.href} className="py-1.5">{link.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-primary hover:text-primary/90">
              <Logo width={33} height={33} />
            </Link>
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink asChild>
                        <Link href={link.href} className="py-1.5" data-active={currentPath == link.href ? true : undefined}>{link.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
          </div>
          {
            session ? <UserMenu session={session} /> : (
              <Button size="sm" className="cursor-pointer text-sm max-sm:aspect-square max-sm:p-0" asChild>
                <Link href={rightNavigationLink[0].href}>
                    <LogIn className="opacity-60 sm:-ms-1" size={16} aria-hidden="true" />
                    <span className="max-sm:sr-only">{rightNavigationLink[0].label}</span>
                </Link>
              </Button>
            )
          }
        </div>
      </div>
    </header>
  )
}

export default Header;