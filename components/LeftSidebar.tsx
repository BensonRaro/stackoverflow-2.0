"use client";

import { SignedOut, useAuth } from "@clerk/nextjs";
import { PiSignInBold } from "react-icons/pi";
import { TbLogin } from "react-icons/tb";
import Link from "next/link";

import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const LeftSidebar = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  return (
    <section className="light-border custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto shadow-lg p-6 pt-36 max-sm:hidden lg:w-[266px] dark:dark-gradient bg-light-800">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;

          if (item.route === "/profile") {
            if (userId) {
              item.route = `${item.route}/${userId}`;
            } else {
              return null;
            }
          }

          return (
            <Link
              href={item.route}
              key={item.label}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark300_light900"
              }  flex items-center justify-start gap-4 bg-transparent p-4 hover:primary-gradient  hover:text-light-900 rounded-lg`}
            >
              {isActive ? (
                <item.active className="size-8" />
              ) : (
                <item.icon className="size-8" />
              )}
              <p
                className={`${
                  isActive ? "base-bold" : "base-medium"
                } max-lg:hidden`}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>

      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href="/sign-in">
            <Button className="small-medium btn-secondary text-light400_light500 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <PiSignInBold className="lg:hidden size-7" />

              <span className="primary-text-gradient max-lg:hidden">
                Log In
              </span>
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
              <TbLogin className="lg:hidden size-7" />

              <span className="max-lg:hidden">Sign up</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
};

export default LeftSidebar;
