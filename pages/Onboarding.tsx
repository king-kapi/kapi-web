import styles from "../styles/onboarding/Onboarding.module.css";
import React, { useRef, useState } from "react";
import Button from "@/components/Button";
import EmptyLayout from "@/components/layouts/EmptyLayout";
import OnboardingWelcome from "@/components/onboarding/OnboardingWelcome";
import OnboardingUsername from "@/components/onboarding/OnboardingUsername";
import OnboardingGames from "@/components/onboarding/OnboardingGames";
import ProgressDots from "@/components/onboarding/ProgressDots";
import { useRouter } from "next/router";

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

  const numPages = 4;

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
          <div className={styles.Content}>
            {pageNumber === 1 && <OnboardingWelcome />}
            {pageNumber === 2 && <OnboardingUsername />}
            {pageNumber === 3 /* && <CustomizeAvatar /> */}
            {pageNumber === 4 && <OnboardingGames />}
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

          <ProgressDots current={pageNumber - 1} steps={numPages} style={{ margin: "42px auto 0" }} />
        </div>
      </OnboardingFormContext.Provider>
    </div>
  );
}

Onboarding.getLayout = EmptyLayout.getLayout;
