import styles from './styles.module.css';

export const HeaderCMP = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Главная</h1>
      <button className={styles.burger}>
        <div className={styles.line1}></div>
        <div className={styles.line2}></div>
        <div className={styles.line3}></div>
      </button>
    </div>
  );
};
