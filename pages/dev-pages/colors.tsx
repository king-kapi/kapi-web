import React from "react";
import Link from "next/link";

const Colors = () => {
  const colors = ["pink", "blue", "cyan", "yellow"];
  const shades = [900, 800, 700, 600, 500, 400, 300, 200, 100];

  return (
    <main style={{ backgroundColor: "#181818" }}>
      <Link href={"/dev-pages"}>
        <button>
          Back
        </button>
      </Link>
      <h1 className={"text-3xl"}>Colors</h1>
      <div className={"grid grid-cols-4"} style={{ backgroundColor: "#181818", width: 640 }}>
        {colors.map((color) =>
          <div key={color} style={{width: 128}}>
            {shades.map(shade => (
              <div key={shade} style={{ color: "#fff", textAlign: "center" }} className={"py-8"}>
                <div style={{ height: 128, width: 128 }} className={`bg-${color}-${shade} rounded-xl`} />
                {`${color}-${shade}`}
              </div>
            ))}
          </div>
        )}
      </div>

    </main>
  );
};

export default Colors;