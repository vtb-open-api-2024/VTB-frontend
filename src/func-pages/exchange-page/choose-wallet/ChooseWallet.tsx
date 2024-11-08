import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import styles from './styles.module.css';
import { setChoosenWallet, toggleChooseWallet } from '../../../redux/walletsSlice';
import { Wallet } from '../../../types';

export const ChooseWallet = () => {
  const dispatch = useDispatch<AppDispatch>();
  const wallets = useSelector((state: RootState) => state.wallets.wallets);
  const choosenWallet = useSelector((state: RootState) => state.wallets.choosenWallet);

  function handleChooseWallet(wallet: Wallet) {
    dispatch(setChoosenWallet(wallet));
  }

  function closeChooseWallet() {
    dispatch(toggleChooseWallet(false));
  }

  return (
    <div className={styles.choose_wallets_container}>
      <div className={styles.choose_wallets_title}>
        <button onClick={closeChooseWallet}>{'<'}</button>
        <div>Выбор кошелька</div>
      </div>
      <div>
        <ul className={styles.choose_wallets_list}>
          {wallets.map((wallet, _i) => (
            <li
              className={styles.choose_wallets_list_item}
              onClick={() => {
                handleChooseWallet(wallet);
              }}
            >
              <div
                className={`${styles.walletInfoWrapper} ${wallet.id === choosenWallet.id && styles.walletInfoWrapper_choosen}`}
              >
                <h2>{wallet.name}</h2>
                <h3>{wallet.currensies[0].ammount.toFixed(2)} ₽</h3>
                <div className={styles.additionalInfo}>
                  <p>0,00₽ &bull; 0,00%</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
