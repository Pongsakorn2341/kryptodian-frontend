import { getNetworks } from "@/action/network/network.action";
import { getPortfolioData } from "@/action/portfolio/portfolios";
import CoinTable from "@/components/dashboard/portfolio/CoinTable";
import { notFound } from "next/navigation";

const page = async (req: { params: { portId: string } }) => {
  const portId = req?.params?.portId;

  const portfolioData = await getPortfolioData(portId);
  if (!portfolioData) {
    notFound();
  }

  const networks = await getNetworks();
  if (!Array.isArray(networks)) {
    notFound();
  }

  return (
    <div>
      <CoinTable portfolioData={portfolioData} networks={networks} />
    </div>
  );
};

export default page;
