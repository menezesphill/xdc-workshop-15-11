
// To create these wrappers we need:
// Contract Application Binary Interfaces ( From JSON artifacts )
// Contract Addresses ( We can use Truffle Networks )

import StakingWrapper from "../../blockchain/StakingWrapper";
import TokenWrapper from "../../blockchain/TokenWrapper"; 

import { createContext, useEffect, useState, useContext } from "react";
import { Web3ModalContext } from "./Web3ModalProvider";

interface BlockchainContext {
    stakingWrapper: StakingWrapper | null;
    tokenWrapper: TokenWrapper | null;
}

export const BlockchainContext = createContext<BlockchainContext>({
    stakingWrapper: null,
    tokenWrapper: null,
});

const BlockchainProvider = ({ children }) => {

    const { web3, chainId, account } = useContext(Web3ModalContext);
    const [ stakingWrapper, setStakingWrapper ] = useState<StakingWrapper | null>(null);
    const [ tokenWrapper, setTokenWrapper ] = useState<TokenWrapper | null>(null);

    useEffect(() => {
        if (web3 && chainId && account) {
            try{
                const _stakingWrapper = new StakingWrapper(web3, chainId, account);
                const _tokenWrapper = new TokenWrapper(web3, chainId, account);
                setStakingWrapper(_stakingWrapper);
                setTokenWrapper(_tokenWrapper);
            } catch (error) {
                console.log(error);
            }
        } else {
            setStakingWrapper(null);
        }
    }, [web3, chainId, account]);

    return(
        <BlockchainContext.Provider value={{ stakingWrapper, tokenWrapper }}>
            {children}
        </BlockchainContext.Provider>
        );
        
}

export default BlockchainProvider;