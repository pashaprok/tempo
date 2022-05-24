type SideBase = {
  time: Date;
  asset: string;
  rate: number;
  volume: number;
};

export type CoinAPIResponse = {
  time: Date;
  assest_id_base: string;
  assest_id_quote: string;
  rate: number;
  src_side_base: SideBase[];
};
