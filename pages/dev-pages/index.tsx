import React from "react";
import Link from "next/link";

const DevPages = () => {
  return <main className={"p-8"}>
    <h1 className={"text-5xl"}>
      Dev Pages
    </h1>
    <p className={"mt-2"}>
      Pages dedicated for development use/showcase
    </p>

    <Link href={"/dev-pages/colors"} className={"background"}>
      <button>
        Colors
      </button>
    </Link>

    <Link href={"/dev-pages/atoms"} className={"background"}>
      <button>
        Atoms
      </button>
    </Link>
  </main>;
};

export default DevPages;