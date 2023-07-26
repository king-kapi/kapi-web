import React from "react";
import LobbyDetails from "@/components/LobbyDetails";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import PageHeader from "@/components/atoms/PageHeader";

export default function LobbyPage() {
  const router = useRouter();
  const { isLoading, error, data } = useQuery("lobby",
    () => fetch(`/api/lobbies/${router.query.lobbyId}`)
      .then(res => res.json()));

  return (
    <main className={"px-16 py-12"}>
      <PageHeader iconName={"party_finder"}>Lobby</PageHeader>
      <div className="mt-16 flex flex-col">
        {(!isLoading && error !== undefined && data) && <LobbyDetails lobby={data} />}
      </div>
    </main>
  );
}