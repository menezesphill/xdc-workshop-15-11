import type { AppProps } from "next/app";
import TokenProvider from "../contexts/TokenProvider";
import StakingProvider from "../contexts/StakingProvider";
import StakingStatusProvider from "../contexts/StakingStatusUpdate";
import PopupProvider from "../contexts/popup";
import Web3ModalProvider from "../contexts/Web3ModalProvider";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {

  return (
      <BlockchainProviders>
        <PopupProvider>
          <StakingStatusProvider>
          <Component {...pageProps} />
          </StakingStatusProvider>
        </PopupProvider>
      </BlockchainProviders>
  );

}

const BlockchainProviders = (props: any) => {
  return (
    <Web3ModalProvider>
      <TokenProvider>
        <StakingProvider>
          {props.children}
        </StakingProvider>
      </TokenProvider>
    </Web3ModalProvider>
  )
}

export default MyApp;
