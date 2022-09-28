import React, { useContext } from "react";
import { PopupContext } from "../../contexts/popup";
import ConfirmClaim from "./Claim";
import ConfirmDeposit from "./ConfirmDeposit";
import ConfirmWithdraw from "./ConfirmWithdraw";
import styles from "./styles.module.scss";

const Popup: React.FC = () => {
  const { openedPopup, rewards, asset, setOpenedPopup } = useContext(PopupContext);

  return (
    <>
      {openedPopup !== "Nenhum" && (
        <div className={styles.container}>
          <div
            className={styles.background}
            onClick={() => setOpenedPopup("Nenhum")}
          />
          {openedPopup === "ConfirmDeposit" && <ConfirmDeposit cryptoAsset={asset} />}
          {openedPopup === "ConfirmWithdraw" && <ConfirmWithdraw cryptoAsset={asset} />}
          {openedPopup === "ConfirmClaim" && <ConfirmClaim myRewards={rewards} cryptoAsset={asset} />}
        </div>
      )}
    </>
  );
};

export default Popup;
