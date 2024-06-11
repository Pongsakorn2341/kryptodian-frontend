import { getPortfolios } from "@/action/portfolio/portfolios";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const portfolios = await getPortfolios();
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72  md:flex-col md:fixed md:inset-y-0 bg-gray-900">
        <Sidebar portfolioList={portfolios ?? []} />
      </div>
      <main className="md:pl-72">
        <Navbar />
        <div className="container">{children}</div>
      </main>
      {/* <div className="container"></div> */}
    </div>
  );
};

export default layout;
