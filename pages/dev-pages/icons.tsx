import React from "react";
import Icon from "@/src/components/icons/Icon";
import DevLayout from "@/src/components/layouts/DevLayout";
import Icons, {IconSVGs} from "@/src/components/icons/Icons";

const IconsPage = () => (
  <main>
    <h1 className={"text-3xl"}>Icons</h1>
    <p>Page for demonstrating icons that currently exist</p>

    <h3>Example Usage</h3>
    <p>To create a edit_pencil icon:</p>
    <div className={"p-4 rounded-xl bg-mediumGrey mt-2 inline-block"}>
      <Icon icon={"edit_pencil"}/><br/>
      <code>{'<Icon icon={"edit_pencil"} />'}</code>
    </div>


    <h3 className={"mt-8"}>All Icons</h3>
    <div className={"grid grid-cols-4 gap-y-8 mt-8"}>
      {Object.keys(IconSVGs).map(iconName => (
        <div key={iconName} className={"col-span-1 flex flex-col items-center"}>
          <Icon icon={iconName as Icons}/>
          {iconName}
        </div>
      ))}
    </div>
  </main>
);

IconsPage.getLayout = DevLayout.getLayout("/dev-pages");

export default IconsPage;