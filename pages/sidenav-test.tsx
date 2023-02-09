import { Icon } from '@iconify/react'

function SideNavTest() {
  return (
    <div className="side-nav">
      <section className="white-section">
        <span className="header">
          <div className="avatar-div">
            <div>
              <div className="avatar"></div>
            </div>
            <h1 className="menu-words">Logo</h1>
          </div>
          <div>
            <Icon icon="mdi:bell" className="bell" />
          </div>
        </span>
        <div className="menu">
          <a href="">
            <Icon icon="mdi:house-circle" color="#222" className="icon" />
            <span className="menu-words">Home</span>
          </a>
          <a href="">
            <Icon icon="mdi:sword-cross" color="#939393" className="icon" />
            <span className="menu-words">Party Finder</span>
          </a>
          <a href="">
            <Icon icon="fa-solid:user-friends" color="#939393" className="icon" />
            <span className="menu-words">Community</span>
          </a>
          <a href="">
            <Icon icon="ph:sparkle-fill" color="#939393" className="icon" />
            <span className="menu-words">For You</span>
          </a>
        </div>
      </section>
      <section className="gray-section">
        <h1>
          Friends - <span>9/26</span>
        </h1>
        <ul>
          <li>
            <Icon icon="mdi:user-circle" className="friends-avatar" />
            <span>Jane Doe</span>
          </li>
          <li>
            <Icon icon="mdi:user-circle" className="friends-avatar" />
            <span>Jane Doe</span>
          </li>
          <li>
            <Icon icon="mdi:user-circle" className="friends-avatar" />
            <span>Jane Doe</span>
          </li>
          <li>
            <Icon icon="mdi:user-circle" className="friends-avatar" />
            <span>Jane Doe</span>
          </li>
          <li>
            <Icon icon="mdi:user-circle" className="friends-avatar" />
            <span>Jane Doe</span>
          </li>
        </ul>
      </section>
      <section className="black-section">
        <div className="status-container">
          <Icon icon="mdi:user-circle" className="user-avatar" />
          <div>
            <span>Username</span>
            <span>
              Online{' '}
              <span>
                <Icon icon="material-symbols:keyboard-arrow-down-rounded" className="expand" />
              </span>
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}

export { SideNavTest }
