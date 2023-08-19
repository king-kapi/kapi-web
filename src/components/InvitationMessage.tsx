import { useContext, useEffect, useState } from "react";
import styles from "@/src/styles/InvitationMessage.module.css";

export default function InvitationMessage() {
  const [message, setMessage] = useState("");


  useEffect(() => {
    // setContent({ ...content, message: message });
  }, [message]);

  return (
    <div className={styles.InvitationMessageContainer}>
      <div className={styles.GameSelectContainer}>
        <h1 className={styles.Header}>Lets find a gaming buddy for you</h1>
        <h3 className={styles.SubHeader}>
          We want to ask you a few questions to find people based on your preferences.
        </h3>
        <h2 className={styles.Question}>3. Edit Invitation Message? (Optional)</h2>
      </div>
      <textarea
        className={[styles.TextBox, "bg-mediumGrey placeholder-textColor"].join(" ")}
        onChange={e => setMessage(e.target.value)}
        placeholder="Hi ____, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      ></textarea>
    </div>
  );
}
