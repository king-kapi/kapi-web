import React from "react";
import DevLayout from "@/components/layouts/DevLayout";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";

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
        <label>
          Game:
        </label><br />
        <Select name="game" placeholder={"Select Game"} options={[
          { value: "volvo", text: "Volvo" },
          { value: "saab", text: "Saab" },
          { value: "mercedes", text: "Mercedes" },
          { value: "audi", text: "Audi" }
        ]} />

        <br />

        <label>Name of Lobby</label><br />
        <Input className={"mt-2"} placeholder={"Jane's Lobby"} name={""} />
      </form>

      <h3 className={"mt-4"}>
        All Parties
      </h3>


    </main>
  );
};

ModifyUser.getLayout = DevLayout.getLayout("/dev-pages");

export default ModifyUser;