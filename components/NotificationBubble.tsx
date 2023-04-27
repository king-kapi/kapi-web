import { Icon } from '@iconify/react';
import styles from '../styles/Notification.module.css';
import { Notification } from '@/src/types/Notification';

type NotificationBubbleProps = {
  notification: Notification
}

function NotificationBubble({ notification }: NotificationBubbleProps) {

  // timestamp logic //
  // TODO: remove manual computation, use moment js instead or the builtin Intl api
  let timestamp = notification.timestamp;
  let timestampMessage;
  if (timestamp >= 1440) {
    timestamp = Math.floor(timestamp / 1440);
    if (timestamp === 1) timestampMessage = timestamp + ' day ago';
    else timestampMessage = timestamp + ' days ago';
  } else if (timestamp >= 60) {
    timestamp = Math.floor(timestamp / 60);
    if (timestamp === 1) timestampMessage = timestamp + ' hour ago';
    else timestampMessage = timestamp + ' hours ago';
  } else timestampMessage = timestamp + ' minutes ago';

  return (
    <div className={styles.Container}>
      <div className={styles.IconContainer}>
        <Icon icon={notification.icon} className={styles.Icon} />
      </div>
      <div className={styles.MessageContainer}>
        <p className={styles.Message}>
          <span style={{ fontWeight: '600' }}>{notification.messageHighlight}</span>
          {' ' + notification.mainMessage}
        </p>
        <p className={styles.Timestamp}>{timestampMessage}</p>
      </div>
      <div className={styles.PartySizeContainer}>
        {notification.partySize && (
          <p className={styles.PartySize}>
            {notification.partySize + '/' + notification.maxPartySize}
          </p>
        )}
      </div>
    </div>
  );
}

export default NotificationBubble;
