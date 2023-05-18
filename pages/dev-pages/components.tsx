import { AchievementsWidget } from "@/components/AchievementsWidget";
import CustomizeDashboard from "@/components/CustomizeDashboard";
import { InterestsWidget } from "@/components/InterestsWidget";
import { NotificationsWidget } from "@/components/NotificationsWidget";
import { Notification } from "@/src/types/Notification";
import { GameWidget } from "@/components/GameWidget";
import NotificationBubble from "../../components/NotificationBubble";
import SearchBar from "../../components/SearchBar";
import SideNav from "../../components/SideNav";
import { GamesInterests } from "@/components/GamesInterests";
import { HonorOfConduct } from "@/components/HonorOfConduct";
import PartyOption from "@/components/PartyOptions";
import { ProfilePreview } from "@/components/ProfilePreview";
import ProfileCard from "@/components/ProfileCard";
import Link from "next/link";
import React from "react";
import DevLayout from "@/components/layouts/DevLayout";

function Components() {
  const notifications: Notification[] = [
    {
      icon: "mingcute:trophy-fill",
      messageHighlight: "Wowow you just got a trophy!",
      mainMessage: "",
      timestamp: 25,
      partySize: undefined,
      maxPartySize: undefined
    },
    {
      icon: "mdi:thumb-up",
      messageHighlight: "@thisandthat",
      mainMessage: "from liked your post",
      timestamp: 62,
      partySize: undefined,
      maxPartySize: undefined
    },
    {
      icon: "icon-park-solid:game-handle",
      messageHighlight: "@soandso",
      mainMessage: "joined your game lobby",
      timestamp: 134,
      partySize: 3,
      maxPartySize: 4
    }
  ];
  return (
    <main>
      <h1 className={"mb-8"}>Various Components</h1>

      <SideNav />
      <SearchBar />
      <AchievementsWidget />
      <InterestsWidget />
      <ProfilePreview />
      <CustomizeDashboard />
      <NotificationsWidget notifications={notifications} />
      {notifications.map((notification, index) => (
        <NotificationBubble key={index} notification={notification} />
      ))}
      <GamesInterests />
      <GameWidget />
      <HonorOfConduct />
      <PartyOption />
      <ProfileCard />
    </main>
  );
}

Components.getLayout = DevLayout.getLayout("/dev-pages");

export default Components;