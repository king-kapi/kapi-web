import React, { useEffect, useRef, useState } from "react";
import DevLayout from "@/components/layouts/DevLayout";
import includeQuery from "@/src/utils/includeQuery";
import Icon from "@/components/icons/Icon";
import { IUser } from "@/src/models/User";

const typeMap: {
  [key: string]: string
} = {
  name: "string",
  email: "string",
  emailVerified: "number",
  image: "string",
  username: "string",
  tag: "string",
  bio: "string",
  status: "string",
  currentLobby: "string",
  friendOfId: "string",
  partyId: "string"
};

const ModifyUser = () => {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [editing, setEditing] = useState<string[]>([]);

  async function fetchUser() {
    const res = await fetch(`http://localhost:3000/api/users/current?include=${includeQuery(["friends"])}`);
    const user = await res.json();
    setUser(user);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user)
    return (
      <main>
        <h1>Modify User</h1>
        <h3>ID: Loading...</h3>
        <h3>Username: Loading...</h3>
      </main>
    );

  const DisplayAttribute = ({ attribute, value }: { attribute: keyof IUser, value: IUser[keyof IUser] }) => (
    <>
      <td style={{ wordBreak: "break-all" }}>{(value ?? "").toString()}</td>
      <td>
        <Icon icon={"edit_pencil"} className={"cursor-pointer"}
              onClick={() => {
                setEditing([...editing, attribute]);
              }} />
      </td>
    </>
  );

  function removeFromEditing(attribute: keyof IUser) {
    const newEditing = [...editing];
    newEditing.splice(editing.indexOf(attribute), 1);
    setEditing(newEditing);
  }

  const EditAttribute = ({ attribute, value, type }: {
    attribute: keyof IUser,
    value: IUser[keyof IUser],
    type: string
  }) => {
    const inputRef = useRef<HTMLInputElement>(document.createElement("input"));

    return (
      <>
        <td>
          <input className="bg-grey px-2 py-1 rounded"
                 style={{ width: "100%" }}
                 defaultValue={(value ?? "").toString()}
                 ref={inputRef} type={type === "number" ? "number" : "text"} />
        </td>
        <td className={"flex gap-x-4 items-center"} style={{ height: 34 }}>
          <Icon icon={"add"} className={"cursor-pointer"}
                onClick={async () => {
                  await fetch(`/api/user`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      attribute: attribute,
                      value: inputRef.current.value
                    })
                  });
                  await fetchUser();
                  removeFromEditing(attribute);
                }} />
          <Icon icon={"deny_default"} className={"cursor-pointer"}
                onClick={() => removeFromEditing(attribute)} />
        </td>
      </>
    );
  };

  return (
    <main>
      <h1>Modify User</h1>
      <h3>ID: <code className={"bg-grey font-normal px-1 rounded"}> {user._id.toString()} </code></h3>

      <table className={"border-spacing-y-4 border-spacing-x-4 border-separate"}>
        <thead>
        <tr>
          <th>
            <h4>Attribute Name</h4>
          </th>
          <th>
            <h4>Value</h4>
          </th>
          <th>
            <h4>
              Actions
            </h4>
          </th>
        </tr>
        </thead>

        <tbody>
        {(Object.keys(user) as (keyof IUser)[]).map(key => {
          if (key === "_id" || !typeMap[key])
            return (<></>);
          return (
            <tr key={key}>
              <td>{key}</td>
              {editing.includes(key) ?
                <EditAttribute attribute={key} value={user[key]} type={typeMap[key]} />
                : <DisplayAttribute attribute={key} value={user[key]} />
              }
            </tr>
          );
        })}
        </tbody>
      </table>
    </main>
  );
};

ModifyUser.getLayout = DevLayout.getLayout("/dev-pages");

export default ModifyUser;