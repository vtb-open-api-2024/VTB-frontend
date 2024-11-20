import styles from './styles.module.css';

interface iHeaderCMP {
  burgerHandle: () => void;
}

export const HeaderCMP = ({ burgerHandle }: iHeaderCMP) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Главная</h1>
      <button className={styles.burger} onClick={burgerHandle}>
        <div className={styles.line1}></div>
        <div className={styles.line2}></div>
        <div className={styles.line3}></div>
      </button>
    </div>
  );
};
