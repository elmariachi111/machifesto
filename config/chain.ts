import { mainnet, sepolia } from "viem/chains";
import { CreateConfigParameters, http } from "wagmi";

export const chainConfig: Partial<CreateConfigParameters> =
  process.env.NEXT_PUBLIC_CHAIN_ENV === "sepolia"
    ? {
        chains: [sepolia],
        transports: {
          [sepolia.id]: http(
            `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
          ),
        },
      }
    : {
        chains: [mainnet],
        transports: {
          [sepolia.id]: http(
            `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
          ),
        },
      };
