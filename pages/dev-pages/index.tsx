import React from "react";
import Link from "next/link";

const DevPages = () => {
  return <>
    <h1>
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
  </>;
};

export default DevPages;