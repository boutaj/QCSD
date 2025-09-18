'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LayoutDashboard, BarChart3, Settings, Users, MessageCircle} from "lucide-react";

const nav = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/events", label: "Events", icon: BarChart3 },
  { href: "/dashboard/users", label: "Users", icon: Users },
  { href: "/dashboard/reports", label: "Contacts", icon: MessageCircle },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const Sidebar = () => {
  const pathname = usePathname();

  const NavItems = () => (
    <nav className="grid gap-1">
      {nav.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={[
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
              active
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
            ].join(" ")}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <aside className="hidden md:sticky md:top-0 md:flex md:h-svh md:w-64 md:flex-col md:border-r">
        <div className="flex-1 overflow-y-auto p-3">
          <NavItems />
        </div>
      </aside>
    </>
  );
}

export default Sidebar;