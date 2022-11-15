import React, { useContext } from "react";
import { PopupContext } from "../../../contexts/popup";
import { BlockchainContext } from "../../../contexts/BlockchainProvider";
import { StakingStatusContext } from '../../../contexts/StakingStatusUpdate';
import styles from "./styles.module.scss";

type ClaimProps = {
  myRewards: string;
  cryptoAsset: string;
}

const ConfirmClaim = ({...props} : ClaimProps) => {
  const { setOpenedPopup } = useContext(PopupContext);
  const { stakingWrapper: StakingRewards } = useContext(BlockchainContext);
  const { stakingStatusUpdated, setStakingStatusUpdated } = useContext(StakingStatusContext);

  const handleClaim = () => {
        setOpenedPopup("Nenhum");
        StakingRewards?.getReward()
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
        <span>claim</span>
        <img
          src="/images/close.svg"
          alt="Close"
          onClick={() => setOpenedPopup("Nenhum")}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          <span>
            you are sure you want to claim <span>{props.myRewards}</span> tokens?
          </span>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.button} onClick={handleClaim}>Confirm claim</div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmClaim;
