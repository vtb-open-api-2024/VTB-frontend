import { useEffect, useRef, useState } from 'react';
import { HeaderCMP } from '../../components/header/Header';
import { NavBarMenuCMP } from '../../components/nav-bar-menu/NavBarMenu';
import { WalletWiewCMP } from '../../components/wallet-view/WalletView';
import styles from './styles.module.css';
import { PopUpCMP } from '../../components/pop-up/PopUp';
import { Wallet } from '../../types';

interface iMainPage {
  wallets: Wallet[]
}

export const MainPage = ({wallets}: iMainPage) => {
  const [isCardBindPopUpOpen, setIsCBPopUpOpen] = useState(false);
  const [isFriendInvitePopUpOpen, setIsFIPopUpOpen] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);

  const [popUpData, setPopUpData] = useState({
    waypoint: '',
    msg: '',
    desc: '',
    img: '',
  });

  const handleCBPopUpOpen = () => {
    setIsCBPopUpOpen(true);
  };

  const handleFIPopUpOpen = () => {
    setIsFIPopUpOpen(true);
  };

  const toggleCardBindPopup = () => {
    const isBind = localStorage.getItem('isCardBound');
    if (isBind) {
      return;
    } else {
      setPopUpData({
        waypoint: '/bind-card',
        msg: 'Привяжите карту',
        desc: 'Привяжите карту банка чтобы иметь возможность совершать покупки на бирже',
        img: '../../assets/creditCard.png',
      });
      setTimeout(() => {
        handleCBPopUpOpen();
      }, 1500);
    }
  };

  const toggleInviteFriendPopup = () => {
    const isInvited = localStorage.getItem('isInvited');
    const isBind = localStorage.getItem('isCardBound');
    if (isBind && !isInvited) {
      setPopUpData({
        waypoint: '/share-app',
        msg: 'Поздравляем с первой сделкой',
        desc: 'Рекомендуйте приложение друзьям!',
        img: '../../assets/..png',
      });
      setTimeout(() => {
        handleFIPopUpOpen();
      }, 1500);
      localStorage.setItem('isInvited', 'true');
    } else {
      return;
    }
  };

  useEffect(() => {
    toggleCardBindPopup();
    toggleInviteFriendPopup();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsCBPopUpOpen(false); // Закрываем попап, если клик был вне его
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsCBPopUpOpen]);

  return (
    <div className={styles.container + ' ' + 'page'}>
      <HeaderCMP />
      <WalletWiewCMP wallets={wallets} />
      <div className={styles.navBarWrapper}>
        <NavBarMenuCMP />
      </div>
      <div
        ref={popupRef}
        className={styles.popUp + ' ' + (isCardBindPopUpOpen ? styles.popUpVisible : styles.popUpHidden)}
      >
        <PopUpCMP
          msg={popUpData.msg}
          waypoint={popUpData.waypoint}
          desc={popUpData.desc}
          img="https://www.vtb.ru/media-files/vtb.ru/sitepages/personal/karty/kreditnye/Vozmozhnostey_1x.png"
          setPopupState={setIsCBPopUpOpen}
        />
      </div>

      <div className={styles.popUp + ' ' + (isFriendInvitePopUpOpen ? styles.popUpVisible : styles.popUpHidden)}>
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
