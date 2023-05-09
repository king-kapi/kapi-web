import React from "react";
import Icon, { Icons } from "@/components/Icon";
import DevLayout from "@/components/layouts/DevLayout";

const IconsPage = () => (
  <main>
    <h1 className={"text-3xl"}>Icons</h1>

    <p>Page for demonstrating icons that currently exist</p>

    <div className={"grid grid-cols-4 gap-y-8 mt-8"}>
      {Object.keys(Icons).map(iconName => (
        <div key={iconName} className={"col-span-1 flex flex-col items-center"}>
          <Icon icon={Icons[iconName]} />
          {iconName}
        </div>
      ))}
    </div>
  </main>
);

IconsPage.getLayout = DevLayout.getLayout("/dev-pages");

export default IconsPage;