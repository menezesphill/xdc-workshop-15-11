import { useRouter } from "next/router";
import React, { useEffect, useState, useContext, useCallback } from "react";
import { Web3ModalContext } from "../../contexts/Web3ModalProvider";
import { TokenContext } from "../../contexts/TokenProvider";
import styles from "./styles.module.scss";

const Header: React.FC = () => {
  const router = useRouter();
  const [windowSize, setWindowSize] = useState(0);
  const { connect, disconnect, account } = useContext(Web3ModalContext);
  const { faucetWrapper } = useContext(TokenContext);

  function ellipseAddress(address: string = "", width: number = 2): string {
    return `${address.slice(0, width + 2)}...${address.slice(-width)}`;
  }

  const handleFaucet = () => {
    if (faucetWrapper) {
      faucetWrapper.claimTokens()
      .then( () => alert("Tokens claimed!") )
      .catch( (err) => alert("Error:" + err) );
    }
  }

  const handleConnectWallet = useCallback(() => {
    connect();
  }, [connect]);

  const handleDisconnectWallet = useCallback(() => {
    disconnect();
  }, [disconnect]);

  useEffect(() => {
    const checkbox = document.getElementById("checkbox") as HTMLInputElement;

    window.addEventListener("resize", (event) => {
      setWindowSize(window.innerWidth);
    });

    if (windowSize > 800 && checkbox) {
      resetMenu();
      checkbox.checked = false;
    }
  }, [windowSize]);

  const toggleMenu = (checkboxValue: boolean) => {
    if (checkboxValue === true) {
      showMenu();
    } else {
      resetMenu();
    }
  };

  const showMenu = () => {
    const firstLine = document.getElementById("firstLine");
    const secondLine = document.getElementById("secondLine");
    const thirdLine = document.getElementById("thirdLine");

    const navbar = document.getElementById("navbar");
    const headerContainer = document.getElementById("headerContainer");

    const mobile = document.getElementById("mobile");

    if (
      firstLine &&
      secondLine &&
      thirdLine &&
      navbar &&
      headerContainer &&
      mobile
    ) {
      document.getElementsByTagName("body")[0].style.overflow = "visible";
      firstLine.style.transform = "rotate(45deg)";
      firstLine.style.top = "8px";

      secondLine.style.transform = "rotate(135deg)";

      thirdLine.style.display = "none";

      navbar.style.width = "100%";
      headerContainer.style.height = "100vh";
      headerContainer.style.alignItems = "flex-start";
      mobile.style.display = "flex";

      setTimeout(() => {
        navbar.style.position = "fixed";
      }, 500);
    }
  };

  const resetMenu = () => {
    const firstLine = document.getElementById("firstLine");
    const secondLine = document.getElementById("secondLine");
    const thirdLine = document.getElementById("thirdLine");

    const navbar = document.getElementById("navbar");
    const headerContainer = document.getElementById("headerContainer");

    const mobile = document.getElementById("mobile");

    if (
      firstLine &&
      secondLine &&
      thirdLine &&
      navbar &&
      headerContainer &&
      mobile
    ) {
      document.getElementsByTagName("body")[0].style.overflow = "visible";
      firstLine.style.transform = "rotate(0deg)";
      firstLine.style.top = "0";

      secondLine.style.transform = "rotate(0)";

      setTimeout(() => {
        thirdLine.style.display = "block";
      }, 400);

      headerContainer.style.height = "100px";
      headerContainer.style.alignItems = "center";

      navbar.style.position = "relative";

      mobile.style.display = "none";
    }
  };

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
            <div className={styles.checkboxMenu}>
              <input
                type="checkbox"
                id="checkbox"
                onChange={(e) => toggleMenu(e.target.checked)}
              />
            </div>
            <label className={styles.hamburguer} htmlFor="checkbox">
              <span id="firstLine" />
              <span id="secondLine" />
              <span id="thirdLine" />
            </label>
            <div className={styles.button} onClick={handleFaucet}>
                Drop Me MTK
            </div>
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
