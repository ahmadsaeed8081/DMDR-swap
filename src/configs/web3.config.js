import { http, createConfig } from 'wagmi'
import { mainnet, polygon } from 'wagmi/chains'
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { createClient } from 'viem'


const projectId = process.env.REACT_APP_WC_PROJECT_ID;
const metadata = {  
    name: "DMDR App",
    description: "",
    url: "https://buy.diamondreserve.xyz/",
    icons: ["https://buy.diamondreserve.xyz/"]
};

export const config = defaultWagmiConfig({
    chains: process.env.REACT_APP_ENV == "production" ? [mainnet] : [polygon],
    projectId,
    metadata
});

createWeb3Modal({
    wagmiConfig: config,
    projectId
});