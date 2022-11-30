import { useState } from "react";
import { getProfiles } from "../helper/lens/lens";

const useLensProfile = (address) => {
    const [lensProfile, setLensProfile] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('Fetching profile from lens');

    const getOwnedProfiles = async () => {
        setIsLoading(true);
        try {
            const userProfile = await getProfiles({
                "ownedBy": [address],
                "limit": 1
            });
            if (userProfile) {
                console.log("Lens profiles", userProfile);
                setLensProfile(userProfile?.data?.profiles?.items[0]);
                // await updatePluginLens('wallet', address, userProfile?.data?.profiles?.items[0]);
            }
        } catch (error) {
        }
        setIsLoading(false);
    }


    return {
        lensProfile: lensProfile,
        getOwnedProfiles: getOwnedProfiles
    }
}
export default useLensProfile;