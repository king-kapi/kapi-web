import React, { useState } from "react";
import Button from "@/components/Button";
import DevLayout from "@/components/layouts/DevLayout";
import { Icons } from "@/components/Icon";
import Tag from "@/components/Tag";

const AtomsPage = () => {
  const [theme, setTheme] = useState("pink");

  return (
    <main className={`theme-${theme} pb-16`}>

      <h1>
        Atoms
      </h1>

      <p>
        Page for demonstrating the components and color themes associated
      </p>

      <h3 className={"mt-4"}>
        Select Theme
      </h3>
      <div className={"flex mb-16 gap-2"}>
        <Button className={"theme-pink"} onClick={() => setTheme("pink")}>Pink</Button>
        <Button className={"theme-blue"} onClick={() => setTheme("blue")}>Blue</Button>
        <Button className={"theme-cyan"} onClick={() => setTheme("cyan")}>Cyan</Button>
        <Button className={"theme-yellow"} onClick={() => setTheme("yellow")}>Yellow</Button>
      </div>

      <div className={"flex gap-4 mb-4"}>
        <div style={{ height: 128, width: 128 }} className={`bg-primary-100 rounded p-1`}>
          Primary 100
        </div>

        <div style={{ height: 128, width: 128 }} className={`bg-primary-170 rounded p-1`}>
          Primary 170
        </div>

        <div style={{ height: 128, width: 128 }} className={`bg-primary-90 rounded p-1`}>
          Primary 90
        </div>
      </div>

      <div>
        <h3>Buttons</h3>
        <div className={"flex gap-4"}>
          <div>
            <h4>Primary</h4>
            <Button>Small Button</Button> <br />
            <Button icon={Icons.EXIT} className={"mt-2"}>Small Button</Button> <br />
            <Button size={"large"} className={"mt-2"}>Large Button</Button> <br />
            <Button icon={Icons.EXIT} size={"large"} className={"mt-2"}>Large Button</Button>
          </div>

          <div>
            <h4>Secondary</h4>
            <Button type={"secondary"}>Small Button</Button> <br />
            <Button type={"secondary"} icon={Icons.EXIT} className={"mt-2"}>Small Button</Button> <br />
            <Button type={"secondary"} size={"large"} className={"mt-2"}>Large Button</Button> <br />
            <Button type={"secondary"} icon={Icons.EXIT} size={"large"} className={"mt-2"}>Large Button</Button>
          </div>
        </div>
      </div>

      <h3 className={"mt-8"}>Tags</h3>
      <div className={"flex gap-4"}>
        <div className={"mt-2"}>
          <h4>Large</h4>
          <div className={"flex gap-2 mt-1"}>
            <Tag>Tag Name</Tag>
            <Tag icon={true}>Tag Name</Tag>
            <Tag border={true} icon={false}>Tag Name</Tag>
          </div>
        </div>
        <div className={"mt-2"}>
          <h4>Small</h4>
          <div className={"flex gap-2 mt-1"}>
            <Tag size={"small"}>Tag Name</Tag>
            <Tag size={"small"} icon={true}>Tag Name</Tag>
            <Tag size={"small"} border={true} icon={false}>Tag Name</Tag>
          </div>
        </div>
      </div>
    </main>
  );
};

AtomsPage.getLayout = DevLayout.getLayout("/dev-pages");

export default AtomsPage;