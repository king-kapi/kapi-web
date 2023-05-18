import fs from "fs";

const images = fs.readdirSync("./public/icons");

const output: {
  [key: string]: {
    src: string,
    width: number,
    height: number
  }
} = {};

for (const imagePath of images) {
  // console.log(image);
  const contents = fs.readFileSync("./public/icons/" + imagePath).toString();
  const key = imagePath.replace(".svg", "").toUpperCase();
  const src = "/icons/" + imagePath;
  const widthMatch = contents.match(/(?<=\bwidth=")[^"]*/gm);
  const heightMatch = contents.match(/(?<=\bheight=")[^"]*/gm);

  if (widthMatch && heightMatch) {
    const width = parseInt(widthMatch[0]);
    const height = parseInt(heightMatch[0]);

    output[key] = {
      src,
      width,
      height
    }
  }
}

console.log(JSON.stringify(output));