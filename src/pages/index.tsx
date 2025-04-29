// components/TrendingZoraCoins.tsx
"use client";

import { useEffect, useState } from "react";
import { sdk } from "@farcaster/frame-sdk";
import {
  fetchTopGainers,
  fetchTopVolumeCoins,
  fetchNewCoins,
} from "../lib/zora";

export default function TrendingZoraCoins() {
  const [coins, setCoins] = useState<
    Array<{
      id: string;
      name: string;
      description: string;
      address: string;
      symbol: string;
      totalSupply: string;
      totalVolume: string;
      volume24h: string;
      imageUrl?: string;
      marketCapDelta24h?: string;
      createdAt?: string;
      creatorAddress?: string;
      uniqueHolders: number;
    }>
  >([]);
  const [recentCoins, setRecentCoins] = useState<
    Array<{
      id: string;
      name: string;
      description: string;
      address: string;
      symbol: string;
      totalSupply: string;
      imageUrl?: string;
      marketCapDelta24h?: string;
      totalVolume: string;
      volume24h: string;
      createdAt?: string;
      creatorAddress?: string;
      uniqueHolders: number;
    }>
  >([]);
  const [category, setCategory] = useState<"topGainers" | "volume">(
    "topGainers"
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sdk.actions.ready();
    loadCoins();
    fetchNewCoins().then(setRecentCoins);
  }, [category]);
