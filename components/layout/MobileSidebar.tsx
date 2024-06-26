"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";
import { IPortfolio } from "@/types/portfolio/portfolio";

type MobileSidebarProps = {
  portfolioList: IPortfolio[];
};

const MobileSidebar = ({ portfolioList }: MobileSidebarProps) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu size={30} className="text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar portfolioList={portfolioList} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
