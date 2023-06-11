import React from "react";
import Link from "next/link";
import Button from "@/components/Button";
import DevLayout from "@/components/layouts/DevLayout";

const DevPages = () => {
  return <main>
    <h1>
      Dev Pages
    </h1>
    <p className={"mt-2"}>
      Pages dedicated for development use/showcase
    </p>

    <div style={{color: "red"}}>

    </div>

    <Link href={"/dev-pages/colors"}>
      <Button className={"mt-4"}>
        Colors
      </Button>
    </Link>

    <br/>

    <Link href={"/dev-pages/icons"}>
      <Button className={"mt-2"}>
        Icons
      </Button>
    </Link>

    <br/>

    <Link href={"/dev-pages/typography"}>
      <Button className={"mt-2"}>
        Typography
      </Button>
    </Link>

    <br/>

    <Link href={"/dev-pages/atoms"}>
      <Button className={"mt-2"}>
        Atoms
      </Button>
    </Link>

    <br/>

    <Link href={"/dev-pages/modify-user"}>
      <Button className={"mt-2"}>
        Modify User
      </Button>
    </Link>

    <h3 className={"mt-8"}>Miscellaneous</h3>

    <Link href={"/dev-pages/components"}>
      <Button type={"secondary"}>See components page</Button>
    </Link>

    <br/>
    <br/>

    <Link href={"/dev-pages/chat-demo"}>
      <Button type={"secondary"}>See chat demo</Button>
    </Link>

    <br/>
    <br/>

    <Link href={"/dev-pages/party-finder/test"}>
      <Button type={"secondary"}>See Party Finder Backend Tests</Button>
    </Link>
  </main>;
};

DevPages.getLayout = DevLayout.getLayout("/");

export default DevPages;