import { Icon } from '@iconify/react';
import styles from '../styles/Notification.module.css';

function NotificationBubble(notifications) {

  // timestamp logic //
  //////////////////////////////////
  let timestamp = notifications.notification.timestamp;
  let timestampMessage;
  if (timestamp >= 1440) {
    timestamp = Math.floor(timestamp / 1440);
    if (timestamp == 1) timestampMessage = timestamp + ' day ago';
    else timestampMessage = timestamp + ' days ago';
  } else if (timestamp >= 60) {
    timestamp = Math.floor(timestamp / 60);
    if (timestamp == 1) timestampMessage = timestamp + ' hour ago';
    else timestampMessage = timestamp + ' hours ago';
  } else timestampMessage = timestamp + ' minutes ago';

  return (
    <div className={styles.notificationContainer}>
      <div className={styles.iconContainer}>
        <Icon icon={notifications.notification.icon} className={styles.icon} />
      </div>
      <div className={styles.messageContainer}>
        <p className={styles.message}>
          <span style={{ fontWeight: '600' }}>{notifications.notification.messageHighlight}</span>
          {' ' + notifications.notification.mainMessage}
        </p>
        <p className={styles.timestamp}>{timestampMessage}</p>
      </div>
      <div className={styles.partyContainer}>
        {notifications.notification.partySize && (
          <p className={styles.party}>
            {notifications.notification.partySize + '/' + notifications.notification.maxPartySize}
          </p>
        )}
      </div>
    </div>
  );
}
export { NotificationBubble };
