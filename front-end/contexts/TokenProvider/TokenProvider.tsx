import TokenWrapper from "../../blockchain/TokenWrapper";
import FaucetWrapper from "../../blockchain/FaucetWrapper";
import { createContext, useEffect, useState, useContext } from "react";
import { Web3ModalContext } from "../Web3ModalProvider";

interface TokenContext {
    tokenWrapper: TokenWrapper | null;
    faucetWrapper: FaucetWrapper | null;
}

export const TokenContext = createContext<TokenContext>({
    tokenWrapper: null,
    faucetWrapper: null
});

const TokenProvider = ({ children }) => {

    const { web3, chainId, account } = useContext(Web3ModalContext);
    const [tokenWrapper, setTokenWrapper] = useState<TokenWrapper | null>(null);
    const [faucetWrapper, setFaucetWrapper] = useState<FaucetWrapper | null>(null);

    useEffect(() => {
        if (web3 && chainId && account) {
          try {
            const _tokenWrapper = new TokenWrapper(web3, chainId, account);
            const _faucetWrapper = new FaucetWrapper(web3, chainId, account);
            setTokenWrapper(_tokenWrapper);
            setFaucetWrapper(_faucetWrapper);
            } catch (error) {
                console.log(error);
                }
        }
        else {
            setTokenWrapper(null);
            setFaucetWrapper(null);
        }
    } , [web3, chainId, account]);

    return (
        <TokenContext.Provider value={{ tokenWrapper, faucetWrapper }}>
            {children}
        </TokenContext.Provider>
    );
}

export default TokenProvider;