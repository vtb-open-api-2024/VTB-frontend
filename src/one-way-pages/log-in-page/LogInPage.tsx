import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

interface iLogInPage {
  waypoint: string | undefined;

  spareWaypoint: string | undefined;
}

export const LogInPage = ({
  waypoint = "/",
  spareWaypoint = "/",
}: iLogInPage) => {
  const moveTo = useNavigate();
  const logInFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logic for handling form submission goes here
    moveTo(waypoint);
  };

  return (
    <div className={"page one-way-page"}>
      <div className={styles.container}>
        <h1 className={styles.header}>Log In</h1>
        <form onSubmit={logInFormHandler} className={styles.phoneWrapper}>
          <span>+7</span>
          <input
            className={styles.phoneInput}
            type="tel"
            autoComplete="true"
            autoFocus
            pattern="[0-9]{3} [0-9]{3} [0-9]{2} [0-9]{2}"
            required
            maxLength={10}
            placeholder="...-...-..-.."
          />
          <button
            type="submit"
            onClick={() => moveTo(waypoint)}
            className={styles.button}
          >
            Send Code
          </button>
          <div
            onClick={() => {
              moveTo(spareWaypoint);
            }}
            className={styles.bottomText}
          >
            Sign Up
          </div>
        </form>
      </div>
    </div>
  );
};
