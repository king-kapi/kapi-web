import React, { useState } from "react";
import Link from "next/link";

const ColorThemes = () => {
  const [theme, setTheme] = useState("pink");

  return (
    <main className={["p-8", `theme-${theme}`].join(" ")}>
      <Link href={"/dev-pages"}>
        <button>
          Back
        </button>
      </Link>

      <h1 className={"text-4xl"}>
        Atoms
      </h1>

      <p>
        Page for demonstrating the components and color themes associated
      </p>

      <h3 className={"text-xl mt-4"}>
        Select Theme
      </h3>
      <select className={"dark:bg-mediumGrey mb-2"}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setTheme(e.currentTarget.value);
        }}
      >
        <option value={"pink"}>Pink</option>
        <option value={"blue"}>Blue</option>
        <option value={"cyan"}>Cyan</option>
        <option value={"yellow"}>Yellow</option>
      </select>

      <div className={`bg-mediumGrey grid-1 p-4`}>
        <div>
          <div style={{ height: 128, width: 128 }} className={`bg-primary-500 rounded p-1`}>
            Primary 500
          </div>
        </div>
      </div>
    </main>
  );
};

export default ColorThemes;