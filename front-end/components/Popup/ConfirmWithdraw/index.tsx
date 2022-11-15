import React, { useContext } from "react";
import { PopupContext } from "../../../contexts/popup";
import { BlockchainContext } from "../../../contexts/BlockchainProvider";
import { StakingStatusContext } from '../../../contexts/StakingStatusUpdate';
import styles from "./styles.module.scss";

type ConfirmWithdrawProps = {
  cryptoAsset: string;
}

const ConfirmWithdraw = ({...props} : ConfirmWithdrawProps) => {
  const { balance, setOpenedPopup } = useContext(PopupContext);
  const { stakingWrapper: StakingRewards } = useContext(BlockchainContext);
  const { stakingStatusUpdated, setStakingStatusUpdated } = useContext(StakingStatusContext);

  const handleExit = () => {
        setOpenedPopup("Nenhum");
        StakingRewards?.exit()
        .then(() => {
          if(stakingStatusUpdated) {
            setStakingStatusUpdated(false);
          } else {
            setStakingStatusUpdated(true);
          }
        });
  };

  return (
    <div className={styles.warning}>
      <div className={styles.closeWrapper}>
        <span>withdraw</span>
        <img
          src="/images/close.svg"
          alt="Close"
          onClick={() => setOpenedPopup("Nenhum")}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          <span>
            You are sure you want to withdraw <span>{balance} </span>
            tokens?
          </span>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.button} onClick={handleExit}>Confirm withdraw</div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmWithdraw;
