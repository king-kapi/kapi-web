import React from "react";
import DevLayout from "@/components/layouts/DevLayout";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";

// :)
const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const ModifyUser = () => {
  return (
    <main>
      <h1>
        Party
      </h1>

      <h3 className={"mt-4"}>
        Create Party
      </h3>
      <form className={"p-4"} onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);

        console.log(data.get("game"));
      }}>
        <label>Name of Lobby</label><br />
        <Input className={"mt-2 mb-4"} placeholder={"Jane's Lobby"} name={""}
               style={{ width: "100%", maxWidth: 800 }} />

        <br />

        <label className={""}>
          Game
        </label><br />
        <Select className={"mt-2 mb-4"}
                name="game"
                placeholder={"Select Game"}
                options={[
                  { value: "volvo", text: "Volvo" },
                  { value: "saab", text: "Saab" },
                  { value: "mercedes", text: "Mercedes" },
                  { value: "audi", text: "Audi" }
                ]} style={{ maxWidth: 800 }} />

        <br />

        <label>
          Number of Players
        </label><br />
        <Select className={"mt-2 mb-4"}
                name="game"
                placeholder={"Select Game"}
                options={[
                  { value: "volvo", text: "Volvo" },
                  { value: "saab", text: "Saab" },
                  { value: "mercedes", text: "Mercedes" },
                  { value: "audi", text: "Audi" }
                ]} style={{ maxWidth: 800 }} />

        <br />

        <label>
          Lobby Description
        </label><br />
        <Input className={"mt-2 mb-4"}
               placeholder={loremIpsum}
               element={"textarea"}
               style={{ minHeight: 120, width: "100%", maxWidth: 800 }} />

        <br/>

        <Button className={"mt-4"} type={"submit"} buttonSize={"large"}>
          Create Party
        </Button>
      </form>

      <h3 className={"mt-4"}>
        All Parties
      </h3>
    </main>
  );
};

ModifyUser.getLayout = DevLayout.getLayout("/dev-pages");

export default ModifyUser;