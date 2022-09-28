import StakingWrapper from "../../blockchain/StakingWrapper";
import { createContext, useEffect, useState, useContext } from "react";
import { Web3ModalContext } from "../Web3ModalProvider";

interface StakingContext {
    stakingWrapper: StakingWrapper | null;
}

export const StakingContext = createContext<StakingContext>({
    stakingWrapper: null
});

const StakingProvider = ({ children }) => {

    const { web3, chainId, account } = useContext(Web3ModalContext);
    const [ stakingWrapper, setStakingWrapper ] = useState<StakingWrapper | null>(null);

    useEffect(() => {
        if (web3 && chainId && account) {
            try{
                const _stakingWrapper = new StakingWrapper(web3, chainId, account);
                setStakingWrapper(_stakingWrapper);
            } catch (error) {
                console.log(error);
            }
        } else {
            setStakingWrapper(null);
        }
    }, [web3, chainId, account]);

    return(
        <StakingContext.Provider value={{ stakingWrapper }}>
            {children}
        </StakingContext.Provider>
        );
        
}

export default StakingProvider;