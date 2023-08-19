import React from "react";
import { useRouter } from "next/router";
import PageHeader from "@/src/components/atoms/PageHeader";
import { useQuery } from "react-query";
import LobbyDetails from "@/src/components/LobbyDetails";
import { Tab } from "@headlessui/react";
import styles from "@/src/styles/party-finder/LobbyDetail.module.css";
import Chat from "@/src/components/chat/Chat";

export default function LobbyPage() {
  const router = useRouter();
  const { isLoading, error, data } = useQuery("lobby",
    async () => {
      const res = await fetch(`/api/lobbies/${router.query.lobbyId}`);
      if (!res.ok)
        throw await res.json();
      return await res.json();
    });

  return (
    <main className={"grid grid-cols-[auto_26rem] h-full"}>
      <div className={"px-16 py-12"}>
        <PageHeader href="/party-finder" iconName={"party_finder"}>Lobby</PageHeader>
        <div className="mt-16 flex flex-col">
          {(!isLoading && error !== undefined && data) && <LobbyDetails lobby={data} />}
        </div>
      </div>
      <div className={"flex flex-col bg-darkGrey h-full"}>
        <Tab.Group>
          <Tab.List className={"flex-shrink flex justify-evenly"}>
            <Tab
              className={styles.Tab}>
              <div>
                Party
              </div>
            </Tab>
            <Tab
              className={styles.Tab}>
              <div>
                Requests
              </div>
            </Tab>
          </Tab.List>
          <Tab.Panels className={"flex-auto"}>
            {data?.chatId && <Chat chatId={data?.chatId} className={"h-full"}/>}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </main>
  );
}