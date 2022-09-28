import TokenWrapper from "../../blockchain/TokenWrapper";
import { createContext, useEffect, useState, useContext } from "react";
import { Web3ModalContext } from "../Web3ModalProvider";

interface TokenContext {
    tokenWrapper: TokenWrapper | null;
}

export const TokenContext = createContext<TokenContext>({
    tokenWrapper: null
});

const TokenProvider = ({ children }) => {

    const { web3, chainId, account } = useContext(Web3ModalContext);
    const [tokenWrapper, setTokenWrapper] = useState<TokenWrapper | null>(null);

    useEffect(() => {
        if (web3 && chainId && account) {
          try {
            const _tokenWrapper = new TokenWrapper(web3, chainId, account);
            setTokenWrapper(_tokenWrapper);
            } catch (error) {
                console.log(error);
                }
        }
        else {
            setTokenWrapper(null);
        }
    } , [web3, chainId, account]);

    return (
        <TokenContext.Provider value={{ tokenWrapper }}>
            {children}
        </TokenContext.Provider>
    );
}

export default TokenProvider;