import { HeaderCMP } from '../../components/header/Header';
import { NavBarMenuCMP } from '../../components/nav-bar-menu/NavBarMenu';
import { WalletWiewCMP } from '../../components/wallet-view/WalletView';
import styles from './styles.module.css';

interface iMainPage {
  burgerHandle: () => void;
}

export const MainPage = ({ burgerHandle }: iMainPage) => {
  return (
    <div className={styles.container + ' ' + 'page'}>
      <HeaderCMP burgerHandle={burgerHandle} />
      <WalletWiewCMP />
      <div className={styles.navBarWrapper}>
        <NavBarMenuCMP />
      </div>
    </div>
  );
};
