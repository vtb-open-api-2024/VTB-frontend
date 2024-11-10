import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import styles from './styles.module.css';

interface iPopUp {
  closePopup: (newState: boolean) => void;
  popupHandler: () => void;
}

export const PopUpCMP = ({ closePopup, popupHandler }: iPopUp) => {
  const popUpData = useSelector((state: RootState) => state.popup.data);

  function nextHandler() {
    popupHandler();
  }

  // const [firstWord, ...remainingWords] = popUpData.msg.split(" ");

  const firstSpaceIndex = popUpData.msg.indexOf(' ');
  const firstWord = popUpData.msg.slice(0, firstSpaceIndex) + ' ';
  const remainingWords = popUpData.msg.slice(firstSpaceIndex + 1);

  return (
    <div className={`${styles.container} ${popUpData.type === 'invite' && styles.invite_container}`}>
      <h2 className={`${styles.title} ${popUpData.type === 'invite' && styles.title_invite}`}>
        <span>{firstWord}</span>
        {remainingWords}
      </h2>
      <img className={styles.image} src={popUpData.img} alt="" />
      <p className={`${styles.description} ${popUpData.type === 'invite' && styles.invite_container_desc}`}>
        {popUpData.desc}
      </p>
      <button className={'button'} onClick={nextHandler}>
        {popUpData.buttonText}
      </button>
      {popUpData.minibuttonText && <button className={styles.minibutton}>{popUpData.minibuttonText}</button>}

      <div onClick={() => closePopup(false)} className={styles.bottomText}>
        не нужно
      </div>
    </div>
  );
};
