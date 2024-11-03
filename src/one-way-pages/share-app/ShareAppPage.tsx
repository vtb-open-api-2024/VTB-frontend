import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

interface iShareAppPG {
  waypoint: string | undefined;
}

export const ShareAppPG = ({ waypoint = "/" }: iShareAppPG) => {
  const moveTo = useNavigate();

  return (
    <div className={"page one-way-page"}>
      <h1 className={styles.header}>
        <span>Поделитесь</span> приложением с друзьями
      </h1>
      <img
        className={styles.qrCode}
        src="/vtb-hack-2024/public/qrCode.svg"
        alt=""
      />
      <p className={styles.paragraph}>
        И получите возможность обмениваться и дарить валюту
        <span> друг с другом</span>
      </p>
      <button
        onClick={() => moveTo(waypoint)}
        className={"button " + styles.herobutton}
      >
        Вернуться на главную
      </button>
    </div>
  );
};
