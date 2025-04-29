import { getCoinsTopGainers } from "@zoralabs/coins-sdk";

export async function fetchTrendingCoins(count = 5) {
  const res = await getCoinsTopGainers({ count });
  return res.data?.exploreList?.edges.map((edge) => edge.node) || [];
}
