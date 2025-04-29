import { sdk } from "@farcaster/frame-sdk";
import { useEffect } from "react";
// import { useAccount, useConnect, useSignMessage } from "wagmi";
import Home from "./pages";

function App() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return (
    <>
      <head>
        {" "}
        <meta
          name="fc:frame"
          content='{
          "version":"next",
          "imageUrl":"https://trens.vercel.app/zora.png",
          "button": {
            "title": "🚀 View Top Coins",
            "action": {
              "type": "launch_frame",
              "url": "https://trens.vercel.app",
              "name": "Trending Coins",
              "splashImageUrl": "https://trens.vercel.app/emoji.png",
              "splashBackgroundColor": "#000000"
            }
          }
        }'
        />
      </head>
      <Home />
    </>
  );
}

// function ConnectMenu() {
//   const { isConnected, address } = useAccount();
//   const { connect, connectors } = useConnect();

//   if (isConnected) {
//     return (
//       <>
//         <div>Connected account:</div>
//         <div>{address}</div>
//         <SignButton />
//       </>
//     );
//   }

//   return (
//     <button type="button" onClick={() => connect({ connector: connectors[0] })}>
//       Connect
//     </button>
//   );
// }

// function SignButton() {
//   const { signMessage, isPending, data, error } = useSignMessage();

//   return (
//     <>
//       <button
//         type="button"
//         onClick={() => signMessage({ message: "hello world" })}
//         disabled={isPending}
//       >
//         {isPending ? "Signing..." : "Sign message"}
//       </button>
//       {data && (
//         <>
//           <div>Signature</div>
//           <div>{data}</div>
//         </>
//       )}
//       {error && (
//         <>
//           <div>Error</div>
//           <div>{error.message}</div>
//         </>
//       )}
//     </>
//   );
// }

export default App;
