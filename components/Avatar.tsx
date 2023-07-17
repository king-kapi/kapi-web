import React from "react";
import KapiTransparent from "../assets/images/kapi_transparent.png";
import Image from "next/image";

export interface AvatarProps extends React.ComponentPropsWithoutRef<"div"> {
  c: [number, number, number];
}

const Avatar = ({ c, className = "" }: AvatarProps) => {
  return (
    <div className={`${className} flex justify-center items-center rounded-[50%]`} style={{
      backgroundColor: `rgb(${c[0]}, ${c[1]}, ${c[2]})`
    }}>
      <Image src={KapiTransparent} alt={"Kapi"} className={"w-[77.6%]"} />
    </div>
  );
};

export default Avatar;