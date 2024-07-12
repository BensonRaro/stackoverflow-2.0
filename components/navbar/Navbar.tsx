import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import MobileNav from "./MobileNav";
import { ThemeToggle } from "@/components/theme/theme-toggle";
// import GlobalSearch from '../search/GlobalSearch'

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full gap-5 p-6 shadow-md dark:shadow-none sm:px-12 dark:dark-gradient bg-light-800">
      <div className="flex gap-2">
        <MobileNav />

        <Link href="/" className="flex items-center gap-1">
          <Image src="/favicon.ico" width={23} height={23} alt="DevFlow" />

          <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
            Stack <span className="text-myPrimary-500">Overflow</span>
          </p>
        </Link>
      </div>

      {/* <GlobalSearch /> */}

      <div className="flex-between gap-5">
        <ThemeToggle />
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
