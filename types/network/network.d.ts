export type INetwork = {
  id: string;
  type: "network";
  attributes: {
    name: string;
    coingecko_asset_platform_id: string;
  };
};
