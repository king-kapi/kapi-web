import React from "react";

export interface AvatarStackProps {
  avatarsColors: (string | undefined)[];
}

const AvatarStack = ({ avatarsColors }: AvatarStackProps) => {
  return <div className={"flex -space-x-2.5"}>
    {avatarsColors.map((color, i) =>
      <div key={i} className={"w-[2.5rem] h-[2.5rem] rounded-full border-2 border-grey"} style={{
        backgroundColor: color
      }} />
    )}
  </div>;
};

export default AvatarStack;