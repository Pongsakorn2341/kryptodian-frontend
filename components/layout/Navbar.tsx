import { getPortfolios } from "@/action/portfolio/portfolios";
import MobileSidebar from "./MobileSidebar";

const Navbar = async () => {
  const portfolioList = await getPortfolios();

  return (
    <div className="flex items-center p-4 md:p-0">
      <MobileSidebar portfolioList={portfolioList ?? []} />
      <div className="flex w-full justify-end"></div>
    </div>
  );
};

export default Navbar;
