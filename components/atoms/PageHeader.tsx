import React from "react";
import Icon from "@/components/icons/Icon";
import Icons from "@/components/icons/Icons";
import Link from "next/link";

export interface PageHeaderProps extends React.ComponentPropsWithoutRef<"div"> {
  iconName: Icons;
  href: string;
}

const PageHeader = ({ iconName, href, children }: PageHeaderProps) => {
  return (<Link href={href}>
    <div className={"flex items-center"}>
      <div className={"w-[1.875rem] h-[1.875rem] bg-grey rounded-full flex-center"}>
        <Icon icon={"carat_left"} />
      </div>
      <Icon icon={iconName} size={3.4375} className={"ml-6"} />
      <span className={"ml-1"}>{children}</span>
    </div>
  </Link>);
};

export default PageHeader;