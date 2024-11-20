import { BackArrowIcon } from '../icons/backArrowIcon';
import styles from './styles.module.css';

interface iMenu {
  menuHandler: (path: string) => void;
  closeMenu: () => void;
}

export const Menu = ({ menuHandler, closeMenu }: iMenu) => {
  return (
    <div className={`${styles.container}`}>
      <button onClick={closeMenu} className={`${styles.menu__close}`}>
        <span>
          <BackArrowIcon />
        </span>
      </button>
      <ul className={`${styles.menu__list}`}>
        <li
          className={`${styles.menu__item}`}
          onClick={() => {
            menuHandler('bind');
          }}
        >
          Привязать карту
        </li>
        <li
          className={`${styles.menu__item}`}
          onClick={() => {
            menuHandler('buy');
          }}
        >
          Покупка
        </li>
        <li
          className={`${styles.menu__item}`}
          onClick={() => {
            menuHandler('exchange');
          }}
        >
          Обмен
        </li>
        <li
          className={`${styles.menu__item}`}
          onClick={() => {
            
          }}
        >
          Отправить
        </li>
        <li
          className={`${styles.menu__item}`}
          onClick={() => {
            menuHandler('receive');
          }}
        >
          Получить
        </li>
        <li
          className={`${styles.menu__item}`}
          onClick={() => {
            menuHandler('history');
          }}
        >
          История
        </li>
        <li
          className={`${styles.menu__item} ${styles.menu__exit}`}
          onClick={() => {
            menuHandler('logout');
          }}
        >
          Выход
        </li>
      </ul>
    </div>
  );
};
