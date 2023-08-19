import React from "react";
import Link from "next/link";
import Button from "@/src/components/Button";
import DevLayout from "@/src/components/layouts/DevLayout";

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

    <Link href={"/dev-pages/modify-user_old"}>
      <Button className={"mt-2"}>
        Modify User
      </Button>
    </Link>
    <br/>

    <Link href={"/dev-pages/lobbies"}>
      <Button className={"mt-2"}>
        Lobbies
      </Button>
    </Link>

    <h3 className={"mt-8"}>Miscellaneous</h3>

    <Link href={"/dev-pages/components"}>
      <Button buttonType={"secondary"}>See components page</Button>
    </Link>

    <br/>
    <br/>

    <Link href={"/dev-pages/chat-demo"}>
      <Button buttonType={"secondary"}>See chat demo</Button>
    </Link>

    <br/>
    <br/>

    <Link href={"/dev-pages/party-finder/test"}>
      <Button buttonType={"secondary"}>See Party Finder Backend Tests</Button>
    </Link>
  </main>;
};

DevPages.getLayout = DevLayout.getLayout("/");

export default DevPages;