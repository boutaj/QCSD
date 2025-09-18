import { Gauge, LogOutIcon, UserPenIcon} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Session } from "next-auth"
import Link from "next/link"
import { signOutAction } from "@/components/auth/auth-actions"

const UserMenu = ({session}: {session: Session | null}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-[50] h-auto p-0 hover:bg-transparent cursor-pointer outline-none">
          <Avatar>
            <AvatarFallback>{session?.user?.name?.at(0)?.toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground capitalize truncate text-sm font-medium">
            {session?.user?.name}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {session?.user?.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="cursor-pointer">
              <Gauge size={16} className="opacity-60" aria-hidden="true" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/edit" className="cursor-pointer">
              <UserPenIcon size={16} className="opacity-60" aria-hidden="true" />
              <span>Edit Profile</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <form action={signOutAction}>
          <DropdownMenuItem className="justify-center">
            <Button type="submit" className="cursor-pointer">
              <LogOutIcon size={16} className="opacity-60 text-white" aria-hidden="true" />
              <span>Logout</span>
            </Button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserMenu;