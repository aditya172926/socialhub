import { createContext } from "react";

export const AuthContext = createContext({
    signer: null,
    address: "",
    user: null,
    userLens: null,
    setUserLens: (param) => {},
    connectWallet: () => {}
});

export default AuthContext;