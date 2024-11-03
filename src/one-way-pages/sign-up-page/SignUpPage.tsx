import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { useState } from "react";

interface iSignUpPage {
  waypoint: string | undefined;
  spareWaypoint: string | undefined;
}

export const SignUpPage = ({
  waypoint = "/",
  spareWaypoint = "/",
}: iSignUpPage) => {
  const moveTo = useNavigate();
  const [number, setNumber] = useState("");

  const SignUpFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("number: ", number);
    // Your logic for handling the login form submission goes here
    moveTo(waypoint);
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, "");

    // If the cleaned number is empty, return an empty string
    if (cleaned.length === 0) return "";

    // Limit to 11 digits
    const limited = cleaned.substring(0, 11); // Only take the first 11 digits

    // If there are digits, ensure the first digit is 8
    const firstDigit = "8";
    const remainingDigits = limited.substring(1);

    // Format the cleaned number
    const areaCode = remainingDigits.substring(0, 3); // Next 3 digits
    const centralOfficeCode = remainingDigits.substring(3, 6); // Next 3 digits
    const line1 = remainingDigits.substring(6, 8); // Next 2 digits
    const line2 = remainingDigits.substring(8, 10); // Last 2 digits

    const formattedNumber = [
      firstDigit,
      areaCode ? `(${areaCode})` : "", // Area code in parentheses
      centralOfficeCode,
      line1,
      line2,
    ]
      .filter(Boolean)
      .join(" ")
      .trim(); // Join only non-empty parts

    return formattedNumber.trim();
  };

  return (
    <div className={"page one-way-page"}>
      <div className={styles.container}>
        <h1 className={styles.header}>Регистрация</h1>
        <form onSubmit={SignUpFormHandler} className={styles.signUpWrapper}>
          <input
            type="text"
            className={styles.UserNameInput}
            placeholder="UserName"
            required
            autoFocus
          />
          <br />
          <div className={styles.phoneWrapper}>
            <input
              onChange={(e) => {
                const inputValue = e.target.value;
                const formattedNumber = formatPhoneNumber(inputValue);
                setNumber(formattedNumber);
              }}
              id="phone"
              className={styles.phoneInput}
              type="tel"
              autoComplete="true"
              required
              maxLength={18} // Adjusted for the formatted length
              placeholder="8 (___) ___ __ __"
              value={number}
            />
          </div>
          <button type="submit" className={styles.button + " button"}>
            Получить код
          </button>
          <br />
          <div
            onClick={() => {
              moveTo(spareWaypoint);
            }}
            className={styles.bottomText}
          >
            Войти
          </div>
        </form>
      </div>
    </div>
  );
};
