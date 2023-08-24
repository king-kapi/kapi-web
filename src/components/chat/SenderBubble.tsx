import { IMessagePopulated } from "../../models/Message";
import Avatar from "@/src/components/Avatar";

export interface SenderBubbleProps {
  message: IMessagePopulated;
}

const SenderBubble = ({ message }: SenderBubbleProps) => {
  return (
    <div className={"flex justify-end items-end gap-3"}>
      <div className={"flex flex-col gap-3"}>
        <div className={"text-right"}>
          {message.sender.username}
        </div>
        <div className={"p-3 bg-blue-500 rounded-lg w-[18.75rem]"}>
          {message.content}
        </div>
      </div>
      <div>
        <Avatar className={"w-[3.75rem]"} c={message.sender.avatarColor || "#ffffff"} />
      </div>
    </div>
  );
};

export default SenderBubble;