export type ICoin = {
  id: string;
  name: string;
  reference_id: string;
  network_id: string;
  address: string;
  portfolio_id: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  coinData: {
    id: string;
    type: "token";
    attributes: {
      address: string;
      name: string;
      symbol: string;
      image_url: string;
      coingecko_coin_id: string;
      decimals: number;
      total_supply: string;
      price_usd: string;
      fdv_usd: string;
      total_reserve_in_usd: string;
      volume_usd: {
        h24: string;
      };
      market_cap_usd: string;
    };
  };
  priceChange: {
    [key: string]: {
      btc: number;
      btc_24h_change: number;
    };
  };
};
