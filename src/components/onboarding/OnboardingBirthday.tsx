import {useMemo} from "react";
import styles from "@/src/styles/onboarding/OnboardingUsername.module.css";
import Image from "next/image";
import sparkleKapi from "@/assets/images/sparkle_kapi.svg";
import {Option} from "@/src/components/Select";
import KapiListbox from "@/src/components/forms/KapiListbox";
import {useAtom} from "jotai";
import onboardingUserDataAtom from "@/src/atoms/onboardingUserDataAtom";

const OnboardingBirthday = () => {
  const [userData, setUserData] = useAtom(onboardingUserDataAtom);

  const dayOptions = useMemo(() => {
    const options: Option[] = [];

    for (let i = 1; i <= 31; i++)
      options.push({
        text: `${i}`,
        value: `${i}`
      });

    return options;
  }, []);

  const yearOptions = useMemo(() => {
    const options: Option[] = [];

    for (let i = 1995; i <= 2010; i++)
      options.push({
        text: `${i}`,
        value: `${i}`
      });

    return options;
  }, []);

  return (
    <div className={styles.OnboardingUsernameContainer}>
      <h1 className={"mt-[2.5rem]"}>Let&apos;s learn who you are.</h1>
      <h3>What is your birthday?</h3>

      <h3 className={"mt-14"}>Date of Birth</h3>

      <div className={`${styles.InputContainer} flex mt-8 items-end gap-x-6`}>
        <KapiListbox
          name={"month"}
          className={"mt-6 w-[11.5rem]"} options={[
          {text: "January", value: "1"},
          {text: "February", value: "2"},
          {text: "March", value: "3"},
          {text: "April", value: "4"},
          {text: "May", value: "5"},
          {text: "June", value: "6"},
          {text: "July", value: "7"},
          {text: "August", value: "8"},
          {text: "September", value: "9"},
          {text: "October", value: "10"},
          {text: "November", value: "11"},
          {text: "December", value: "12"}
        ]}
          placeholder={"Month"}
          onChange={month => setUserData({
            ...userData,
            birthday: {
              day: userData.birthday?.day ?? 1,
              year: userData.birthday?.year ?? 2000,
              month: parseInt(month || "1")
            }
          })}/>

        <KapiListbox
          className={"mt-6 w-[8.125rem]"}
          name={"day"}
          options={dayOptions}
          placeholder={"Day"}
          onChange={day => setUserData({
            ...userData,
            birthday: {
              month: userData.birthday?.month ?? 1,
              year: userData.birthday?.year ?? 2000,
              day: parseInt(day || "1")
            }
          })}/>

        <KapiListbox
          className={"mt-6 w-[9.75rem]"}
          name={"year"}
          options={yearOptions}
          placeholder={"Year"}
          onChange={year => setUserData({
            ...userData,
            birthday: {
              month: userData.birthday?.month ?? 1,
              year: parseInt(year || "1"),
              day: userData.birthday?.day ?? 1
            }
          })}
        />

        <Image className={styles.Avatar} src={sparkleKapi} alt={"Sparkle Kapi"}/>
      </div>
    </div>
  );
};

export default OnboardingBirthday;