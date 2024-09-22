"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo-Letter.svg";
import { ThemeToggle } from "../dashboard/ThemeToggle";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import HeroImageLight from "@/public/hero-w.png";
import HeroImageDark from "@/public/hero-d.png";
import { Button } from "@/components/ui/button";
import { LucideLayoutDashboard } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

export  function Hero() {
  const { theme } = useTheme();
  const HeroImage = theme === "dark" ? HeroImageDark : HeroImageLight;

  const [session, setSession] = useState<KindeUser<any> | null>(null);
  useEffect(() => {
    const fetchSession = async () => {
      if (typeof window === "undefined") {
        const { getKindeServerSession } = await import("@kinde-oss/kinde-auth-nextjs/server");
        const { getUser } = getKindeServerSession();
        const sessionData = await getUser();
        setSession(sessionData);
      }
    };
    
    fetchSession();
  }, []);

  return (
    <>
      <div className="relative flex flex-col w-full py-5 mx-auto md:flex-row md:items-center md:justify-between">
        <div className="flex flex-row items-center justify-between text-sm lg:justify-start">
          <Link href="/" className="flex items-center gap-2">
            <Image src={Logo} className="size-10" alt="Logo" />
            <h4 className="text-3xl font-semibold">
              Blog<span className="text-primary">Forge</span>
            </h4>
          </Link>
        </div>
        <nav className="hidden md:flex md:justify-end md:space-x-4">
          <ThemeToggle />
          {session?.id ? (
            <Link href="/dashboard">
              <Button variant="secondary">
                <LucideLayoutDashboard />
              </Button>
            </Link>
          ) : (
            <>
              <LoginLink>
                <Button variant="secondary">Sign in</Button>
              </LoginLink>
              <RegisterLink>
                <Button>Sign up</Button>
              </RegisterLink>
            </>
          )}
        </nav>
      </div>

      <section className="relative flex items-center justify-center">
        <div className="relative items-center w-full py-12 lg:py-20">
          <div className="text-center">
            <span className="text-sm text-primary font-medium tracking-tight bg-primary/10 px-4 py-2 rounded-full">
              Ultimate Blogging SaaS for Startups
            </span>
            <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-none">
              Setup your Blog{" "}
              <span className="block text-primary">in Minutes!</span>
            </h1>
            <p className="max-w-xl mx-auto mt-4 text-base font-light lg:text-lg text-muted-foreground tracking-tighter">
              Setting up your blog is hard and time consuming. We make it easy
              for you to create a blog in minutes
            </p>
            <div className="flex items-center gap-x-5 w-full justify-center mt-5 ">
              <LoginLink>
                <Button variant="secondary">Sign in</Button>
              </LoginLink>
              <RegisterLink>
                <Button>Try for free</Button>
              </RegisterLink>
            </div>
          </div>

          <div className="relative items-center w-full py-12 mx-auto mt-12">
            <Image
              src={HeroImage}
              alt="Hero image"
              priority
              className="relative object-cover w-full border rounded-lg shadow-2xl lg:rounded-2xl"
            />
          </div>
        </div>
      </section>
    </>
  );
}