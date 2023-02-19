import { Icon } from '@iconify/react'
import styles from '@/styles/Sidenav.module.css'

function SideNav() {
  return (
    <div className={styles.Sidenav}>
      <section className={styles.Sidenav_whitesection}>
        <span className={styles.Sidenav_header}>
          <div className={styles.Sidenav_avatardiv}>
            <div>
              <div className={styles.Sidenav_avatar}></div>
            </div>
            <h1 className={styles.Sidenav_menuwords}>Logo</h1>
          </div>
          <div>
            <Icon icon="mdi:bell" className={styles.Sidenav_bell} />
          </div>
        </span>
        <div className={styles.Sidenav_menu}>
          <a href="">
            <Icon icon="mdi:house-circle" color="#222" className={styles.Sidenav_icon} />
            <span className={styles.Sidenav_menuwords}>Home</span>
          </a>
          <a href="">
            <Icon icon="mdi:sword-cross" color="#939393" className={styles.Sidenav_icon} />
            <span className={styles.Sidenav_menuwords}>Party Finder</span>
          </a>
          <a href="">
            <Icon icon="fa-solid:user-friends" color="#939393" className={styles.Sidenav_icon} />
            <span className={styles.Sidenav_menuwords}>Community</span>
          </a>
          <a href="">
            <Icon icon="ph:sparkle-fill" color="#939393" className={styles.Sidenav_icon} />
            <span className={styles.Sidenav_menuwords}>For You</span>
          </a>
        </div>
      </section>
      <section className={styles.Sidenav_graysection}>
        <h1>
          Friends - <span>9/26</span>
        </h1>
        <ul>
          <li>
            <Icon icon="mdi:user-circle" className={styles.Sidenav_friendsavatar} />
            <span>Jane Doe</span>
          </li>
          <li>
            <Icon icon="mdi:user-circle" className={styles.Sidenav_friendsavatar} />
            <span>Jane Doe</span>
          </li>
          <li>
            <Icon icon="mdi:user-circle" className={styles.Sidenav_friendsavatar} />
            <span>Jane Doe</span>
          </li>
          <li>
            <Icon icon="mdi:user-circle" className={styles.Sidenav_friendsavatar} />
            <span>Jane Doe</span>
          </li>
          <li>
            <Icon icon="mdi:user-circle" className={styles.Sidenav_friendsavatar} />
            <span>Jane Doe</span>
          </li>
        </ul>
      </section>
      <section className={styles.Sidenav_blacksection}>
        <div className={styles.Sidenav_statuscontainer}>
          <Icon icon="mdi:user-circle" className={styles.Sidenav_useravatar} />
          <div>
            <span>Username</span>
            <span>
              Online{' '}
              <span>
                <Icon icon="material-symbols:keyboard-arrow-down-rounded" className={styles.Sidenav_expand} />
              </span>
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SideNav;
