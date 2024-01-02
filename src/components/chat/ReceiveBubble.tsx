import Message from '@/src/types/Message';
import Avatar from '@/src/components/Avatar';
import WithUser from '../misc/WithUser';

export interface ReceiveBubbleProps {
  message: Message;
}

const ReceiveBubble = ({ message }: ReceiveBubbleProps) => {
  return (
    <WithUser userId={message.senderId}>
      {sender => (
        <div className={'flex justify-start items-end gap-3'}>
          <div>
            <Avatar className={'w-[3.75rem]'} c={sender.avatarColor || '#ffffff'} />
          </div>
          <div className={'flex flex-col gap-3'}>
            <div className={'text-left'}>{sender.username}</div>
            <div className={'p-3 bg-grey rounded-lg w-[18.75rem]'}>{message.message}</div>
          </div>
        </div>
      )}
    </WithUser>
  );
};

export default ReceiveBubble;
