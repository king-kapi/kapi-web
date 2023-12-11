"use client"

import styles from "@/src/styles/onboarding/Onboarding.module.css";
import React, { useEffect, useState } from "react";
import Button from "@/src/components/Button";
import EmptyLayout from "@/src/components/layouts/EmptyLayout";
import OnboardingUsername from "@/src/components/onboarding/OnboardingUsername";
import OnboardingGames from "@/src/components/onboarding/OnboardingGames";
import { useRouter } from "next/router";
import OnboardingAvatar from "@/src/components/onboarding/OnboardingAvatar";
import OnboardingBirthday from "@/src/components/onboarding/OnboardingBirthday";
import OnboardingMore from "@/src/components/onboarding/OnboardingMore";
import OnboardingFinish from "@/src/components/onboarding/OnboardingFinish";
import { useAtomValue } from "jotai";
import onboardingUserDataAtom from "@/src/atoms/onboardingUserDataAtom";

export type OnboardingFormContent = {
  games: string[];
  username: string;
};

const DEFAULT_FORM_CONTENT: OnboardingFormContent = {
  username: "",
  games: []
};


// TODO: THIS IS A WORKAROUND!!!
export type OnBoardingFormContextType = {
  content: OnboardingFormContent,
  setContent: React.Dispatch<React.SetStateAction<OnboardingFormContent>>
}

export const OnboardingFormContext = React.createContext({});

export default function Onboarding() {
  const [pageNumber, setPageNumber] = useState(1);
  const [content, setContent] = useState(DEFAULT_FORM_CONTENT);
  const router = useRouter();
  const userData = useAtomValue(onboardingUserDataAtom);

  const numPages = 6;

  async function handleFinish() {
    console.log("Onboarding with this data:", userData);

    // input validation
    if (!userData.pronouns) {
      console.log("missing pronouns");
      return;
    }
    if (!userData.username) {
      console.log("missing username");
      return;
    }
    if (!userData.avatarColor) {
      console.log("missing avatar color");
      return;
    }
    if (!userData.games) {
      console.log("missing games");
      return;
    }
    if (!userData.language) {
      console.log("missing language");
      return;
    }
    if (!userData.birthday) {
      console.log("missing birthday");
      return;
    }

    // set user data
    const res = await fetch("/api/users/onboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });
    console.log(await res.json());
    await router.push("/");
  }

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <div className={styles.OnboardingContainer}>
      <OnboardingFormContext.Provider value={{
        content,
        setContent
      }}>
        <div className={styles.ContentContainer}>
          {pageNumber !== 0 ? (
            <div className={"flex"}>
              <h3 className={"flex-grow"}>
                Question {pageNumber} of 6
              </h3>
              <h3 className={"flex-shrink text-pink-500"}>
                Required
              </h3>
            </div>
          ) : <></>}

          <div className={styles.Content}>
            {pageNumber === 1 && <OnboardingUsername />}
            {pageNumber === 2 && <OnboardingAvatar />}
            {pageNumber === 3 && <OnboardingBirthday />}
            {pageNumber === 4 && <OnboardingMore />}
            {pageNumber === 5 && <OnboardingGames />}
            {pageNumber === 6 && <OnboardingFinish onFinish={handleFinish} />}
          </div>

          <div className={styles.ButtonContainer}>
            <Button
              className={styles.Back}
              buttonType="secondary"
              onClick={() => {
                if (pageNumber > 1) {
                  setPageNumber(pageNumber - 1);
                } else
                  router.push("/signin");
              }}>
              Back
            </Button>
            <Button
              className={styles.Next}
              onClick={() => {
                if (pageNumber !== numPages) {
                  setPageNumber(pageNumber + 1);
                } else
                  handleFinish();
              }}>
              {pageNumber === numPages ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      </OnboardingFormContext.Provider>
    </div>
  );
}

export default Onboarding;