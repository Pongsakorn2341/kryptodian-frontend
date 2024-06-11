import Portfolio from "@/components/dashboard/portfolio/Portfolio";
import { getPortfolios } from "@/server/portfolio/get-pofolios";
import { notFound } from "next/navigation";

const Dashboard = async () => {
  const result = await getPortfolios();
  if (!result || !Array.isArray(result)) {
    notFound();
  }
  return (
    <section className="portfolio-list">
      <div className="text-center py-10">
        <Portfolio portfolioList={result} />
      </div>
    </section>
  );
};

export default Dashboard;
