import Web3 from 'web3'
import NetworkInfo from '../DFMbridge/NetworkInfo';
import NodeWalletConnect from "@walletconnect/node";

export const web3_eth = new Web3(new Web3.providers.HttpProvider(NetworkInfo.eth_url));
export const web3_bsc = new Web3(new Web3.providers.HttpProvider(NetworkInfo.bsc_url));
export const connector = new NodeWalletConnect(
    {
        bridge :process.env.REACT_APP_WALLETCONNECT_BRIDGE
    },
    {
        clientMeta: {
            description: "WalletConnect NodeJS Client",
            url: "https://nodejs.org/en/",
            icons: ["https://nodejs.org/static/images/logo.svg"],
            name: "WalletConnect",
    },
});
