"use client";

import { useEffect, useState } from "react";
import { sdk } from "@farcaster/frame-sdk";
import { fetchTrendingCoins } from "../lib/zora";

export default function Home() {
  const [coins, setCoins] = useState<Array<{
    id: string;
    name: string;
    description: string;
    address: string;
    symbol: string;
    totalSupply: string;
    totalVolume: string;
    volume24h: string;
    createdAt?: string;
    creatorAddress?: string;
    marketCap: string;
    marketCapDelta24h: number;
    uniqueHolders: number;
  }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sdk.actions.ready(); // Dismiss splash screen
    fetchTrendingCoins().then((data) => {
      setCoins(data.map(coin => ({
        ...coin,
        marketCapDelta24h: Number(coin.marketCapDelta24h)
      })));
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading trending coins...</p>;

  return (
    <>
      <head>
        <meta
          name="fc:frame"
          content='{
  "version":"next",
  "imageUrl":"https://yourdomain.com/preview.png",
  "button":{
    "title":"🚀 View Top Coins",
    "action":{
      "type":"launch_frame",
      "url":"https://yourdomain.com",
      "name":"Trending Coins",
      "splashImageUrl":"https://yourdomain.com/icon.png",
      "splashBackgroundColor":"#000000"
    }
  }
}'
        />
      </head>
      <div style={{ padding: 20 }}>
        <h1>📈 Trending Zora Coins</h1>
        <ul>
          {coins.map((coin, idx) => (
            <li key={coin.address} style={{ marginBottom: 12 }}>
              <strong>
                {coin.name} ({coin.symbol})
              </strong>
              <br />
              Market Cap: ${coin.marketCap}
              <br />
              24h Volume: ${coin.volume24h}
              <br />
              24h Change: {coin.marketCapDelta24h}%
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
