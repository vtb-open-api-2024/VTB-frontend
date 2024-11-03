import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

interface iHeroPG {
  waypoint: string | undefined;

  spareWaypoint: string | undefined;
}

export const HeroPG = ({ waypoint = "/", spareWaypoint = "/" }: iHeroPG) => {
  const moveTo = useNavigate();

  return (
    <div className={"page one-way-page hero-page"}>
      <h1 className={styles.header}>
        <span>Получите</span> доступ к криптовалютам
      </h1>
      <p className={styles.paragraph}>
        Перемещайте BTC, ETH, USDT и более 30 других токенов между вашим
        кошельком и <span>ВТБ</span>
      </p>
      <button
        onClick={() => moveTo(waypoint)}
        className={"button " + styles.herobutton}
      >
        Создать кошелек
      </button>
      <div
        onClick={() => {
          moveTo(spareWaypoint);
        }}
        className={styles.bottomText}
      >
        Добавить кошелек
      </div>
    </div>
  );
};
