import Card from "./components/Card";

import { useContext, useEffect, useState } from "react";

import styles from "./styles.module.scss";

import { StakingContext } from "../../contexts/StakingProvider";
import { StakingStatusContext } from "../../contexts/StakingStatusUpdate";
import { Web3ModalContext } from "../../contexts/Web3ModalProvider";

const Content = () => {
  const { account, chainId, connected } = useContext(Web3ModalContext);

  const [active, setActive] = useState(false);

  const { stakingWrapper: StakingRewards } = useContext(StakingContext);

  const [stakedBalance, setStakedBalance] = useState("0");
  const [myBalance, setMyBalance] = useState("0");
  const [myRewards, setMyRewards] = useState("0");
  const [daily, setDaily] = useState("0");

  const { stakingStatusUpdated } = useContext(StakingStatusContext);

  useEffect(() => {
    if (!account) {
      return;
    }

    StakingRewards?.balanceOf().then((balance) => {
      if (Number(balance) > 0) {
        setActive(true);
        setMyBalance((Number(balance) / 1e18).toString());
      } else {
        setActive(false);
      }
    });

    StakingRewards?.totalStaked().then((res) => {
      setStakedBalance(`${Number(res) / 1e18}`);
    });

    StakingRewards?.dailyRewardRate().then((res) => {
      setDaily(Number(res).toFixed(2));
    });

    StakingRewards?.earned().then((res) => {
      setMyRewards((Number(res) / 1e18).toFixed(2));
    });
  }, [
    account,
    StakingRewards,
    chainId,
    active,
    myRewards,
    stakingStatusUpdated,
    myBalance,
    connected
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>TOKEN STAKING</h1>
        <div className={styles.cards}>
          <div className={styles.left}>
            <Card
              cryptoasset="MTK"
              myRewards={myRewards}
              totalStaked={myBalance}
              deposits={stakedBalance}
              daily={daily}
              totalRewards=" --"
              apr={ Number(stakedBalance) ? ((Number(daily) * 36500) / Number(stakedBalance)).toFixed() : "0"}
              isSet={active}
            />
          </div>
          <div className={styles.right}>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Content;
