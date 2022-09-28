import { createContext, Dispatch, SetStateAction, useState } from "react";

interface StakingStatusContext {
    stakingStatusUpdated: boolean;
    setStakingStatusUpdated: Dispatch<SetStateAction<boolean>>;
}

export const StakingStatusContext = createContext({} as StakingStatusContext);

const StakingStatusProvider = ({ children }) => {
    
        const [stakingStatusUpdated, setStakingStatusUpdated] = useState(false);
    
        return (
            <StakingStatusContext.Provider value={{ stakingStatusUpdated, setStakingStatusUpdated }}>
                {children}
            </StakingStatusContext.Provider>
        );
    }

export default StakingStatusProvider;