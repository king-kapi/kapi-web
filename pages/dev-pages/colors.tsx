import React from "react";
import DevLayout from "@/components/layouts/DevLayout";

const Colors = () => {
  const colors = ["pink", "blue", "cyan", "yellow"];
  const shades = [900, 800, 700, 600, 500, 400, 300, 200, 100];

  return (
    <main>
      <h1 className={"text-3xl"}>Colors</h1>
      <div className={"grid grid-cols-4"} style={{ backgroundColor: "#181818", width: 640 }}>
        {colors.map((color) =>
          <div key={color} style={{width: 128}}>
            {shades.map(shade => (
              <div key={shade} style={{ color: "#fff", textAlign: "center" }} className={"py-8"}>
                <div style={{ height: 128, width: 128 }} className={`bg-${color}-${shade} rounded-xl`} />
                {`bg-${color}-${shade}`}
              </div>
            ))}
          </div>
        )}
      </div>

    </main>
  );
};

Colors.getLayout = DevLayout.getLayout("/dev-pages");

export default Colors;