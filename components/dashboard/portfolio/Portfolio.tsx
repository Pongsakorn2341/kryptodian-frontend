"use client";

import { Button } from "@/components/ui/button";
import { usePortfolioModal } from "@/store/useAddPortfolioModal";
import { IPortfolio } from "@/types/portfolio/portfolio";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import AddPortfolioDialog from "./dialog/AddPortfolioDialog";

type PortfolioProps = {
  portfolioList: IPortfolio[];
};

const Portfolio = ({ portfolioList = [] }: PortfolioProps) => {
  const { portId } = useParams();
  const [mounted, setMounted] = useState(false);
  const { onOpen } = usePortfolioModal();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <div>
      <div className="px-4 py-2 bg-primary_dark shadow-sm">
        <div className="flex items-center  justify-between space-x-4">
          <div className="space-x-2">
            <Link
              href="/portfolio/my-portfolio"
              className="px-4 py-2 font-semibold text-gray-400 rounded-md underline-offset-4 hover:underline"
            >
              Overview
            </Link>
            {portfolioList.map((portData) => (
              <Link
                key={portData.id}
                href={`/portfolio/${portData.id}`}
                className={`px-4 py-2 font-semibold  hover:text-primary ${
                  portId == portData.id ? `text-primary` : "text-gray-400"
                }`}
              >
                {portData.name}
              </Link>
            ))}
            <Button
              size="sm"
              variant="ghost"
              className="hover:bg-gray-200 gap-1 px-4 py-2 text-white"
              onClick={onOpen}
            >
              <FaPlus /> Add Portfolio
            </Button>
          </div>
        </div>
      </div>
      <AddPortfolioDialog />
    </div>
  );
};

export default Portfolio;
