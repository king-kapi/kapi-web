import styles from "@/styles/HonorOfConduct.module.css";
import { useState } from "react";
import Button from "./Button";

const HonorOfConduct = () => {
  const [agreed, setAgreed] = useState(false);
  const [clickedNext, setClickedNext] = useState(false);
  return (
    <div className={[styles.honorOfConduct, "theme-blue"].join(" ")}>
      <h1 className={styles.header}>Honor of Conduct</h1>
      <p className={styles.body}>
        We want to ensure the safety of others when using this feature. We do not tolerate any form
        of discrimination, hate speech, and or other acts of malicious intent.
      </p>
      <p className={styles.body}>
        Please understand that certain features are restricted to adults (18+) to ensure the safety
        of minors.
      </p>
      <p className={styles.body}>
        To protect our community, we must ask you to sign a code of conduct promising us and the
        community that you will treat others with respect.
      </p>
      <label
        className={styles.checkbox}
        onChange={() => {
          setAgreed(!agreed);
        }}
      >
        <span
          className={[styles.Box, "border-solid border border-textColor"].join(" ")}
          style={{ backgroundColor: agreed ? "#d9d9d9" : "" }}
        ></span>
        <input type="checkbox" />I acknowledge and agree to abide by honor of conduct.
      </label>
      <div className={!agreed && clickedNext ? styles.showWarning : styles.hideWarning}>
        Please acknowledge the honor of conduct to use these features!
      </div>
      <div onClick={() => setClickedNext(true)}>
        <Button
          buttonType={!agreed ? "secondary" : "primary"}
          className={[styles.Next, !agreed ? "z-10" : "display-none z-0"].join(" ")}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export { HonorOfConduct };
