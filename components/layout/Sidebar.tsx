"use client";
import { Montserrat } from "next/font/google";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { CiMoneyCheck1 } from "react-icons/ci";
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import usePortfolio from "@/hooks/usePortfolio.hook";
import { IPortfolio } from "@/types/portfolio/portfolio";

const montserrant = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-emerald-700",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-green-700",
  },
  {
    label: "Setting",
    icon: Settings,
    href: "/settings",
  },
];

type SidebarProps = {
  portfolioList: IPortfolio[];
};

const Sidebar = ({ portfolioList }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-secondary_dark text-white">
      <div className="px-3 py-2 flex-1 ">
        <Link href="/portfolio" className="flex items-center pl-3 mb-14">
          <h1
            className={cn(
              "flex gap-2 text-2xl font-bold items-center",
              montserrant.className
            )}
          >
            <CiMoneyCheck1 size={25}></CiMoneyCheck1>
            Kryptodian
          </h1>
        </Link>
        <div className="space-y-1">
          {portfolioList.map((route) => (
            <Link
              href={`/portfolio/${route.id}`}
              key={route.id}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname.includes(route.id)
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">{route.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
