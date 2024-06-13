import { getPortfolios } from "@/action/portfolio/portfolios";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { notFound } from "next/navigation";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const portfolios = await getPortfolios();
  if (!Array.isArray(portfolios)) {
    notFound();
  }
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72  md:flex-col md:fixed md:inset-y-0 bg-gray-900">
        <Sidebar portfolioList={portfolios ?? []} />
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default layout;
