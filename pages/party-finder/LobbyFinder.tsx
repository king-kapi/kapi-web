import Icon from "@/src/components/icons/Icon";
import Input from "@/src/components/Input";
import Tag from "@/src/components/Tag";
import KapiListbox from "@/src/components/KapiListbox";
import { Suspense } from "react";
import LobbyCards from "@/src/components/party-finder/LobbyCards";

export default function PartyFinderPage() {
  return (<div className={"px-16 py-12"}>
    <div className={"flex items-center"}>
      <div className={"w-[1.875rem] h-[1.875rem] bg-grey rounded-full flex-center"}>
        <Icon icon={"carat_left"} />
      </div>
      <Icon icon={"party_finder"} size={3.4375} className={"ml-6"} />
      <span className={"ml-1"}>Party Finder</span>
    </div>
    <div className={"flex items-center gap-6 mt-16"}>
      <h1>
        Open Lobbies
      </h1>
      <h4>20 available</h4>
    </div>
    <div className={"flex items-center mt-8 gap-6"}>
      <h4>Filter By Tags</h4>
      <div className={"flex-grow max-w-[31rem]"}>
        <Input placeholder={"Lobby Name"} icon={<Icon icon={"search"} />} />
      </div>
      <div className={"flex-grow flex gap-6"}>
        <Tag icon={true}>
          Tag Name
        </Tag>
        <Tag icon={true}>
          Tag Name
        </Tag>
      </div>
      <div>
        <KapiListbox placeholder={"Sort By"} options={[
          {
            text: "Name",
            value: "name",
          },
          {
            text: "Date",
            value: "name",
          }
        ]} />
      </div>
    </div>
    <div className={"mt-10"}>
      <Suspense>
        <LobbyCards/>
      </Suspense>
    </div>
  </div>);
}