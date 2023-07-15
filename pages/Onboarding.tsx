import styles from "../styles/onboarding/Onboarding.module.css";
import React, { useState } from "react";
import Button from "@/components/Button";
import EmptyLayout from "@/components/layouts/EmptyLayout";
import OnboardingWelcome from "@/components/onboarding/OnboardingWelcome";
import OnboardingUsername from "@/components/onboarding/OnboardingUsername";
import OnboardingGames from "@/components/onboarding/OnboardingGames";
import { useRouter } from "next/router";
import OnboardingAvatar from "@/components/onboarding/OnboardingAvatar";
import OnboardingBirthday from "@/components/onboarding/OnboardingBirthday";
import OnboardingMore from "@/components/onboarding/OnboardingMore";
import OnboardingFinish from "@/components/onboarding/OnboardingFinish";

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

  const numPages = 6;

  function handleFinish() {
    alert(`ayo we get these values ${JSON.stringify(content)}}`);
  }

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
            {pageNumber === 6 && <OnboardingFinish />}
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

Onboarding.getLayout = EmptyLayout.getLayout;
