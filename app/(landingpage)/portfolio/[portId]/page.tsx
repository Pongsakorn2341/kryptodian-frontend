import CoinTable from "@/components/dashboard/portfolio/CoinTable";
import { getPortfolioData, getPortfolios } from "@/action/portfolio/portfolios";
import { notFound } from "next/navigation";

const page = async (req: { params: { portId: string } }) => {
  const portId = req?.params?.portId;

  const portfolioList = await getPortfolios();
  if (!portfolioList || !Array.isArray(portfolioList)) {
    notFound();
  }
  const portfolioData = await getPortfolioData(portId);
  if (!portfolioData) {
    notFound();
  }

  return (
    <div>
      <CoinTable portfolioList={portfolioList} portfolioData={portfolioData} />
    </div>
  );
};

export default page;
