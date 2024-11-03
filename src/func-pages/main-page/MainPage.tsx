import { useEffect, useState } from "react";
import { HeaderCMP } from "../../components/header/Header";
import { NavBarMenuCMP } from "../../components/nav-bar-menu/NavBarMenu";
import { WalletWiewCMP } from "../../components/wallet-view/WalletView";
import styles from "./styles.module.css";
import { PopUpCMP } from "../../components/pop-up/PopUp";

export const MainPage = () => {
  const [isCardBindPopUpOpen, setIsCBPopUpOpen] = useState(false);
  const [isFriendInvitePopUpOpen, setIsFIPopUpOpen] = useState(false);

  const [popUpData, setPopUpData] = useState({
    waypoint: "",
    msg: "",
    desc: "",
    img: "",
  });

  const handleCBPopUpOpen = () => {
    setIsCBPopUpOpen(true);
  };

  const handleFIPopUpOpen = () => {
    setIsFIPopUpOpen(true);
  };

  const toggleCardBindPopup = () => {
    const isBind = localStorage.getItem("isCardBound");
    if (isBind) {
      return;
    } else {
      setPopUpData({
        waypoint: "/vtb-hack-2024/bind-card",
        msg: "Привяжите карту",
        desc: "Привяжите карту банка чтобы иметь возможность совершать покупки на бирже",
        img: "../../assets/creditCard.png",
      });
      setTimeout(() => {
        handleCBPopUpOpen();
      }, 1500);
    }
  };

  const toggleInviteFrriendPopup = () => {
    const isInvited = localStorage.getItem("isInvited");
    const isBind = localStorage.getItem("isCardBound");
    if (isBind && !isInvited) {
      setPopUpData({
        waypoint: "/vtb-hack-2024/share-app",
        msg: "Поздравляем с первой сделкой",
        desc: "Рекомендуйте приложение друзьям!",
        img: "../../assets/..png",
      });
      setTimeout(() => {
        handleFIPopUpOpen();
      }, 1500);
      localStorage.setItem("isIvited", "true");
    } else {
      return;
    }
  };

  useEffect(() => {
    toggleCardBindPopup();
    toggleInviteFrriendPopup();
  }, []);
  return (
    <div className={styles.container + " " + "page"}>
      <HeaderCMP />
      <WalletWiewCMP />
      <div className={styles.navBarWrapper}>
        <NavBarMenuCMP />
      </div>
      <div
        className={
          styles.popUp +
          " " +
          (isCardBindPopUpOpen ? styles.popUpVisible : styles.popUpHidden)
        }
      >
        <PopUpCMP
          msg={popUpData.msg}
          waypoint={popUpData.waypoint}
          desc={popUpData.desc}
          img="https://www.vtb.ru/media-files/vtb.ru/sitepages/personal/karty/kreditnye/Vozmozhnostey_1x.png"
          setPopupState={setIsCBPopUpOpen}
        />
      </div>

      <div
        className={
          styles.popUp +
          " " +
          (isFriendInvitePopUpOpen ? styles.popUpVisible : styles.popUpHidden)
        }
      >
        <PopUpCMP
          msg={popUpData.msg}
          waypoint={popUpData.waypoint}
          desc={popUpData.desc}
          img="https://www.vtb.ru/media-files/vtb.ru/sitepages/personal/karty/kreditnye/Vozmozhnostey_1x.png"
          setPopupState={setIsFIPopUpOpen}
        />
      </div>
    </div>
  );
};
