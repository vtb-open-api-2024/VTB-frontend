/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { Card, Currency, CurrencyEnum } from '../../types';
import { useEffect, useRef, useState } from 'react';
import { ChooseWallet } from './choose-wallet/ChooseWallet';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { toggleChooseWallet } from '../../redux/walletsSlice';
import { BackArrowIcon } from '../../components/icons/backArrowIcon';

interface iExchangePage {
  waypoint?: string;
  spareWaypoint?: string;
  confirmExchange: () => void;
}

export const ExchangePage = ({ confirmExchange, spareWaypoint = '/home' }: iExchangePage) => {
  const moveTo = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const choosenWallet = useSelector((state: RootState) => state.wallets.choosenWallet);
  const chooseWalletOpened = useSelector((state: RootState) => state.wallets.chooseWalletOpened);

  const [CardcurrentIndex, setCardCurrentIndex] = useState(0);
  const [CurcurrentIndex, setCurCurrentIndex] = useState(0);
  const [currencyAmmount, setCurrencyAmmount] = useState(0);
  const [rubAmmount, setRubAmount] = useState(0);

  const [isOk, setIsOk] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const cards: Card[] = [
    {
      id: 'dummy',
      cardHolderName: undefined,
      CardName: undefined,
      cardNumber: '2002200220022002',
      cardExpiryDate: undefined,
      balance: 10000,
    },
    {
      id: 'dummy2',
      cardHolderName: undefined,
      CardName: undefined,
      cardNumber: '200220022002222',
      cardExpiryDate: undefined,
      balance: 10500,
    },
  ]; // fetch cards from API or local storage

  const currencies: Currency[] = [
    { currency: CurrencyEnum.BTC, cource: 0.000015 },
    { currency: CurrencyEnum.ETC, cource: 0.0055 },
  ]; // fetch currencies from API or local storage

  //   slider for cards handlers
  const cardTohandleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const cardTohandleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = event.touches[0].clientX;
  };

  const cardTohandleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 150) {
      // Swipe left
      setCardCurrentIndex((prevIndex) => (prevIndex < cards.length - 1 ? prevIndex + 1 : 0));
    } else if (touchEndX.current - touchStartX.current > 150) {
      // Swipe right
      setCardCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : cards.length - 1));
    }
  };
  //   slider for currencies handlers
  const CurTohandleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const CurTohandleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = event.touches[0].clientX;
  };

  const CurTohandleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 150) {
      // Swipe left
      setCurCurrentIndex((prevIndex) => (prevIndex < currencies.length - 1 ? prevIndex + 1 : 0));
    } else if (touchEndX.current - touchStartX.current > 150) {
      // Swipe right
      setCurCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : cards.length - 1));
    }
  };

  const rubInputFieldChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    const rubValue = parseFloat(value);

    if (!isNaN(rubValue)) {
      setRubAmount(rubValue);
      setCurrencyAmmount(rubValue * currencies[CurcurrentIndex].cource);
    } else {
      setRubAmount(0);
      setCurrencyAmmount(0);
    }
  };

  const currencyInputFieldChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    const currencyValue = parseFloat(value);

    if (!isNaN(currencyValue)) {
      setCurrencyAmmount(currencyValue);
      setRubAmount(currencyValue / currencies[CurcurrentIndex].cource);
    } else {
      setCurrencyAmmount(0);
      setRubAmount(0);
    }
  };

  useEffect(() => {
    setCurrencyAmmount(rubAmmount * currencies[CurcurrentIndex].cource);
  }, [CurcurrentIndex]);

  useEffect(() => {
    setIsOk(
      () => rubAmmount <= cards[CardcurrentIndex].balance && rubAmmount > 0 && cards[CardcurrentIndex].balance > 0,
    );
  }, [rubAmmount]);

  useEffect(() => {
    setIsOk(
      () => rubAmmount <= cards[CardcurrentIndex].balance && rubAmmount > 0 && cards[CardcurrentIndex].balance > 0,
    );
  }, [CardcurrentIndex]);

  function openChooseWallet() {
    dispatch(toggleChooseWallet(true));
  }

  return (
    <div className={'page ' + styles.container}>
      <div className={styles.header}>
        <button onClick={() => moveTo(spareWaypoint)}>
          <BackArrowIcon />
        </button>
        Обмен
      </div>
      {chooseWalletOpened && <ChooseWallet />}
      {/* slider for curr to exchange */}
      <div>
        <button className={styles.exhange_title_wallet} onClick={openChooseWallet}>
          {choosenWallet.name} V
        </button>
      </div>
      <div className={styles.exhange_title}>Вы отдаете: </div>
      <div
        className={styles.Slider}
        onTouchStart={cardTohandleTouchStart}
        onTouchMove={cardTohandleTouchMove}
        onTouchEnd={cardTohandleTouchEnd}
        draggable="false"
      >
        <div
          className={styles.SliderWrapper}
          style={{ transform: `translateX(-${CardcurrentIndex * 100}%)` }}
          draggable="false"
        >
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          {choosenWallet.currensies.map((currency, _id) => (
            <div className={styles.cardWrapper + ' ' + styles.currencyCard}>
              <div className={styles.CurrencyInfoWrapper}>
                <h1 className={styles.cardName}>{currency.currency.currency}</h1>
                <h2 className={styles.cardHolder}>
                  {currency.currency.currency === CurrencyEnum.BTC ? 'Bitcoin' : 'Ethereum'}
                </h2>
              </div>
              <p className={styles.curCource} style={{ fontSize: '20px' }}>
                {currency.currency.cource.toFixed(6) + ' ₽'}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.inputWrapper}>
        <input type="number" placeholder="0" value={rubAmmount.toFixed(2)} onChange={rubInputFieldChange} />
      </div>
      {/* slider for currencies */}
      <div className={styles.exhange_title}>Вы получите</div>
      <div
        className={styles.Slider}
        onTouchStart={CurTohandleTouchStart}
        onTouchMove={CurTohandleTouchMove}
        onTouchEnd={CurTohandleTouchEnd}
      >
        <div className={styles.SliderWrapper} style={{ transform: `translateX(-${CurcurrentIndex * 100}%)` }}>
          {currencies.map((currency) => (
            <div className={styles.cardWrapper + ' ' + styles.currencyCard}>
              <div className={styles.CurrencyInfoWrapper}>
                <h1 className={styles.cardName}>{currency.currency}</h1>
                <h2 className={styles.cardHolder}>{currency.currency === CurrencyEnum.BTC ? 'Bitcoin' : 'Ethereum'}</h2>
              </div>
              <p className={styles.curCource} style={{ fontSize: '20px' }}>
                {currency.cource.toFixed(6) + ' ₽'}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* input for ammount */}
      <div className={styles.inputWrapper}>
        <input type="number" value={currencyAmmount.toFixed(6)} onChange={currencyInputFieldChange} />
      </div>
      <button disabled={!isOk} className={styles.buyBtn + ' button '} onClick={() => isOk && confirmExchange}>
        Купить
      </button>
    </div>
  );
};
