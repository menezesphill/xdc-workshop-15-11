import { createContext, Dispatch, SetStateAction, useState } from "react";

interface PopupContextType {
  openedPopup: string;
  rewards: string;
  asset: string;
  balance: string;
  setOpenedPopup: Dispatch<SetStateAction<string>>;
  setRewards: Dispatch<SetStateAction<string>>;
  setAsset: Dispatch<SetStateAction<string>>;
  setBalance: Dispatch<SetStateAction<string>>;
}

export const PopupContext = createContext({} as PopupContextType);

const PopupProvider = ({ children }) => {

  const [openedPopup, setOpenedPopup] = useState("Nenhum");
  const [rewards, setRewards] = useState("");
  const [asset, setAsset] = useState("");
  const [balance, setBalance] = useState("");

  return (
    <PopupContext.Provider value={{ rewards, asset, openedPopup, balance, setOpenedPopup, setRewards, setAsset, setBalance }}>
      {children}
    </PopupContext.Provider>
  );
}

export default PopupProvider;