import { useContext, useState } from "react";
import styles from "../../styles/onboarding/OnboardingUsername.module.css";
import Image from "next/image";
import sparkleKapi from "@/assets/images/sparkle_kapi.svg";
import { OnboardingFormContext, OnBoardingFormContextType } from "@/pages/Onboarding";
import Select from "@/components/Select";
import Input from "@/components/Input";

export default function OnboardingUsername() {
  const { content, setContent } = useContext(OnboardingFormContext) as OnBoardingFormContextType;
  return (
    <div className={styles.OnboardingUsernameContainer}>
      <h1>Let's learn who you are.</h1>
      <h3>This is how others will identify you on the platform.</h3>

      <h3 className={"mt-14"}>What are your pronouns?</h3>
      <Select className={"mt-6"} options={[
        { text: "He/Him", value: "he-him" },
        { text: "She/Her", value: "she-her" },
        { text: "They/Them", value: "they-them" }
      ]} />

      <div className={`${styles.InputContainer} flex mt-8 items-end`}>
        <div className={"flex-grow"}>
          <h3 className={"mt-8"}>Create your username</h3>

          <Input className={"mt-6"} placeholder={"KingK@pi"} />
        </div>
        <div className={"flex-shrink"}>
          <Image className={styles.Avatar} src={sparkleKapi} alt={"Sparkle Kapi"} />
        </div>
      </div>
      <ul className={`${styles.UsernameRequirements} mb-24`}>
        <li>Minimum 5 characters (numbers allowed)</li>
        <li>Avoid Special Characters !@#$%</li>
        <li>No Profanity or offensive language/words</li>
      </ul>
    </div>
  );
}
