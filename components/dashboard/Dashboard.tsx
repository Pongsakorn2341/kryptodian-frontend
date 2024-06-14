"use client";

import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";

const DashboardPage = () => {
  const session = useSession();
  const isSignedIn = session.status == "authenticated";

  return (
    <div className="text-white font-bold py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>Kryptodian Portfolio</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          <TypewriterComponent
            options={{
              strings: [
                "Crypto Currencies",
                "Realtime Charts",
                "Build your own",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-sl font-light text-zinc-400">
        Portfolio of Crypto currencies
      </div>
      <div>
        <Link href={isSignedIn ? "/portfolio" : `/auth/login`}>
          <Button
            variant="default"
            className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
          >
            Getting Start
          </Button>
        </Link>
      </div>
      <div className="text-zinc-400 text-xs md:text-sm font-normal">
        No credit card required.
      </div>
    </div>
  );
};

export default DashboardPage;
