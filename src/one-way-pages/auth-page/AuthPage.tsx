import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { CancelIcon } from '../../components/icons/cancel';

interface iAuthPage {
  waypoint?: string;
  spareWaypoint?: string;
  authHandler: (code: string) => void;
}

export const AuthPage = ({ waypoint = '/', authHandler }: iAuthPage) => {
  const moveTo = useNavigate();
  const [currentInput, setCurrentInput] = useState('');
  const timer = 30;

  const checkCode = (input: string) => {
    console.log('input', input);
    authHandler(input);
    moveTo(waypoint);
  };

  const handleDelete = () => {
    setCurrentInput((prev) => prev.slice(0, -1));
  };

  const handleNumberClick = (number: number) => {
    if (currentInput.length < 4) {
      setCurrentInput((prev) => prev + number);
    }
  };

  useEffect(() => {
    if (currentInput.length === 4) {
      checkCode(currentInput);
    }
  }, [currentInput]);

  return (
    <div className={'page one-way-page'}>
      <div className={styles.container}>
        <h1 className={styles.header}>Аутентификация</h1>
        <h2 className={styles.optionView}>Введите 4 цифры кода чтобы продолжить</h2>

        {/* Password squares */}
        <div className={styles.passwordSquares}>
          {[0, 1, 2, 3].map((index) => (
            <div key={index} className={styles.passwordSquare}>
              {currentInput[index] ? '•' : ''}
            </div>
          ))}
        </div>

        {/* Numpad */}
        <div className={styles.numpad}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
            <button key={number} className={styles.numpadButton} onClick={() => handleNumberClick(number)}>
              {number}
            </button>
          ))}
          <button className={styles.numpadButton} style={{ border: 'none' }} onClick={handleDelete}>
            <CancelIcon />
          </button>
          <button key={0} className={styles.numpadButton} onClick={() => handleNumberClick(0)}>
            {0}
          </button>
        </div>
        <div className={styles.bottomText} onClick={() => {}}>
          Повторно отправить код {timer}s
        </div>
      </div>
    </div>
  );
};
