import React from "react";
import KapiTransparent from "../../assets/images/kapi_transparent.png";
import Image from "next/image";

export interface AvatarProps extends React.ComponentPropsWithoutRef<"div"> {
  c?: string;
}

const Avatar = ({ c, className = "" }: AvatarProps) => {
  return (
    <div className={`flex justify-center items-center rounded-full aspect-square ${className}`} style={{
      backgroundColor: c
    }}>
      <Image src={KapiTransparent} alt={"Kapi"} className={"w-[77.6%]"} />
    </div>
  );
};

export default Avatar;