
// To create these wrappers we need:
// Contract Application Binary Interfaces ( From JSON artifacts )
// Contract Addresses ( We can use Truffle Networks )

import StakingWrapper from "../blockchain/StakingWrapper";
import TokenWrapper from "../blockchain/TokenWrapper";

import { createContext, useEffect, useState, useContext } from "react";
import { Web3ModalContext } from "./Web3ModalProvider";

interface SmartContractContext {
    stakingWrapper: StakingWrapper | null;
    tokenWrapper: TokenWrapper | null;
}

export const SmartContractContext = createContext<SmartContractContext>({
    stakingWrapper: null,
    tokenWrapper: null,
});

const SmartContractProvider = ({ children }) => {

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
        <SmartContractContext.Provider value={{ stakingWrapper, tokenWrapper }}>
            {children}
        </SmartContractContext.Provider>
        );
        
}

export default SmartContractProvider;