import React from "react";
import Icon from "@/components/icons/Icon";
import Icons from "@/components/icons/Icons";

export interface PageHeaderProps extends React.ComponentPropsWithoutRef<"div"> {
  iconName: Icons;
}

const PageHeader = ({ iconName, children }: PageHeaderProps) => {
  return <div className={"flex items-center"}>
    <div className={"w-[1.875rem] h-[1.875rem] bg-grey rounded-full flex-center"}>
      <Icon icon={"carat_left"} />
    </div>
    <Icon icon={iconName} size={3.4375} className={"ml-6"} />
    <span className={"ml-1"}>{children}</span>
  </div>;
};

export default PageHeader;