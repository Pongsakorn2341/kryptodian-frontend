"use client";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import usePortfolio from "@/hooks/usePortfolio.hook";
import Link from "next/link";
import { useEffect, useState } from "react";

const Portfolio = () => {
  const { data: portfolioList, isLoading } = usePortfolio();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <div>
      <div className="flex items-center justify-between px-4 py-2 bg-primary_dark shadow-sm">
        <div className="flex items-center space-x-4">
          <Link
            href="/portfolio/my-portfolio"
            className="px-4 py-2 font-semibold text-zinc-300 rounded-md underline-offset-4 hover:underline"
          >
            Overview
          </Link>
          {isLoading ? (
            <Link href="#" className="px-4 py-2 font-semibold rounded-md">
              <LoadingSpinner className="text-white" />
            </Link>
          ) : null}
          {portfolioList.map((portData) => (
            <Link
              key={portData.id}
              href={`/portfolio/${portData.id}`}
              className="px-4 py-2 font-semibold text-green-600 bg-green-100 rounded-md hover:bg-green-200"
            >
              {portData.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
