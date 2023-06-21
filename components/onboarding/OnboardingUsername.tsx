import { useContext, useState } from "react";
import styles from "../../styles/onboarding/OnboardingUsername.module.css";
import Image from "next/image";
import sparkleKapi from "@/assets/images/sparkle_kapi.svg";
import { OnboardingFormContext, OnBoardingFormContextType } from "@/pages/Onboarding";

export default function OnboardingUsername() {
  const { content, setContent } = useContext(OnboardingFormContext) as OnBoardingFormContextType;
  return (
    <div className={styles.OnboardingUsernameContainer}>
      <h1>Let's find a username for you.</h1>
      <h2>This is how others will identify you on the platform</h2>
      <h3>2. Create your username</h3>
      <div className={styles.InputContainer}>
        <input className={"bg-mediumGrey"} type="text" onChange={e => {
          setContent({
            ...content,
            username: e.currentTarget.value
          });
        }} />
        <Image className={styles.Avatar} src={sparkleKapi} alt={"Sparkle Kapi"} />
      </div>
      <ul className={styles.UsernameRequirements}>
        <li>Minimum 5 characters (numbers allowed)</li>
        <li>Avoid Special Characters !@#$%</li>
        <li>No Profanity or offensive language/words</li>
      </ul>
    </div>
  );
}
