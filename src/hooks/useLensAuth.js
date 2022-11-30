import { ethers } from "ethers";
import { useContext, useState } from "react";
import AuthContext from "../context/auth";
import { authenticate_user, generateChallenge } from "../helper/lens/lens";
import useLensProfile from "./useLensProfile";

let ethersProvider
if (window.ethereum) {
    ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
}

const signText = (text) => {
    console.log("Signing the message");
    return ethersProvider.getSigner().signMessage(text);
}

const useLensAuth = () => {

    const authContext = useContext(AuthContext);

    const hookLensProfile = useLensProfile(authContext.address);

    const [token, setToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [lensHandle, setLensHandle] = useState(null);
    const [loadingText, setLoadingText] = useState('Fetching lens profile');
    const [signButtonText, setSignButtonText] = useState("Sign-In with Lens");


    const fetchLensToken = async () => {
        console.log("signerAddress", authContext.address);
        if (hookLensProfile.lensProfile?.lensData) {
            try {
                const challenge = await generateChallenge(authContext.address);
                const signature = await signText(challenge);
                // const authRequest = await authenticate_user(signerAddress, signature);
                console.log("Got signature");

                authenticate_user(authContext.address, signature).then(data => {
                    // console.log('Lens Tokens', data);
                    setToken(data['accessToken']);
                    localStorage.setItem('accessToken', data['accessToken']);
                    setRefreshToken(data['refreshToken']);
                    authContext.setUserLens({
                        profile: hookLensProfile?.lensProfile,
                        accessToken: data['accessToken'],
                        refreshToken: data['refreshToken']
                    })
                });
            } catch (error) {
                console.log("Couldn't Sign request");
                console.log(error);
                setSignButtonText("Couldn't sign request");
            }
        } else {
            console.log("Couldn't find any Lens profile with this address");
        }
        // setIsLoading(false);
    }

    const updateLensState = async () => {
        await hookLensProfile.getOwnedProfiles();
        authContext.setUserLens({
            ...authContext.userLens,
            profile: hookLensProfile?.lensProfile
        })
    }

    return {
        fetchLensToken: fetchLensToken,
        updateLensState: updateLensState
    }
}

export default useLensAuth;