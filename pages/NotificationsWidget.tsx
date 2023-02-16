import styles from '../styles/NotificationsWidget.module.css';  
import { Notification } from '@/src/models/Notification';
import { NotificationBubble } from './notificationBubble';

type NotificationsWidgetProps = {
  notifications: Notification[];
};

function NotificationsWidget({ notifications }: NotificationsWidgetProps) {
  return (
    <div className={styles.notificationsWidgetContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.serverContentContainer}>
          <div className={styles.serverContainer}>
            <div className={styles.serverImg}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="123"
                height="89"
                viewBox="0 0 123 89"
                fill="none"
              >
                <path d="M121.318 1.04297V87.3739H1.79883V1.04297H121.318Z" fill="#F0F0F0" />
                <path
                  d="M1.79883 1.04297L121.318 87.3739M1.79883 1.04297V87.3739M1.79883 1.04297H121.318M121.318 87.3739V1.04297M121.318 87.3739H1.79883M121.318 1.04297L1.79883 87.3739"
                  stroke="#777777"
                  stroke-width="2"
                />
              </svg>
            </div>
            <div className={styles.serverName}>Server Name</div>
            <div className={styles.serverUpdate}># new posts</div>
          </div>
          <div className={styles.serverContainer}>
            <div className={styles.serverImg}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="123"
                height="89"
                viewBox="0 0 123 89"
                fill="none"
              >
                <path d="M121.318 1.04297V87.3739H1.79883V1.04297H121.318Z" fill="#F0F0F0" />
                <path
                  d="M1.79883 1.04297L121.318 87.3739M1.79883 1.04297V87.3739M1.79883 1.04297H121.318M121.318 87.3739V1.04297M121.318 87.3739H1.79883M121.318 1.04297L1.79883 87.3739"
                  stroke="#777777"
                  stroke-width="2"
                />
              </svg>
            </div>
            <div className={styles.serverName}>Server Name</div>
            <div className={styles.serverUpdate}># new posts</div>
          </div>
          <div className={styles.serverContainer}>
            <div className={styles.serverImg}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="123"
                height="89"
                viewBox="0 0 123 89"
                fill="none"
              >
                <path d="M121.318 1.04297V87.3739H1.79883V1.04297H121.318Z" fill="#F0F0F0" />
                <path
                  d="M1.79883 1.04297L121.318 87.3739M1.79883 1.04297V87.3739M1.79883 1.04297H121.318M121.318 87.3739V1.04297M121.318 87.3739H1.79883M121.318 1.04297L1.79883 87.3739"
                  stroke="#777777"
                  stroke-width="2"
                />
              </svg>
            </div>
            <div className={styles.serverName}>Server Name</div>
            <div className={styles.serverUpdate}># new posts</div>
          </div>
        </div>
        <div className={styles.notificationContentContainer}>
          {notifications.map((notification, index) => (
            <NotificationBubble key={index} notification={notification} />
          ))}
        </div>
      </div>
      <a className={styles.titleContainer}>
        <h1>WHAT YOU MISSED WHILE YOU WERE GONE {'>'}</h1>
        <h2>Notifications</h2>
      </a>
    </div>
  );
}

export { NotificationsWidget };
