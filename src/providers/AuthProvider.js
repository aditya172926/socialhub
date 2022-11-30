import { ethers } from "ethers";
import { useEffect, useState } from "react";
import AuthContext from "../context/auth";
import useConnectWallet from "../hooks/useConnectWallet";

let ethersProvider;
if (window.ethereum) {
    ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
}

export const AuthProvider = ({ children }) => {
    const [signer, setSigner] = useState();
    const [address, setAddress] = useState();
    const [user, setUser] = useState();
    const [userLens, setUserLens] = useState();
    const [provider, setProvider] = useState(undefined);

    const fetchSignAccount = async () => {
        try {
            setSigner(ethersProvider.getSigner());

            ethersProvider.getSigner().getAddress().then(data => {
                setAddress(data);
            });
        } catch (error) {
            console.log("Couldn't find provider", error);
        }
    }

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
            fetchSignAccount();
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

    useEffect(() => {
        console.log('User Lens in Auth Provider', userLens);
        // if (userLens?.profile?.id) {
        //     findOrCreateUser({ address: address, lensHandle: userLens?.profile?.handle, lensId: userLens?.profile?.id }).then(data => {
        //         console.log('Find or create user', data);
        //         setUser(data);
        //     })
        // }
    }, [userLens]);

    useEffect(() => {
        fetchSignAccount();
    }, [address]);

    return (
        <AuthContext.Provider
            value={{
                signer: signer,
                address: address,
                user: user,
                userLens: userLens,
                setUserLens: setUserLens,
                connectWallet: connectWallet
            }}>
            {children}
        </AuthContext.Provider>
    )





}