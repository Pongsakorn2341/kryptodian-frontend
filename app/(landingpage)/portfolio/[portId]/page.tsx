import { getNetworks } from "@/action/network/network.action";
import { getPortfolioData } from "@/action/portfolio/portfolios.action";
import { getTransactions } from "@/action/transaction/transaction.action";
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

  const transactions = await getTransactions({ portfolioId: portId });
  if (!Array.isArray(transactions)) {
    notFound();
  }

  return (
    <div className="container">
      <CoinTable
        portfolioData={portfolioData}
        networks={networks}
        transactions={transactions}
      />
    </div>
  );
};

export default page;
