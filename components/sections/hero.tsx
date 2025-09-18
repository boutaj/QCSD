import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Session } from "next-auth";

const Hero = ({session}: {session: Session | null}) => {
  return (
    <section className="relative flex justify-center text-center">
      <div className="mx-auto max-w-6xl px-6 pt-10 pb-10 sm:pt-14 sm:pb-14">
        <h6 className="inline-block text-xs font-semibold uppercase tracking-widest sm:text-sm">Welcome!</h6>
        <h1 className="mt-3 text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl">
          QCSD
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          UC San Diego&apos;s club for Quantum Computing
        </p>
        <p className="mt-5 max-w-3xl text-sm text-muted-foreground">
          We host talks, workshops, and hands-on projects connecting students, researchers, and industry around quantum algorithms, hardware, and real-world applications.
        </p>
        <div className="mt-7 flex justify-center flex-wrap gap-3">
          {
            (session) ? (
                <Button asChild size="lg">
                  <Link href="/dashboard">Dashboard</Link>
               </Button>
            ) : (
              <>
                <Button asChild size="lg">
                  <Link href="/login">Log in</Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/signup">Sign up</Link>
                </Button>
              </>
            )
          }
          <Button asChild size="lg" variant="outline">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Hero;