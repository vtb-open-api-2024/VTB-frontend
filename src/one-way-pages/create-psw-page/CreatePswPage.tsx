import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { CancelIcon } from '../../components/icons/cancel';

interface iCreatePswPage {
  waypoint?: string;
  spareWaypoint?: string;
}

export const CreatePswPage = ({ waypoint = '/' }: iCreatePswPage) => {
  const [pwd, setPwd] = useState('');
  const [currentInput, setCurrentInput] = useState('');
  const [message, setMessage] = useState('Придумайте пароль');
  const moveTo = useNavigate();

  const handleDelete = () => {
    setCurrentInput((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (currentInput.length !== 4) {
      return;
    }

    if (pwd.length === 0) {
      setPwd(currentInput);
      setMessage('Введите пароль еще раз');
      setCurrentInput('');
    } else {
      if (pwd !== currentInput) {
        setMessage('Пароли не совпадают. Попробуйте еще раз');
        setCurrentInput('');
        return;
      } else {
        localStorage.setItem('password', pwd);
        moveTo(waypoint);
      }
    }
  };

  const handleNumberClick = (number: number) => {
    if (currentInput.length < 4) {
      setCurrentInput((prev) => prev + number);
    }
  };

  useEffect(() => {
    console.log('currentInput: ', currentInput);
    if (currentInput.length === 4) {
      handleSubmit();
    }
  }, [currentInput]);

  return (
    <div className={'page one-way-page'}>
      <div className={styles.container}>
        <div className={styles.numpadWrapper}>
          <h2 className={styles.optionView}>{message}</h2>
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

          <div
            className={styles.bottomText}
            onClick={() => {
              setMessage('Придумайте пароль');
              setPwd(() => '');
              setCurrentInput(() => '');
              console.log('retried');
            }}
          >
            Retry
          </div>
        </div>
      </div>
    </div>
  );
};
