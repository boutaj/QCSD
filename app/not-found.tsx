import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <main className="min-h-screen grid place-items-center bg-background">
      <div className="w-full max-w-xl px-6 py-16 text-center">
        <div className="mx-auto mb-8 grid h-24 w-24 place-items-center rounded-2xl bg-muted">
          <span className="text-3xl font-semibold text-muted-foreground">404</span>
        </div>

        <h1 className="mb-3 text-2xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">
          Sorry, we couldn't find the page you're looking for. It may have been
          moved, or the link is incorrect.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go home
            </Link>
          </Button>
        </div>

        <div className="mt-10">
          <p className="text-xs text-muted-foreground">
            If you believe this is an error, please contact us.
          </p>
        </div>
      </div>
    </main>
  );
}

export default NotFound;