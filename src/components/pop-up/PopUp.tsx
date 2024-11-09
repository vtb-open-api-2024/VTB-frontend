import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface iPopUp {
  msg?: string;
  waypoint: string;
  desc?: string;
  img?: string;
  closePopup: (newState: boolean) => void;
  handleBindCard: () => void
}

export const PopUpCMP = ({ msg = 'msg', desc = 'desc', img, closePopup, handleBindCard }: iPopUp) => {
  const moveTo = useNavigate();

  function bindCardHandler() {
    handleBindCard()
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{msg}</h2>
      <img className={styles.image} src={img} alt="" />
      <p className={styles.description}>{desc}</p>
      <button
        className={'button'}
        onClick={bindCardHandler}
      >
        Продолжить
      </button>
      <button className={styles.minibutton}>
        Выпустить карту ВТБ
      </button>
      <div onClick={() => closePopup(false)} className={styles.bottomText}>
        не нужно
      </div>
    </div>
  );
};
