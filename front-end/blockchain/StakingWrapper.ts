import Web3 from 'web3';
import StakingRewards from './contracts/staking';
import { stakingAddress } from './constants';

export default class StakingWrapper {
    web3: Web3;
    chainId: number;
    account: string;
    wrapperOptions: any;
    Contract: StakingRewards;

    constructor(web3, chainId, account, options = {}) {

        this.web3 = web3;
        this.chainId = chainId;
        this.account = account;

        this.wrapperOptions = {
            web3, chainId, account, ...options
        }
        this.Contract = new StakingRewards(this.wrapperOptions, stakingAddress.StakingRewards[this.chainId]);
    }

        // @dev important info
    // earned -> How many tokens are available for claiming
    // rewardRate -> RewardForDuration (uint256) / RewardsDuration (seconds)

    async exit() {
        try {
            await this.Contract.send("exit", {from: this.account});
            } catch (error) {
            throw error;
        }
    }

    async getReward() {
        try {
            await this.Contract.send("getReward", {from: this.account});
        } catch (error) {
            throw error;
        }
    }

    async dailyRewardRate() : Promise<unknown> {
        try {
            const rewardRate = await this.Contract.call("rewardRate");
            return (Number(rewardRate) * 86400) / 1e18;
        } catch (error) {
            throw error;
        }
    }

    async totalStaked() : Promise<unknown> {
        try {
            const totalStaked = await this.Contract.call("totalSupply");
            return totalStaked;
        } catch (error) {
            throw error;
        }
    }

    async balanceOf() : Promise<unknown> {
        try {
            const balanceOf = await this.Contract.call("balanceOf", this.account);
            return balanceOf;
        } catch (error) {
            throw error;
        }
    }

    async earned() : Promise<unknown> {
        try {
            const earned = await this.Contract.call("earned", this.account);
            return earned;
        } catch (error) {
            throw error;
        }
    }

    async stake(value: string) {
        try {
            await this.Contract.send("stake", {from: this.account}, this.web3.utils.toWei(String(Number(value)), 'ether'));
        } catch (error) {
            throw error;
        }
    } 

}