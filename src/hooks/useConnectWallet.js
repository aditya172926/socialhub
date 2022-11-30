import { ethers } from "ethers";

const useConnectWallet = () => {

    const connectWallet = async () => {
        try {
            const { ethereum } = window;
            if (!ethereum) {
                alert("Get MetaMask!");
                return;
            }
            const accounts = await ethereum.request({
                method: "eth_requestAccounts"
            });
            console.log("Connected", accounts[0]);
            const chainId = await window.ethereum.request({ method: "eth_chainId" });
            if (chainId != "0x5") {
                await changeNetwork("0x5");
            }
            console.log(chainId);
        } catch (error) {
            console.log(error);
        }
    };

    const changeNetwork = async (chainId) => {
        // switching to Goreli network, if network not added to wallet then adding it
        try {
            console.log("Chainging network...");
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: chainId }]
            });
            console.log("Network changed...");
        } catch (switchError) {
            console.log("Adding network...");
            await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [{
                    chainId: "0x5",
                    rpcUrls: ["https://goerli.infura.io/v3/"],
                    chainName: "Goerli Test Network",
                    nativeCurrency: {
                        name: "GoerliETH",
                        symbol: "GoerliETH",
                        decimals: 18
                    },
                    blockExplorerUrls: ["https://goerli.etherscan.io"]
                }]
            });
            console.log("Network added");
        }
    }

    return {
        connectWallet: connectWallet
    }
}
export default useConnectWallet;