import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { CancelIcon } from '../../components/icons/cancel';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { confirmPassword, createPassword, resetPassword } from '../../redux/authSlice';

interface iPswPage {
  waypoint?: string;
  spareWaypoint?: string;
  handleCreatePassword: () => void;
}

export const CreatePswPage = ({ handleCreatePassword }: iPswPage) => {
  const dispatch = useDispatch<AppDispatch>();
  const passwordCreated = useSelector((state: RootState) => state.auth.passwordCreated);
  const passwordConfirmed = useSelector((state: RootState) => state.auth.passwordConfirmed);

  const [passwordInput, setPasswordInput] = useState('');
  const [message, setMessage] = useState('Придумайте пароль');

  const handleDelete = () => {
    setPasswordInput((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    // if password wasnt created, set it
    if (!passwordCreated) {
      dispatch(createPassword(passwordInput));
      setMessage('Подтвердите пароль');
      setPasswordInput('');
    }
    // if password was created, try to confirm it
    // dispatch is asynchronous so we need useEffect to do something in its creation
    else {
      dispatch(confirmPassword(passwordInput));
    }
  };

  useEffect(() => {
    if (passwordConfirmed) {
      handleCreatePassword();
    } else if (passwordConfirmed !== null) {
      setMessage('Неправильный пароль!');
      setPasswordInput('');
    }
  }, [passwordConfirmed]);

  const handleNumberClick = (number: number) => {
    if (passwordInput.length < 4) {
      setPasswordInput((prev) => prev + number);
    }
  };

  useEffect(() => {
    if (passwordInput.length === 4) {
      handleSubmit();
    }
  }, [passwordInput]);

  function handleForgotPassword() {
    setMessage('Придумайте пароль');
    setPasswordInput(() => '');
    dispatch(resetPassword());
  }

  return (
    <div className={'page one-way-page'}>
      <div className={styles.container}>
        <div className={styles.numpadWrapper}>
          <h1 className={styles.header}></h1>
          <h2 className={styles.optionView}>{message}</h2>
          {/* Password squares */}
          <div className={styles.passwordSquares}>
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className={styles.passwordSquare}>
                {passwordInput[index] ? '•' : ''}
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

          <div className={styles.bottomText} onClick={handleForgotPassword}>
            Retry
          </div>
        </div>
      </div>
    </div>
  );
};
