import { useRouter } from "next/router";
import React, { useEffect, useState, useContext, useCallback } from "react";
import { Web3ModalContext } from "../../contexts/Web3ModalProvider";
import styles from "./styles.module.scss";

const Header: React.FC = () => {
  const router = useRouter();
  const [windowSize, setWindowSize] = useState(0);
  const { connect, disconnect, account } = useContext(Web3ModalContext);

  function ellipseAddress(address: string = "", width: number = 2): string {
    return `${address.slice(0, width + 2)}...${address.slice(-width)}`;
  }

  const handleConnectWallet = useCallback(() => {
    connect();
  }, [connect]);

  const handleDisconnectWallet = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return (
    <nav className={styles.nav} id="navbar">
      <div className={styles.container} id="headerContainer">
        <div className={styles.desktop}>
          <div className={styles.left}>
            <div className={styles.menu}>
              <div
                className={styles.item}
                style={
                  router.pathname === "/staking"
                    ? { borderBottom: "2px solid white" }
                    : {}
                }
                onClick={() => {
                  router.push("/staking");
                }}
              >
                Staking
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <label className={styles.hamburguer} htmlFor="checkbox">
              <span id="firstLine" />
              <span id="secondLine" />
              <span id="thirdLine" />
            </label>
            {!account ? (
              <div className={styles.button} onClick={handleConnectWallet}>
                Connect
              </div>
            ) : (
              <div className={styles.button} onClick={handleDisconnectWallet}>{ellipseAddress(account)}</div>
            )}
          </div>
        </div>
        <div className={styles.mobile} id="mobile">
          <div className={styles.menu}>
            <div
              className={styles.item}
              style={
                router.pathname === "/staking"
                  ? { borderBottom: "2px solid white" }
                  : {}
              }
              onClick={() => {
                router.push("/staking");
              }}
            >
              Staking
            </div>
            <div className={styles.wallet}>
              {!account ? (
              <div className={styles.button} onClick={handleConnectWallet}>
                Connect
              </div>
            ) : (
              <div className={styles.button} onClick={handleDisconnectWallet}>{ellipseAddress(account)}</div>
            )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
