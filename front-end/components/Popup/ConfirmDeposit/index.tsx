import React, { useContext, useState } from "react";
import { PopupContext } from "../../../contexts/popup";
import { SmartContractContext } from "../../../contexts/SmartContractProvider";
import { StakingStatusContext } from '../../../contexts/StakingStatusUpdate';
import styles from "./styles.module.scss";


type ConfirmDepositProps = {
  cryptoAsset: string;
}

const ConfirmDeposit = ({...props} : ConfirmDepositProps) => {
  const { setOpenedPopup } = useContext(PopupContext);

  const [ amountToDeposit, setAmountToDeposit ] = useState('');

  const { stakingWrapper: StakingRewards } = useContext(SmartContractContext);
  const { tokenWrapper: Token } = useContext(SmartContractContext);
  const { stakingStatusUpdated, setStakingStatusUpdated } = useContext(StakingStatusContext);

  const handleDeposit = () => {
        setOpenedPopup("Nenhum");
        StakingRewards?.stake(amountToDeposit)
        .then(() => {
          if(stakingStatusUpdated) {
            setStakingStatusUpdated(false);
          } else {
            setStakingStatusUpdated(true);
          }
        });
  };

  const fillMax = () => {
        Token?.balanceOf().then(value => {setAmountToDeposit((Number(value)/1e18).toString())});
  };

  return (
    <div className={styles.warning}>
      <div className={styles.closeWrapper}>
        <span>deposit</span>
        <img
          src="/images/close.svg"
          alt="Close"
          onClick={() => setOpenedPopup("Nenhum")}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          <span>How many tokens you want to deposit?</span>
        </div>
        <input 
          type="text" 
          value ={amountToDeposit}
          onChange={(e) => setAmountToDeposit(e.target.value)}
          placeholder="Token amount">
          </input>
          <div className={styles.maxerText} onClick={fillMax}>
                MAX
          </div>
        <div className={styles.buttonContainer}>
          <div className={styles.button} onClick={handleDeposit}>Confirm deposit</div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeposit;
