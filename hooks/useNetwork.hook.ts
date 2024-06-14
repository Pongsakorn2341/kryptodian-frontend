import { handleError } from "@/lib/helper";
import { handleFetchBackend } from "@/lib/utils";
import { INetwork } from "@/types/network/network";
import { useCallback, useEffect, useState } from "react";

const useNetwork = <T = INetwork[]>() => {
  const [networks, setNetworks] = useState<INetwork[]>([]);

  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPortfolio = useCallback(
    async (signal: AbortSignal) => {
      try {
        setIsLoading(true);
        const response = await handleFetchBackend<INetwork[]>({
          path: `/token/network`,
          method: "GET",
          signal,
        });

        if (response.status == "failed") return;
        setNetworks(response?.data ?? []);
      } catch (e) {
        handleError(e, true);
      } finally {
        setIsLoading(false);
      }
    },
    [toggle]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchPortfolio(controller.signal);
    return () => {
      controller.abort();
    };
  }, [fetchPortfolio]);

  return {
    data: networks as T,
    isLoading,
    reload: () => setToggle((prev) => !prev),
  };
};

export default useNetwork;
