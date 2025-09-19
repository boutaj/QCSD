import {Footer, FooterBottom, FooterColumn, FooterContent} from "@/components/ui/footer";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Logo from "@/components/sections/navbar/logo";
import Link from "next/link";

const FooterSection = () => {
  return (
    <footer className="bg-background w-full px-4">
      <div className="max-w-container mx-auto">
        <Footer>
          <FooterContent>
            <FooterColumn className="col-span-2 hidden sm:block sm:col-span-3 md:col-span-1">
              <div className="flex items-center gap-2">
                <Logo width={33} height={33} />
                <h3 className="text-xl font-bold">QCSD</h3>
              </div>
            </FooterColumn>
            <FooterColumn>
              <h3 className="text-md pt-1 font-semibold">Links</h3>
              <Link href="/about" className="text-muted-foreground text-sm">
                About
              </Link>
              <Link href="/events" className="text-muted-foreground text-sm">
                Events
              </Link>
            </FooterColumn>
            <FooterColumn>
              <h3 className="text-md pt-1 font-semibold">Contact</h3>
              <a href="#" className="text-muted-foreground text-sm">
                Discord
              </a>
              <a href="#" className="text-muted-foreground text-sm">
                Twitter
              </a>
              <a href="#" className="text-muted-foreground text-sm">
                Github
              </a>
            </FooterColumn>
          </FooterContent>
          <FooterBottom>
            <div>© {new Date().getFullYear()} QCSD. All rights reserved</div>
            <div className="flex items-center gap-4">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <ModeToggle />
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}

export default FooterSection;