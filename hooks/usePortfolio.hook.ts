import { handleError } from "@/lib/helper";
import { handleFetchBackend } from "@/lib/utils";
import { IPortfolio } from "@/types/portfolio/portfolio";
import { useCallback, useEffect, useState } from "react";

const usePortfolio = () => {
  const [ports, setPorts] = useState<IPortfolio[]>([]);
  const fetchPortfolio = useCallback(async (signal: AbortSignal) => {
    try {
      console.log(`FETCh`);
      const response = await handleFetchBackend<IPortfolio[]>({
        path: `/portfolio`,
        method: "GET",
        signal,
      });
      console.log("🚀 ~ fetchPortfolio ~ response:", response);

      if (response.status == "failed") return;
      setPorts(response?.data ?? []);
    } catch (e) {
      console.log(e);
      handleError(e, true);
    }
  }, []);

  useEffect(() => {
    console.log(`trigger`);
    const controller = new AbortController();
    fetchPortfolio(controller.signal);
    return () => {
      controller.abort();
    };
  }, [fetchPortfolio]);

  return {
    data: ports,
  };
};

export default usePortfolio;
