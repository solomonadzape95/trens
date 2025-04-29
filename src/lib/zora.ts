// lib/zora.ts
import {
  getCoinsTopGainers,
  getCoinsTopVolume24h,
  getCoinsNew,
} from "@zoralabs/coins-sdk";

export async function fetchTopGainers(count = 5) {
  const response = await getCoinsTopGainers({ count });
  return response.data?.exploreList?.edges.map((edge) => edge.node) || [];
}

export async function fetchTopVolumeCoins(count = 5) {
  const response = await getCoinsTopVolume24h({ count });
  return response.data?.exploreList?.edges.map((edge) => edge.node) || [];
}

export async function fetchNewCoins(count = 5) {
  const response = await getCoinsNew({ count });
  return response.data?.exploreList?.edges.map((edge) => edge.node) || [];
}
