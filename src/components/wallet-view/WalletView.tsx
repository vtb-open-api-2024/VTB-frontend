import { useRef, useState } from 'react';
import styles from './styles.module.css';
import { BTCIcon } from '../icons/cryptocurency';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export const WalletWiewCMP = () => {
  const wallets = useSelector((state: RootState) => state.wallets.wallets);

  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 100) {
      // Swipe left
      setCurrentIndex((prevIndex) => (prevIndex < wallets.length - 1 ? prevIndex + 1 : 0));
    } else if (touchEndX.current - touchStartX.current > 100) {
      // Swipe right
      setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : wallets.length - 1));
    }
  };

  return (
    <div
      className={styles.walletViewWrapper}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.walletView} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {wallets.map((wallet) => (
          <div className={styles.walletItem} key={wallet.id}>
            <div className={styles.walletInfoWrapper}>
              <h2>{wallet.name}</h2>
              <h3>{wallet.currensies[0].ammount.toFixed(2)} ₽</h3>
              <div className={styles.additionalInfo}>
                <p>0,00₽ &bull; 0,00%</p>
              </div>
            </div>
            <div className={styles.currenciesTable}>
              <div className={styles.tableHeaders}>
                <h3>Криптовалюта</h3>
                <h3>Количество</h3>
              </div>
              {wallet.currensies.map((item, i) => (
                <div key={i} className={styles.currencyRow}>
                  <div className={styles.currensyInfoWrapper}>
                    <BTCIcon />
                    <div className={styles.currencyInfo}>
                      <h4>{item.currency.currency}</h4>
                      <p>{item.currency.cource}</p>
                    </div>
                  </div>
                  <div className={styles.currencyAmmountWrapper}>
                    <h4>{item.ammount.toFixed(2)}</h4>
                    <p>
                      <span>{(item.ammount * item.currency.cource).toFixed(2)}₽</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
