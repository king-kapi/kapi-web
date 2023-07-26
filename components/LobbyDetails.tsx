import styles from "../styles/LobbyMemberList.module.css";
import { useState } from "react";
import Icon from "@/components/icons/Icon";
import { ILobbyPopulated } from "@/src/models/Lobby";
import Button from "@/components/Button";
import Tag from "@/components/Tag";

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

  console.log("lobby", lobby);

  const handleChange = (e: any) => {
    setView(e.target.value);
  };

  return (
    <div className={[styles.LobbyMemberListContainer, "text-textColor"].join(" ")}>
      <div className={styles.HeaderContainer}>
        <h1 className={styles.Header}>
          {lobby.name}&nbsp;<span>/&nbsp;{lobby.game}</span>
        </h1>
        <Button
          className={[styles.LeaveButton, "bg-mediumGrey hover:bg-blue-120 active:bg-blue-90"].join(
            " "
          )}
        >
          <Icon icon={"exit"} />
          Leave Lobby
        </Button>
      </div>
      <p className={styles.Description}>
        {lobby.description}
      </p>
      <div className={`${styles.Tags} mt-[0.625rem]`}>
        {tags.map(tag => {
          return <Tag key={tag}>{tag}</Tag>;
        })}
      </div>
      <div className={"flex justify-between mt-16 mb-6"}>
        <h4>Party Members</h4>
        <div className={styles.ViewOptions}>
          <Icon icon={"grid_view"} />
          View
          <Icon icon={"carat_down"} />
        </div>
      </div>
      <div className={"grid grid-cols-3"}>
        {lobby.users.map(user => {
          return (
            <div
              key={user._id.toString()}
              className={"relative px-20 py-10 bg-mediumGrey rounded-lg text-center"}
            >
              <div className={"absolute top-5 right-5"}>
                <Icon icon={"toggle_vertical"} />
              </div>
              <div className={"flex"}>{user.username}<Icon icon={"crown"} className={"text-yellow-500"}/></div>
              <div className={styles.MemberInfo}>
                <h3 className={styles.MemberName}>{user.username}</h3>
                <p className={[styles.MemberUsername, "text-description"].join(" ")}>@{user.username}</p>
                <strong className={[styles.MemberRole, "text-description-strong"].join(" ")}>[Role]</strong><br/>
                <strong className={[styles.MemberExperience, "text-description-strong"].join(" ")}>[Experience]</strong>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
