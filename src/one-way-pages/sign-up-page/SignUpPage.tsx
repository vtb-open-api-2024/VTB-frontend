import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';

interface iSignUpPage {
  signInHandler: (number: string) => void;
}

export const SignUpPage = ({ signInHandler }: iSignUpPage) => {
  const [number, setNumber] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const signInError = useSelector((state: RootState) => state.auth.signInError);

  const SignUpFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInHandler('+7 ' + number);
  };

  const formatPhoneNumber = (value: string) => {
    const number = value.replace(/[^0-9]/g, '');

    // формат номера (xxx) xxx xx xx
    const digits = number.replace(/\D/g, '').slice(0, 10);
    let res = '';

    if (digits.length) res = `${digits.slice(0, 3)}`;
    if (digits.length >= 4) res = `(${res}) ${digits.slice(3, 6)}`;
    if (digits.length >= 7) res += ` ${digits.slice(6, 8)}`;
    if (digits.length >= 9) res += ` ${digits.slice(8, 10)}`;

    return res;
  };

  function handleInput(event: React.FormEvent<HTMLInputElement>) {
    const formatted = formatPhoneNumber(event.currentTarget.value);
    setNumber(formatted);
  }

  return (
    <div className={'page one-way-page'}>
      <div className={styles.container}>
        <h1 className={styles.header}>Войти в кошелек</h1>
        <form onSubmit={SignUpFormHandler} className={styles.signUpWrapper}>
          <div className={styles.phoneWrapper}>
            <span className={`${styles.input_prefix} ${number.length && styles.input_prefix_edited}`}>+7</span>
            <input
              type="tel"
              placeholder=" (___) ___ __ __"
              value={number}
              onChange={handleInput}
              className={styles.phoneInput}
            />
          </div>
          <button type="submit" className={styles.button + ' button'} disabled={number.length !== 15}>
            Получить код
          </button>
          {signInError ? (
            <span className={`${styles.labelSubmit} ${signInError ? styles.errorClass : ''}`}>Ошибка отправки СМС</span>
          ) : (
            ''
          )}
        </form>
      </div>
    </div>
  );
};
