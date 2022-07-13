const NetworkInfo = Object();

NetworkInfo.eth_url = process.env.REACT_APP_eth_url;
NetworkInfo.eth_scan = process.env.REACT_APP_eth_scan;
NetworkInfo.eth_chainId = parseInt(process.env.REACT_APP_eth_chainId);
NetworkInfo.eth_DFM = process.env.REACT_APP_eth_DFM;
NetworkInfo.eth_bridge = process.env.REACT_APP_eth_bridge;
NetworkInfo.eth_network = process.env.REACT_APP_eth_network;
NetworkInfo.bsc_url = process.env.REACT_APP_bsc_url;
NetworkInfo.bsc_scan = process.env.REACT_APP_bsc_scan;
NetworkInfo.bsc_chainId = parseInt(process.env.REACT_APP_bsc_chainId);
NetworkInfo.bsc_DFM = process.env.REACT_APP_bsc_DFM;
NetworkInfo.bsc_bridge = process.env.REACT_APP_bsc_bridge;
NetworkInfo.bsc_network = process.env.REACT_APP_bsc_network;

export default NetworkInfo;