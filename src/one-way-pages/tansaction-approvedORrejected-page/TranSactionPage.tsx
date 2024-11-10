import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { TransactionApprovedIcon } from '../../components/icons/TransactionApprovedIcon copy';
import { TransactionDenyIcon } from '../../components/icons/TransactionDenyIcon';
import { RubleIcon } from './currencyIcons/rubleIcon';
import { BtcIcon } from './currencyIcons/btcIcon';

interface iHeroPG {
  waypoint: string | undefined;
}

export const TransActionPage = ({ waypoint = '/' }: iHeroPG) => {
  const moveTo = useNavigate();
  // store для хранения информации о транзакции

  const transactionInfo = {
    transactionId: 'T1234567890',
    sellitem: 'RUB',
    sellAmmount: 10000000,
    buyItem: 'BTC',
    buyAmmount: 2,
    status: 'approved',
    user: 'John Doe',
  };

  return (
    <div
      className={
        'page one-way-page ' +
        (transactionInfo.status == 'approved' ? styles.transactionPage : styles.transactionRejected)
      }
    >
      <h1 className={styles.header}>
        <span>{transactionInfo.status == 'approved' ? 'Транзакция одобрена' : 'Транзакция отклонена'}</span>
      </h1>
      <div className={styles.transactionInfo}>
        <div className={styles.leftSide}>
          <RubleIcon />
          <p>{transactionInfo.sellAmmount}</p>
        </div>
        <div className={styles.centerSide}>
          <div>{transactionInfo.status == 'approved' ? <TransactionApprovedIcon /> : <TransactionDenyIcon />}</div>
        </div>
        <div className={styles.rightSide}>
          <BtcIcon />
          <p>{transactionInfo.buyAmmount}</p>
        </div>
      </div>
      <button onClick={() => moveTo(waypoint)} className={'button ' + styles.herobutton}>
        Вернуться на главную
      </button>
    </div>
  );
};
