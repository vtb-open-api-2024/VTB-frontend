/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { HistoryElement } from './history-element/HistoryElement';
import { BackArrowIcon } from '../../components/icons/backArrowIcon';
import { Transaction } from '../../types';
import { mockTransactionSecond, mockTransactionFirst, mockTransactionThird } from '../../mockData';

interface iHistory {
  handleReturnToMainPage: () => void;
}

export const History = ({ handleReturnToMainPage }: iHistory) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [history, setHistory] = useState<Transaction[]>([]);

  useEffect(() => {
    setHistory([mockTransactionFirst, mockTransactionFirst, mockTransactionSecond, mockTransactionThird]);
  }, []);

  useEffect(() => {
    if (history.length)
      console.log(new Date(history[1].transactionDate).getTime() > new Date(history[2].transactionDate).getTime());
  }, [history]);

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={handleReturnToMainPage}>
          <BackArrowIcon />
        </button>
        История транзакций
      </div>
      <ul className={styles.history_dates}>
        {history.map((operation, index) =>
          index >= 1 ? (
            new Date(history[index].transactionDate).getTime() <
            new Date(history[index - 1].transactionDate).getTime() ? (
              <div>
                <div className={styles.operation__date}>{formatDate(new Date(history[index].transactionDate))}</div>
                <HistoryElement operation={operation} />
              </div>
            ) : (
              <div>
                <HistoryElement operation={operation} />
              </div>
            )
          ) : (
            <div>
              <div className={styles.operation__date}>{formatDate(new Date(history[index].transactionDate))}</div>
              <HistoryElement operation={operation} />
            </div>
          ),
        )}
      </ul>
    </div>
  );
};
