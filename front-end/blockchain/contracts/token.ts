import Contract from './Contract';
import Artifacts from './XRC20Token.json';

class Token extends Contract {
    constructor(options, address) {
        super(options, "Token" , Artifacts["abi"], address);
    }
}

export default Token;