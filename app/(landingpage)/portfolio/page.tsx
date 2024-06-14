import { getPortfolios } from "@/action/portfolio/portfolios.action";
import { notFound, redirect } from "next/navigation";
const Dashboard = async () => {
  const result = await getPortfolios();
  if (!result || !Array.isArray(result)) {
    notFound();
  }

  if (Array.isArray(result) && result.length >= 1) {
    redirect(`/portfolio/${result[0].id}`);
  }

  return (
    <div className="container">
      <div className="text-center py-10"></div>
    </div>
  );
};

export default Dashboard;
