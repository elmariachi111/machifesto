"use client";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { Button } from "@nextui-org/button";
import { ConnectKitButton } from "connectkit";
import { mainnet, sepolia } from "viem/chains";
import { useAccount, useChainId } from "wagmi";

import addAttestation from "./actions/addAttestation";
import { useEthersSigner } from "./lib/ens-wagmi-utils";

import { EASConfig } from "@/config/eas";

const CustomConnectButton = () => (
  <ConnectKitButton.Custom>
    {({ isConnecting, show }) => {
      return (
        <Button
          color="primary"
          isLoading={isConnecting}
          radius="full"
          onClick={show}
        >
          Connect Wallet
        </Button>
      );
    }}
  </ConnectKitButton.Custom>
);

export default function SignIntent() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const chainId = useChainId();
  const signer = useEthersSigner();

  const signWithWallet = async () => {
    if (
      !signer ||
      !address ||
      [sepolia.id, mainnet.id].indexOf(chainId as keyof typeof EASConfig) === -1
    ) {
      console.error("preconditions not met", address, signer, chainId);

      return;
    }

    const easConfig = EASConfig[chainId as keyof typeof EASConfig];
    const eas = new EAS(easConfig.Eas);

    // Connects an ethers style provider/signingProvider to perform read/write functions.
    // MUST be a signer to do write operations!
    eas.connect(signer);
    const offchain = await eas.getOffchain();

    const schemaEncoder = new SchemaEncoder("bool supports_bioacc");
    const encodedData = schemaEncoder.encodeData([
      { name: "supports_bioacc", value: true, type: "bool" },
    ]);

    const now = BigInt(Math.floor(new Date().getTime() / 1000));
    const offchainAttestation = await offchain.signOffchainAttestation(
      {
        recipient: address,
        expirationTime: 0n,
        // Unix timestamp of current time
        time: now,
        revocable: true, // Be aware that if your schema is not revocable, this MUST be false
        //@ts-ignore https://docs.attest.org/docs/developer-tools/eas-sdk#versioning
        version: 2,
        nonce: 0n,
        schema: easConfig.schemaId,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000",
        data: encodedData,
      },
      signer,
    );
    const result = await addAttestation(offchainAttestation);

    console.log(result);
  };

  if (isConnecting) return <div>Connecting...</div>;
  if (isDisconnected) return <CustomConnectButton />;

  return <Button onClick={signWithWallet}>Sign the Manifesto</Button>;
}
