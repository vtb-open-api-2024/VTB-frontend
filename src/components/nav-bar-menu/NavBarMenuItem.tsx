import styles from "./styles.module.css";

interface iNavBarMenuItem {
  icon: string;
  label: string;
  waypoint: string;
}

export const NavBarMenuItemCMP = ({
  icon,
  label,
  waypoint,
}: iNavBarMenuItem) => {
  return (
    <a href={waypoint} className={styles.navBtnContainer}>
      <div className={styles.iconContainer}>
        <img src={icon} />
      </div>
      <p className={styles.NavBtnLabel}>{label}</p>
    </a>
  );
};
