import { mainnet, sepolia } from "viem/chains";

export const EASConfig = {
  [mainnet.id]: {
    Eas: "0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587",
    schemaRegistry: "0xA7b39296258348C78294F95B872b282326A97BDF",
    schemaId:
      "0xb10f39c07fd57a2f2946228747ec1652b2bceb3c8c479ba1702bd8d3f89ebc75",
  },
  [sepolia.id]: {
    Eas: "0xC2679fBD37d54388Ce493F1DB75320D236e1815e",
    SchemaRegistry: "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0",
    schemaId:
      "0xb10f39c07fd57a2f2946228747ec1652b2bceb3c8c479ba1702bd8d3f89ebc75",
  },
};
