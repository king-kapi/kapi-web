import React from "react";
import kingKapi from "@/assets/images/king_kapi.svg";
import Image from "next/image";
import Link from "next/link";

export interface OnboardingFinishProps {
  onFinish: () => void;
}

const OnboardingFinish = ({ onFinish }: OnboardingFinishProps) => {
  return (
    <div style={{ maxWidth: 806 }}>
      <h1 className={"mt-[2.625rem]"}>Congrats! You finished signing up!</h1>
      <h3 className={"mt-6"}>We encourage you to add more details to better personalize your experience. However, you
        can skip and start
        exploring the app!</h3>

      <div className={"flex p-6 gap-x-6 bg-grey rounded-lg items-center mt-[2.625rem]"}>
        <div>
          <Image src={kingKapi} alt={"King Kapi"} height={88} />
        </div>
        <div>
          <h3>Add More Details about yourself!</h3>
          <p>This should take around 2-3 minutes!</p>
        </div>
      </div>

      <button
        className={"flex p-6 gap-x-6 bg-grey w-full text-left rounded-lg items-center mt-9 mb-[4rem] " +
          "cursor-pointer hover:bg-mediumGrey transition-colors duration-100"}
        onClick={onFinish}>
        <div>
          <Image src={kingKapi} alt={"King Kapi"} height={88} />
        </div>
        <div>
          <h3>Skip and start exploring the app!</h3>
          <p>You can always come back and revisit this step in your profile</p>
        </div>
      </button>
    </div>
  );
};

export default OnboardingFinish;