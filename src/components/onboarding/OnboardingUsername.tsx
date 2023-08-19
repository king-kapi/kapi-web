import styles from "@/src/styles/onboarding/OnboardingUsername.module.css";
import Image from "next/image";
import sparkleKapi from "@/assets/images/sparkle_kapi.svg";
import Input from "@/src/components/Input";
import KapiListbox from "@/src/components/KapiListbox";
import Pronouns from "@/src/enums/Pronouns";
import { useAtom } from "jotai";
import onboardingUserDataAtom from "@/src/atoms/onboardingUserDataAtom";

export default function OnboardingUsername() {
  const [userData, setUserData] = useAtom(onboardingUserDataAtom);

  return (
    <div className={styles.OnboardingUsernameContainer}>
      <h1>Let's learn who you are.</h1>
      <h3>This is how others will identify you on the platform.</h3>

      <h3 className={"mt-14"}>What are your pronouns?</h3>
      <KapiListbox placeholder={"Pronouns"}
                   className={"mt-6"}
                   options={[
                     { text: "He/Him", value: Pronouns.HE_HIM },
                     { text: "She/Her", value: Pronouns.SHE_HER },
                     { text: "They/Them", value: Pronouns.THEY_THEM }
                   ]}
                   onChange={pronouns => {
                     setUserData({
                       ...userData,
                       pronouns: pronouns as Pronouns
                     });
                   }} />

      <div className={`${styles.InputContainer} flex mt-8 items-end`}>
        <div className={"flex-grow"}>
          <h3 className={"mt-8"}>Create your username</h3>

          <Input className={"mt-6"} placeholder={"KingK@pi"} onChange={e => {
            setUserData({
              ...userData,
              username: e.currentTarget.value
            });
          }} />
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