// async function handleMint(address: string) {
//   try {
//     const tx = await mintCoin(address);
//     alert(`Minted! Tx hash: ${tx}`);
//   } catch (e) {
//     console.error(e);
//     alert("Failed to mint. Make sure your wallet is connected.");
//   }
// }
  async function loadCoins() {
    setLoading(true);
    const data =
      category === "topGainers"
        ? await fetchTopGainers()
        : await fetchTopVolumeCoins();
    setCoins(data);
    setLoading(false);
  }

  function handleCast(coin: any) {
    const text = `🚀 Check out ${coin.name} ($${coin.symbol}) on Zora!\nMint or trade: https://zora.co/collect/base:${coin.address}`;
    sdk.actions.composeCast({ text });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <span className="mr-2">📈</span> Trending Zora Coins
          </h1>
          <p className="text-gray-600 mt-2">
            Discover the hottest coins on Zora right now
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex" aria-label="Tabs">
              <button
                onClick={() => setCategory("topGainers")}
                className={`px-4 py-3 text-sm font-medium flex-1 text-center ${
                  category === "topGainers"
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Top Gainers
              </button>
              <button
                onClick={() => setCategory("volume")}
                className={`px-4 py-3 text-sm font-medium flex-1 text-center ${
                  category === "volume"
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Top Volume
              </button>
            </nav>
          </div>

          <div className="p-4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {coins.map((coin, idx) => (
                  <li key={coin.address + idx} className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-3">
                          {coin.imageUrl ? (
                            <img
                              src={coin.imageUrl}
                              alt={coin.symbol}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-lg">🪙</span>
                          )}
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">
                            {coin.name}
                          </h3>
                          <p className="text-xs text-gray-500">
                            ${coin.symbol}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            (Number(coin.marketCapDelta24h) || 0) >= 0
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {(Number(coin.marketCapDelta24h) || 0) >= 0
                            ? "+"
                            : ""}
                          {coin.marketCapDelta24h || "0"}%
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                          Vol: ${coin.volume24h || "0"}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center space-x-2">
                      <button
                        onClick={() =>
                          window.open(
                            `https://basescan.org/address/${coin.address}`,
                            "_blank"
                          )
                        }
                        className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <span className="mr-1">🔎</span> Explorer
                      </button>
                      <button
                        onClick={() => handleCast(coin)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        <span className="mr-1">🗣️</span> Cast
                      </button>
                      <a
                        href={`https://zora.co/collect/base:${coin.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                      >
                        <span className="mr-1">💰</span> Trade
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <span className="mr-2">🆕</span> Recently Added
            </h2>
          </div>
          <div className="p-4">
            {recentCoins.length === 0 ? (
              <p className="text-center text-gray-500 py-4">Loading...</p>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {recentCoins.slice(0, 6).map((coin) => (
                  <a
                    key={coin.address}
                    href={`https://zora.co/collect/base:${coin.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                  >
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-3">
                      {coin?.imageUrl ? (
                        <img
                          src={coin.imageUrl || ""}
                          alt={coin.symbol}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span>🪙</span>
                      )}
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {coin.name}
                      </p>
                      <p className="text-xs text-gray-500">${coin.symbol}</p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
// import { useEffect, useState } from "react";
// import { sdk } from "@farcaster/frame-sdk";
// import {
//   fetchTopGainers,
//   fetchTopVolumeCoins,
//   fetchNewCoins,
// } from "../lib/zora";

// export default function TrendingZoraCoins() {
//   const [coins, setCoins] = useState([]);
//   const [recentCoins, setRecentCoins] = useState([]);
//   const [category, setCategory] = useState("topGainers");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     sdk.actions.ready();
//     loadCoins();
//     fetchNewCoins().then(setRecentCoins);
//   }, [category]);

//   async function loadCoins() {
//     setLoading(true);
//     const data =
//       category === "topGainers"
//         ? await fetchTopGainers()
//         : await fetchTopVolumeCoins();
//     setCoins(data);
//     setLoading(false);
//   }

//   function handleCast(coin) {
//     const text = `🚀 Check out ${coin.name} ($${coin.symbol}) on Zora!\nMint or trade: https://zora.co/collect/base:${coin.address}`;
//     sdk.actions.composeCast({ text });
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
//       <div className="max-w-2xl mx-auto">
//         <header className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 flex items-center">
//             <span className="mr-2">📈</span> Trending Zora Coins
//           </h1>
//           <p className="text-gray-600 mt-2">
//             Discover the hottest coins on Zora right now
//           </p>
//         </header>

//         <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
//           <div className="border-b border-gray-200">
//             <nav className="flex" aria-label="Tabs">
//               <button
//                 onClick={() => setCategory("topGainers")}
//                 className={`px-4 py-3 text-sm font-medium flex-1 text-center ${
//                   category === "topGainers"
//                     ? "text-indigo-600 border-b-2 border-indigo-600"
//                     : "text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 Top Gainers
//               </button>
//               <button
//                 onClick={() => setCategory("volume")}
//                 className={`px-4 py-3 text-sm font-medium flex-1 text-center ${
//                   category === "volume"
//                     ? "text-indigo-600 border-b-2 border-indigo-600"
//                     : "text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 Top Volume
//               </button>
//             </nav>
//           </div>

//           <div className="p-4">
//             {loading ? (
//               <div className="flex justify-center items-center h-64">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
//               </div>
//             ) : (
//               <ul className="divide-y divide-gray-200">
//                 {coins.map((coin, idx) => (
//                   <li key={coin.address + idx} className="py-4">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center">
//                         <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-3">
//                           {coin.imageUrl ? (
//                             <img
//                               src={coin.imageUrl}
//                               alt={coin.symbol}
//                               className="h-full w-full object-cover"
//                             />
//                           ) : (
//                             <span className="text-lg">🪙</span>
//                           )}
//                         </div>
//                         <div>
//                           <h3 className="text-sm font-medium text-gray-900">
//                             {coin.name}
//                           </h3>
//                           <p className="text-xs text-gray-500">
//                             ${coin.symbol}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex flex-col items-end">
//                         <span
//                           className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
//                             (coin.marketCapDelta24h || 0) >= 0
//                               ? "bg-green-100 text-green-800"
//                               : "bg-red-100 text-red-800"
//                           }`}
//                         >
//                           {(coin.marketCapDelta24h || 0) >= 0 ? "+" : ""}
//                           {coin.marketCapDelta24h || "0"}%
//                         </span>
//                         <span className="text-xs text-gray-500 mt-1">
//                           Vol: ${coin.volume24h || "0"}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="mt-2 flex items-center space-x-2">
//                       <button
//                         onClick={() =>
//                           window.open(
//                             `https://basescan.org/address/${coin.address}`,
//                             "_blank"
//                           )
//                         }
//                         className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
//                       >
//                         <span className="mr-1">🔎</span> Explorer
//                       </button>
//                       <button
//                         onClick={() => handleCast(coin)}
//                         className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700"
//                       >
//                         <span className="mr-1">🗣️</span> Cast
//                       </button>
//                       <a
//                         href={`https://zora.co/collect/base:${coin.address}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
//                       >
//                         <span className="mr-1">💰</span> Trade
//                       </a>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           <div className="px-4 py-3 border-b border-gray-200">
//             <h2 className="text-lg font-medium text-gray-900 flex items-center">
//               <span className="mr-2">🆕</span> Recently Added
//             </h2>
//           </div>
//           <div className="p-4">
//             {recentCoins.length === 0 ? (
//               <p className="text-center text-gray-500 py-4">Loading...</p>
//             ) : (
//               <div className="grid grid-cols-2 gap-4">
//                 {recentCoins.slice(0, 6).map((coin) => (
//                   <a
//                     key={coin.address}
//                     href={`https://zora.co/collect/base:${coin.address}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
//                   >
//                     <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-3">
//                       {coin.imageUrl ? (
//                         <img
//                           src={coin.imageUrl}
//                           alt={coin.symbol}
//                           className="h-full w-full object-cover"
//                         />
//                       ) : (
//                         <span>🪙</span>
//                       )}
//                     </div>
//                     <div className="truncate">
//                       <p className="text-sm font-medium text-gray-900 truncate">
//                         {coin.name}
//                       </p>
//                       <p className="text-xs text-gray-500">${coin.symbol}</p>
//                     </div>
//                   </a>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
