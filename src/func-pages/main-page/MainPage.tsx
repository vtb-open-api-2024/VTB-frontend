import { HeaderCMP } from '../../components/header/Header';
import { NavBarMenuCMP } from '../../components/nav-bar-menu/NavBarMenu';
import { WalletWiewCMP } from '../../components/wallet-view/WalletView';
import styles from './styles.module.css';

export const MainPage = () => {
  return (
    <div className={styles.container + ' ' + 'page'}>
      <HeaderCMP />
      <WalletWiewCMP />
      <div className={styles.navBarWrapper}>
        <NavBarMenuCMP />
      </div>
    </div>
  );
};
