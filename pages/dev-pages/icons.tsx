import React from "react";
import Link from "next/link";
import Icon, { Icons } from "@/components/Icon";

const IconsPage = () => {

  return (
    <main style={{ backgroundColor: "#181818" }} className={"p-8"}>
      <Link href={"/dev-pages"}>
        <button>
          Back
        </button>
      </Link>

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
};

export default IconsPage;