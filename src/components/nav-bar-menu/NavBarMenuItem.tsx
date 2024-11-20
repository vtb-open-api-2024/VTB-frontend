import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface iNavBarMenuItem {
  icon: string;
  label: string;
  waypoint: string;
}

export const NavBarMenuItemCMP = ({ icon, label, waypoint }: iNavBarMenuItem) => {
  const moveTo = useNavigate();

  return (
    <button
      onClick={() => {
        if (waypoint === '/send') return;
        moveTo(waypoint);
      }}
      className={styles.navBtnContainer}
    >
      <div className={styles.iconContainer}>
        <img src={icon} />
      </div>
      <p className={styles.NavBtnLabel}>{label}</p>
    </button>
  );
};
