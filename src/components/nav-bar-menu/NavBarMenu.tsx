import { NavBarMenuItemCMP } from './NavBarMenuItem';
import styles from './styles.module.css';
import dbIcon from '/assets/icons/navbar/db.svg';
import sendIcon from '/assets/icons/navbar/send.svg';
import receiveIcon from '/assets/icons/navbar/receive.svg';
import creditCardIcon from '/assets/icons/navbar/creditCard.svg';
import exchangeIcon from '/assets/icons/navbar/exchange.svg';

export const NavBarMenuCMP = () => {
  const buttons = [
    { label: 'Покупка', path: '/buy', icon: creditCardIcon },
    { label: 'Обмен', path: '/exchange', icon: exchangeIcon },
    { label: 'Отправить', path: '/send', icon: sendIcon },
    { label: 'Получить', path: '/receive', icon: receiveIcon },
    { label: 'История', path: '/history', icon: dbIcon },
  ];

  return (
    <nav className={styles.navBarMenu}>
      {buttons.map((b, i) => {
        return <NavBarMenuItemCMP waypoint={b.path} icon={b.icon} label={b.label} key={i} />;
      })}
    </nav>
  );
};
