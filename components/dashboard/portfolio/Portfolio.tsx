"use client";
import usePortfolio from "@/hooks/usePortfolio.hook";

const Portfolio = () => {
  const { data: portfolioList } = usePortfolio();
  console.log("🚀 ~ Portfolio ~ portfolioList:", portfolioList);
  return <div></div>;
};

export default Portfolio;
