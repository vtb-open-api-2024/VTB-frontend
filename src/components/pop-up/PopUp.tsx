import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface iPopUp {
  msg?: string;
  waypoint: string;
  desc?: string;
  img?: string;
  closePopup: (newState: boolean) => void;
}

export const PopUpCMP = ({ msg = 'msg', waypoint, desc = 'desc', img, closePopup }: iPopUp) => {
  const moveTo = useNavigate();
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{msg}</h2>
      <img src={img} alt="" />
      <p className={styles.description}>{desc}</p>
      <button
        className={'button'}
        onClick={() => {
          moveTo(waypoint);
        }}
      >
        Продолжить
      </button>
      <div onClick={() => closePopup(false)} className={styles.bottomText}>
        не нужно
      </div>
    </div>
  );
};
