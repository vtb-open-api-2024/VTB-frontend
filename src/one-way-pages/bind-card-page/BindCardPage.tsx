import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { CancelIcon } from '../../components/icons/cancel';
import { useState } from 'react';

interface iLogInPage {
  waypoint?: string;
  spareWaypoint?: string;
}

export const BindCardPage = ({ waypoint = '/', spareWaypoint = '/' }: iLogInPage) => {
  const moveTo = useNavigate();
  const [cardNumber, setCardNumber] = useState('');

  const cardInputFormHandler = () => {
    // Logic for handling form submission goes here
    moveTo(waypoint);
  };

  const handleBackspace = () => {
    // Remove spaces and dashes
    const currentInput = cardNumber.replace(/[\s-]/g, '');

    // Remove the last character
    const newInput = currentInput.slice(0, -1);

    // Format the new input
    const formatted = newInput.replace(/(.{4})/g, '$1 - ').trim(); // Format as "XXXX - XXXX - XXXX - XXXX"

    // Update the state with the formatted card number
    setCardNumber(formatted);
  };

  const updateCardNumber = (digit: string) => {
    // Remove spaces and dashes, then add the new digit
    const currentInput = cardNumber.replace(/[\s-]/g, ''); // Remove spaces and dashes
    const newInput = currentInput + digit;

    if (newInput.length <= 16) {
      // Format the new input
      const formatted = newInput.replace(/(?=.{5})(.{4})/g, '$1 - '); // Format as "XXXX - XXXX - XXXX - XXXX"
      setCardNumber(formatted);
    }
  };

  return (
    <div className={'page one-way-page'}>
      <div className={styles.container}>
        <h1 className={styles.header}>Привяжите карту</h1>
        <input
          type="text"
          value={cardNumber}
          readOnly
          placeholder="XXXX - XXXX - XXXX - XXXX"
          className={styles.cardInput} // Add appropriate styles
        />
        <button type="submit" onClick={() => cardInputFormHandler()} className={styles.button + ' button'}>
          Привязать карту
        </button>
        {/* Numpad */}
        <div className={styles.numpad}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
            <button key={number} className={styles.numpadButton} onClick={() => updateCardNumber(number.toString())}>
              {number}
            </button>
          ))}
          <button className={styles.numpadButton} style={{ border: 'none' }} onClick={handleBackspace}>
            <CancelIcon />
          </button>
          <button key={0} className={styles.numpadButton} onClick={() => updateCardNumber('0')}>
            {0}
          </button>
        </div>

        <div
          onClick={() => {
            moveTo(spareWaypoint);
          }}
          className={styles.bottomText}
        >
          вернуться
        </div>
      </div>
    </div>
  );
};
