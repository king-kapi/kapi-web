import { IMessagePopulated } from "../../models/Message";
import Avatar from "@/src/components/Avatar";

export interface ReceiveBubbleProps {
  message: IMessagePopulated;
}

const ReceiveBubble = ({ message }: ReceiveBubbleProps) => {
  return (
    <div className={"flex justify-start items-end gap-3"}>
      <div>
        <Avatar className={"w-[3.75rem]"} c={message.sender.avatarColor || "#ffffff"} />
      </div>
      <div className={"flex flex-col gap-3"}>
        <div className={"text-left"}>
          {message.sender.username}
        </div>
        <div className={"p-3 bg-grey rounded-lg w-[18.75rem]"}>
          {message.content}
        </div>
      </div>
    </div>
  );
};

export default ReceiveBubble;