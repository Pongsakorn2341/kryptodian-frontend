import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="text-center py-10">
      <div className="text-white text-4xl sm:text-4xl md:text-5xl lg:text-6xl space-y-5 py-4 font-extrabold">
        <h1>Portfolios</h1>
      </div>
      {children}
    </div>
  );
};

export default layout;
