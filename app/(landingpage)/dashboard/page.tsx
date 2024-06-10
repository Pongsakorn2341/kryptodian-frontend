import Portfolio from "@/components/dashboard/portfolio/Portfolio";

const Dashboard = () => {
  return (
    <section className="portfolio-list">
      <div className="text-center py-10">
        <div className="text-white text-4xl sm:text-4xl md:text-5xl lg:text-6xl space-y-5 font-extrabold">
          <h1>Portfolios</h1>
        </div>
        <Portfolio />
      </div>
    </section>
  );
};

export default Dashboard;
