import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { HistoryElement } from './history-element/HistoryElement';

export const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>История транзакций</h1>
      <ul className={styles.history_dates}>
        {history.map((date, index) => (
          <HistoryElement />
        ))}
      </ul>
    </div>
  );
};
