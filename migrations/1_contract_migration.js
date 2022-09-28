const XRC20Token = artifacts.require('XRC20Token');
const Staking = artifacts.require('StakingRewards');

const NAME = "MyToken";
const SYMBOL = "MTK";
const DECIMALS = 18;
const INITIAL_SUPPLY = 5000;

module.exports = function (deployer, network, accounts) {
    deployer
    .deploy(XRC20Token, NAME, SYMBOL, DECIMALS, INITIAL_SUPPLY)
    .then(() => deployer.deploy(Staking, accounts[0], accounts[0], XRC20Token.address, XRC20Token.address));
};