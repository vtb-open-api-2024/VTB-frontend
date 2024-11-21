import { Transaction } from '../../../types';
import styles from './styles.module.css';

interface iHistoryElement {
  operation: Transaction;
}

export const HistoryElement = ({ operation }: iHistoryElement) => {
  const transactionType = operation.transactionType === 'INCOME';
  return (
    <li className={styles.history_element_container}>
      <div className={styles.history_element_wrapper}>
        <div className={styles.transaction__image}></div>
        <div className={styles.transaction__info}>
          <span className={styles.transaction__type}>{transactionType ? 'Пополнение' : 'Списание'}</span>
          <span className={styles.transaction__resource}>{operation.type === 'CARD' ? 'Карта' : 'Кошелек'}</span>
        </div>
      </div>
      <div className={`${styles.amount} ${transactionType ? styles.amount_income : styles.amount_outcome}`}>
        {operation.amount}
      </div>
    </li>
  );
};
