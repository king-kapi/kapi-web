import Message from '../../types/Message';
import Avatar from '@/src/components/Avatar';
import WithUser from "@/src/components/misc/WithUser";

export interface SenderBubbleProps {
  message: Message;
}

const SenderBubble = ({ message }: SenderBubbleProps) => {
  return (
    <WithUser userId={message.senderId}>
      {(sender) => (
        <div className={"flex justify-end items-end gap-3"}>
          <div className={"flex flex-col gap-3"}>
            <div className={"text-right"}>
              {sender.username}
            </div>
            <div className={"p-3 bg-blue-500 rounded-lg w-[18.75rem]"}>
              {message.message}
            </div>
          </div>
          <div>
            <Avatar className={"w-[3.75rem]"} c={sender.avatarColor || "#ffffff"} />
          </div>
        </div>
      )}
    </WithUser>
  );
};

export default SenderBubble;