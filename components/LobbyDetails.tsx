import styles from "../styles/LobbyMemberList.module.css";
import { useState } from "react";
import Icon from "@/components/icons/Icon";
import { ILobbyPopulated } from "@/src/models/Lobby";
import Button from "@/components/Button";
import Tag from "@/components/Tag";
import Avatar from "@/components/Avatar";
import { useSession } from "next-auth/react";

export interface LobbyDetailsProps {
  lobby: ILobbyPopulated;
}

export default function LobbyDetails({ lobby }: LobbyDetailsProps) {
  const { data } = useSession();
  const userId = data?.id;
  const tags = ["League of Legends", "NA Region", "PST", "LGBTQ+", "Casual Gaming"];
  const members = [
    { name: "Jane Doe", username: "LoLPlayer123", role: "ADC", experience: "Silver" },
    { name: "Jane Doe", username: "LoLPlayer123", role: "ADC", experience: "Silver" },
    { name: "Jane Doe", username: "LoLPlayer123", role: "ADC", experience: "Silver" }
  ];

  const [view, setView] = useState("1");

  const isHost = lobby.hostId.toString() === userId;

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
      <div className={"flex flex-wrap gap-8 justify-between"}>
        {lobby.users.map(user => {
          return (
            <div
              key={user._id.toString()}
              className={"basis-[17rem] flex flex-col relative px-20 py-10 bg-mediumGrey rounded-lg text-center items-center"}
            >
              <div className={"absolute top-5 right-5"}>
                <Icon icon={"toggle_vertical"} />
              </div>

              <Avatar c={user.avatarColor} className={"w-[6.75rem]"} />

              <div className={"flex gap-2 items-center mt-6"}>
                <h3>{user.username}</h3>
                <Icon icon={"crown"} className={"text-yellow-500"} />
              </div>
              <div className={styles.MemberInfo}>
                <p className={[styles.MemberUsername, "text-description"].join(" ")}>@{user.username}</p>
                <strong className={[styles.MemberRole, "text-description-strong"].join(" ")}>Role</strong><br />
                <strong className={[styles.MemberExperience, "text-description-strong"].join(" ")}>Experience</strong>
              </div>
            </div>
          );
        })}

        {isHost && (
          <div
            className={"basis-[17rem] flex flex-col justify-center items-center border border-dashed border-primary-100 rounded-lg cursor-pointer hover:bg-darkGrey"}
          >
            <Icon icon={"add_friend"} className={"text-black p-2 rounded-full bg-white"}/>
            <strong className={"mt-6"}>Invite friends</strong>
          </div>
        )}
      </div>
    </div>
  );
}
