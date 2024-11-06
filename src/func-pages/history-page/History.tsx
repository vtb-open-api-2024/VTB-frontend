import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { HistoryElement } from './history-element/HistoryElement';

export const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory([])
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>История транзакций</h1>
      <ul className={styles.history_dates}>
        {history.map((_date, _index) => (
          <HistoryElement />
        ))}
      </ul>
    </div>
  );
};
