import { getPortfolios } from "@/action/portfolio/portfolios";
import Portfolio from "@/components/dashboard/portfolio/Portfolio";
import { notFound } from "next/navigation";
const Dashboard = async () => {
  const result = await getPortfolios();
  if (!result || !Array.isArray(result)) {
    notFound();
  }
  return (
    <div>
      <div className="text-center py-10">
        {/* <Portfolio portfolioList={result} /> */}
      </div>
    </div>
  );
};

export default Dashboard;
