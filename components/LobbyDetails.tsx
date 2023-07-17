import styles from "../styles/LobbyMemberList.module.css";
import { useState } from "react";
import Icon from "@/components/icons/Icon";
import { ILobby, ILobbyPopulated } from "@/src/models/Lobby";
import { IUser } from "@/src/models/User";

export interface LobbyDetailsProps {
  lobby: ILobbyPopulated;
}

export default function LobbyDetails({ lobby }: LobbyDetailsProps) {
  const tags = ["League of Legends", "NA Region", "PST", "LGBTQ+", "Casual Gaming"];
  const members = [
    { name: "Jane Doe", username: "LoLPlayer123", role: "ADC", experience: "Silver" },
    { name: "Jane Doe", username: "LoLPlayer123", role: "ADC", experience: "Silver" },
    { name: "Jane Doe", username: "LoLPlayer123", role: "ADC", experience: "Silver" }
  ];

  const [view, setView] = useState("1");

  const handleChange = (e: any) => {
    setView(e.target.value);
  };

  return (
    <div className={[styles.LobbyMemberListContainer, "text-textColor"].join(" ")}>
      <div className={styles.HeaderContainer}>
        <h1 className={styles.Header}>
          {lobby.name}&nbsp;<span>/&nbsp;{lobby.game}</span>
        </h1>
        <button
          className={[styles.LeaveButton, "bg-mediumGrey hover:bg-blue-120 active:bg-blue-90"].join(
            " "
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
          >
            <path
              d="M2.55556 23C1.85278 23 1.25095 22.7496 0.750057 22.2487C0.249169 21.7478 -0.000849682 21.1464 2.1694e-06 20.4444V15.3333H2.55556V20.4444H20.4444V2.55556H2.55556V7.66667H2.1694e-06V2.55556C2.1694e-06 1.85278 0.250447 1.25095 0.751335 0.750057C1.25222 0.249169 1.85363 -0.000849682 2.55556 2.1694e-06H20.4444C21.1472 2.1694e-06 21.7491 0.250447 22.2499 0.751335C22.7508 1.25222 23.0009 1.85363 23 2.55556V20.4444C23 21.1472 22.7496 21.7491 22.2487 22.2499C21.7478 22.7508 21.1464 23.0009 20.4444 23H2.55556ZM9.58333 17.8889L7.79445 16.0361L11.0528 12.7778H2.1694e-06V10.2222H11.0528L7.79445 6.96389L9.58333 5.11111L15.9722 11.5L9.58333 17.8889Z"
              fill="#E2E4E9"
            />
          </svg>
          Leave Lobby
        </button>
      </div>
      <p className={styles.Description}>
        {lobby.description}
      </p>
      <div className={styles.Tags}>
        {" "}
        {tags.map(tag => {
          return <div key={tag} className={[styles.Tag, "bg-mediumGrey"].join(" ")}>{tag}</div>;
        })}
      </div>
      <div className={styles.MemberCountContainer}>
        <h2 className={styles.MemberCount}>Party Members {lobby.users.length}/{lobby.numPlayers}</h2>
        <div className={styles.ViewOptions}>
          <Icon icon={"grid_view"} />
          View
          <Icon icon={"carat_down"} />
        </div>
      </div>
      <div className={styles.Members}>
        {lobby.users.map(user => {
          return (
            <div
              key={user._id.toString()}
              className={[styles.Member, "bg-mediumGrey bg-gradient-to-b from-blue-110 to-blue-120"].join(" ")}
            >
              <div className={styles.MemberOptions}>
                <Icon icon={"toggle_vertical"} />
              </div>
              <div className={styles.MemberAvatar}></div>
              <div className={styles.MemberInfo}>
                <h3 className={styles.MemberName}>{user.username}</h3>
                <p className={[styles.MemberUsername, "text-description"].join(" ")}>@{user.username}</p>
                <p className={[styles.MemberRole, "text-description-strong"].join(" ")}>[Role]</p>
                <p className={[styles.MemberExperience, "text-description-strong"].join(" ")}>[Experience]</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
