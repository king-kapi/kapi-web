import React from "react";

const OnlyIf = ({
                  condition,
                  children
                }: {
  condition: boolean
} & React.PropsWithChildren) => {
  if (condition) return <>{children}</>;
  return <></>;
};

export default OnlyIf;