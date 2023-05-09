import React from "react";
import Link from "next/link";

const DevPages = () => {
  return <main className={"p-16"}>
    <h1 className={"text-5xl"}>
      Dev Pages
    </h1>
    <p>
      Pages dedicated for development use/showcase
    </p>

    <Link href={"/dev-pages/colors"} className={"background"}>
      <button>
        Colors
      </button>
    </Link>
  </main>;
};

export default DevPages;