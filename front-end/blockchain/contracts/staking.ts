import Contract from "./Contract";
import Artifacts from "./StakingRewards.json";

class StakingRewards extends Contract {
    constructor(options, address) {
        super(options, "StakingRewards", Artifacts.abi, address);
    }
}

export default StakingRewards;