import { getPortfolioData } from "@/action/portfolio/portfolios";
import { getTransactions } from "@/action/transaction/transaction.action";
import TransactionTable from "@/components/dashboard/transaction/TransactionTable";
import { notFound } from "next/navigation";

const page = async (req: { params: { portId: string; coinId: string } }) => {
  const portId = req?.params?.portId;
  const coinId = req?.params?.coinId;

  const portfolioData = await getPortfolioData(portId);
  if (!portfolioData) {
    notFound();
  }

  const transactions = await getTransactions({
    portfolioId: portId,
    coinId,
  });
  if (!Array.isArray(transactions)) {
    notFound();
  }

  return (
    <div className="container">
      <TransactionTable
        portfolioData={portfolioData}
        transactions={transactions}
        coinId={coinId}
      />
    </div>
  );
};

export default page;
