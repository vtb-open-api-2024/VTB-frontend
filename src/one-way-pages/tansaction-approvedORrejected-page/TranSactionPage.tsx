import styles from './styles.module.css';
import { TransactionApprovedIcon } from '../../components/icons/TransactionApprovedIcon copy';
import { TransactionDenyIcon } from '../../components/icons/TransactionDenyIcon';
import { RubleIcon } from './currencyIcons/rubleIcon';
import { BtcIcon } from './currencyIcons/btcIcon';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { setSignInError } from '../../redux/authSlice';
import { EtcIcon } from './currencyIcons/etcIcon';

interface iHeroPG {
  transactionHandle: () => void;
}

export const TransActionPage = ({ transactionHandle }: iHeroPG) => {
  // store для хранения информации о транзакции
  const dispatch = useDispatch<AppDispatch>();
  const { ammountBtc, ammountEtc, ammountRub } = useSelector((state: RootState) => state.wallets.lastTransaction);
  dispatch(setSignInError(false));

  const transactionInfo = {
    transactionId: 'T1234567890',
    sellitem: 'RUB',
    sellAmmount: ammountRub,
    buyItem: ammountBtc != 0 ? 'BTC' : 'ETC',
    buyAmmount: ammountBtc != 0 ? ammountBtc : ammountEtc,
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
          <p>-{transactionInfo.sellAmmount}</p>
        </div>
        <div className={styles.centerSide}>
          <div>{transactionInfo.status == 'approved' ? <TransactionApprovedIcon /> : <TransactionDenyIcon />}</div>
        </div>
        <div className={styles.rightSide}>
          {ammountBtc != 0 ? <BtcIcon /> : <EtcIcon />}
          <p>+ {transactionInfo.buyAmmount}</p>
        </div>
      </div>
      <button onClick={transactionHandle} className={'button ' + styles.herobutton}>
        Вернуться на главную
      </button>
    </div>
  );
};
