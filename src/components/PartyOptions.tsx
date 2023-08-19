import styles from "@/src/styles/PartyOptions.module.css";
import Link from "next/link";
import { useState } from "react";
import Button from "./Button";
import Icon from "@/src/components/icons/Icon";

export default function PartyOptions() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSelectedOption(String(e.currentTarget.value));
  };
  return (
    <div className={[styles.PartyOptionsContainer, "text-textColor"].join(" ")}>
      <h1 className={styles.Header}>What are you looking for?</h1>
      <div className={styles.ButtonsContainer}>
        <label
          className={[
            styles.PartyOption,
            selectedOption === "/partyfinder/buddyfinder" ? "bg-pressedGrey" : "bg-grey"
          ].join(" ")}
        >
          <input
            type="radio"
            value={"/partyfinder/buddyfinder"}
            checked={selectedOption === "/partyfinder/buddyfinder"}
            onChange={handleChange}
          />
          {/*todo: kapi_buddy icon*/}
          <Icon icon={"add"} className={styles.FindBuddyIcon} />
          <span>Find a Buddy</span>
        </label>
        <label
          className={[
            styles.PartyOption,
            selectedOption === "/partyfinder/lobbyfinder" ? "bg-pressedGrey" : "bg-grey"
          ].join(" ")}
        >
          <input
            type="radio"
            value={"/partyfinder/lobbyfinder"}
            checked={selectedOption === "/partyfinder/lobbyfinder"}
            onChange={handleChange}
          />
          {/*todo: kapi_friends icon*/}
          <Icon icon={"add"} className={styles.FindLobbyIcon} />
          <span>Find a Lobby</span>
        </label>
        <label
          className={[
            styles.PartyOption,
            selectedOption === "/partyfinder/CreateLobby" ? "bg-pressedGrey" : "bg-grey"
          ].join(" ")}
        >
          <input
            type="radio"
            value={"/partyfinder/CreateLobby"}
            checked={selectedOption === "/partyfinder/CreateLobby"}
            onChange={handleChange}
          />
          {/*TODO: kapi icon*/}
          <Icon icon={"add"} className={styles.CreateLobbyIcon} />
          <span>Create a Lobby</span>
        </label>
      </div>
      <div className={styles.NextBackContainer}>
        <Link href="">
          <Button buttonType="secondary" className={styles.Back}>
            Back
          </Button>
        </Link>
        <Link href={selectedOption}>
          <Button buttonType={selectedOption.length === 0 ? "secondary" : "primary"}
                  className={styles.Next}>Next</Button>
        </Link>
      </div>
    </div>
  );
}
