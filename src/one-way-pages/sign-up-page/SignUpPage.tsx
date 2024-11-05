import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { useState } from 'react';

interface iSignUpPage {
  waypoint: string | undefined;
  spareWaypoint: string | undefined;
  signInHandler: (number: string) => void;
}

export const SignUpPage = ({ waypoint = '/', signInHandler }: iSignUpPage) => {
  const moveTo = useNavigate();
  const [number, setNumber] = useState('');

  const SignUpFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('number: ', number);
    signInHandler('+7 ' + number);
    moveTo(waypoint);
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
          <button type="submit" className={styles.button + ' button'}>
            Получить код
          </button>
        </form>
      </div>
    </div>
  );
};
