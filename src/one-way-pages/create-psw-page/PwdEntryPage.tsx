import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { CancelIcon } from "../../components/icons/cancel";

interface iPwdEntryPage {
  waypoint?: string;
  spareWaypoint?: string;
}

export const PwdEntryPage = ({ waypoint = "/" }: iPwdEntryPage) => {
  const moveTo = useNavigate();
  const [currentInput, setCurrentInput] = useState("");
  const [message, setMessage] = useState("Введите пароль, чтобы продолжить");

  const checkPswd = (input: string) => {
    const password = localStorage.getItem("password");
    if (password == input) {
      moveTo(waypoint);
    } else {
      setMessage("Пароль неверен. Попробуйте еще раз");
      setCurrentInput("");
      return;
    }
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
      checkPswd(currentInput);
    }
  }, [currentInput]);

  return (
    <div className={"page one-way-page"}>
      <div className={styles.container}>
        <h1 className={styles.header}>Войти</h1>
        <div className={styles.numpadWrapper}>
          <h2 className={styles.optionView}>{message}</h2>

          {/* Password squares */}
          <div className={styles.passwordSquares}>
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className={styles.passwordSquare}>
                {currentInput[index] ? "•" : ""}
              </div>
            ))}
          </div>

          {/* Numpad */}
          <div className={styles.numpad}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
              <button
                key={number}
                className={styles.numpadButton}
                onClick={() => handleNumberClick(number)}
              >
                {number}
              </button>
            ))}
            <button
              className={styles.numpadButton}
              style={{ border: "none" }}
              onClick={handleDelete}
            >
              <CancelIcon />
            </button>
            <button
              key={0}
              className={styles.numpadButton}
              onClick={() => handleNumberClick(0)}
            >
              {0}
            </button>
          </div>
          <div
            className={styles.bottomText}
            onClick={() => {
              alert("recreate it for now");
              moveTo("/log-in");
            }}
          >
            Забыли пароль?
          </div>
        </div>
      </div>
    </div>
  );
};
