import { handleError } from "@/lib/helper";
import { handleFetchBackend } from "@/lib/utils";
import { IPortfolio } from "@/types/portfolio/portfolio";
import { useCallback, useEffect, useState } from "react";

type usePortfolioProps = {
  portId: string;
};

const usePortfolio = <T = Omit<IPortfolio, "Coins">[]>(
  searchData?: usePortfolioProps
) => {
  const [ports, setPorts] = useState<IPortfolio[]>([]);
  const [portData, setPortData] = useState<IPortfolio | null>(null);
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const portId = searchData?.portId;
  const fetchPortfolio = useCallback(
    async (signal: AbortSignal) => {
      try {
        setIsLoading(true);
        if (portId) {
          const response = await handleFetchBackend<IPortfolio>({
            path: `/portfolio/${portId}`,
            method: "GET",
            signal,
          });

          if (response.status == "failed") return;
          setPortData(response?.data);
        } else {
          const response = await handleFetchBackend<
            Omit<IPortfolio, "Coins">[]
          >({
            path: `/portfolio`,
            method: "GET",
            signal,
          });

          if (response.status == "failed") return;
          setPorts(response?.data ?? []);
        }
      } catch (e) {
        console.log(e);
        handleError(e, true);
      } finally {
        setIsLoading(false);
      }
    },
    [JSON.stringify(searchData), toggle]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchPortfolio(controller.signal);
    return () => {
      controller.abort();
    };
  }, [fetchPortfolio]);

  return {
    data: (portId ? portData : ports) as T,
    isLoading,
    reload: () => setToggle((prev) => !prev),
  };
};

export default usePortfolio;
