import React from "react";
import Link from "next/link";
import Button from "@/components/Button";

const DevPages = () => {
  return <main className={"p-8"}>
    <h1>
      Dev Pages
    </h1>
    <p className={"mt-2"}>
      Pages dedicated for development use/showcase
    </p>

    <Link href={"/dev-pages/colors"}>
      <Button className={"mt-4"}>
        Colors
      </Button>
    </Link>

    <br/>

    <Link href={"/dev-pages/atoms"}>
      <Button className={"mt-2"}>
        Atoms
      </Button>
    </Link>
  </main>;
};

export default DevPages;