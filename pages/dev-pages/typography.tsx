import React from "react";
import Link from "next/link";

const TypographyPage = () => (
  <main className={"p-8"}>

    <Link href={"/dev-pages"}>
      <button>
        Back
      </button>
    </Link>

    <h1>
      Typography
    </h1>

    <p>
      Page for demonstrating the typography system
    </p>

    <div className={"grid grid-cols-10 mt-16 gap-y-4"}>
      <div className={"col-span-2"}>
        <h1>Header 1</h1>
      </div>
      <div className={"col-span-8"}>
        <h1>The quick brown fox jumps over the lazy dog</h1>
      </div>

      <div className={"col-span-2"}>
        <h2>Header 2</h2>
      </div>
      <div className={"col-span-8"}>
        <h2>The quick brown fox jumps over the lazy dog</h2>
      </div>

      <div className={"col-span-2"}>
        <h3>Header 3</h3>
      </div>
      <div className={"col-span-8"}>
        <h3>The quick brown fox jumps over the lazy dog</h3>
      </div>

      <div className={"col-span-2"}>
        <h4>Header 4</h4>
      </div>
      <div className={"col-span-8"}>
        <h4>The quick brown fox jumps over the lazy dog</h4>
      </div>

      <div className={"col-span-2"}>
        <p>Body</p>
      </div>
      <div className={"col-span-8"}>
        <p>The quick brown fox jumps over the lazy dog</p>
      </div>

      <div className={"col-span-2"}>
        <strong>Description Strong</strong>
      </div>
      <div className={"col-span-8"}>
        <strong>The quick brown fox jumps over the lazy dog</strong>
      </div>

      <div className={"col-span-2"}>
        <small>Description</small>
      </div>
      <div className={"col-span-8"}>
        <small>The quick brown fox jumps over the lazy dog</small>
      </div>

    </div>
  </main>
);

export default TypographyPage;