import { handleError } from "@/lib/helper";
import { handleFetchBackend } from "@/lib/utils";
import { IPortfolio } from "@/types/portfolio/portfolio";
import { useCallback, useEffect, useState } from "react";

type usePortfolioProps = {
  portId: string;
};

const usePortfolio = <T = IPortfolio[]>({ portId }: usePortfolioProps) => {
  const [ports, setPorts] = useState<IPortfolio[]>([]);
  const [portData, setPortData] = useState<IPortfolio | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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
          const response = await handleFetchBackend<IPortfolio[]>({
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
    [portId]
  );

  useEffect(() => {
    console.log(`trigger`);
    const controller = new AbortController();
    fetchPortfolio(controller.signal);
    return () => {
      controller.abort();
    };
  }, [fetchPortfolio]);

  return {
    data: (portId ? portData : ports) as T,
    isLoading,
  };
};

export default usePortfolio;
