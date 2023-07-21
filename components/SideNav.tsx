import { Icon } from "@iconify/react";
import styles from "@/styles/Sidenav.module.css";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

function SideNav() {
  const [onlineStatus, setOnlineStatus] = useState("1");
  const { data, isLoading, isError, error } = useQuery("userInfo", () =>
    fetch(`/api/users/current`).then(res => res.json())
  );

  const handleChange = (e: any) => {
    setOnlineStatus(e.target.value);
  };

  const {
    asPath, // the value: "/question/how-do-you-get-the-current-url-in-nextjs/"
    pathname // the value: "/question/[slug]"
  } = useRouter();

  const [mode, setMode] = useState("dark");

  function getCurrentStatus() {
    if (onlineStatus === "1") {
      return styles.statusOnline;
    } else if (onlineStatus === "2") {
      return styles.statusIdle;
    } else {
      return styles.statusOffline;
    }
  }

  function fetchFriends() {
    // const friends = data.friends;
    // const friendsList = friends.map((friend: { id: string, username: string }) => (
    //   <li key={friend.id}>
    //     <div className={styles.friendsAvatar}>
    //       <div className={styles.statusOnline}></div>
    //     </div>
    //     <span>{friend.username}</span>
    //   </li>
    // ));
    // return (
    //   <div>
    //     <h1>
    //       Friends - <span>{friends.length}/26</span>
    //     </h1>
    //     <ul>{friendsList}</ul>
    //   </div>
    // );
  }

  function fetchUser() {
    const user = data;
    return <span className={styles.userName}>{`${user.username}#${user.tag}`}</span>;
  }

  if (isLoading) {
    return (
      <div className={styles.sidenav}>
        <style>{`/* width */
      ::-webkit-scrollbar {
        width: 10px;
      }
      /* Track */
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: #1a1b1e;;
        border-radius: 10px
      }
      /* Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
        background: #333333;
      }`}</style>
        <section className={[styles.whiteSection, "bg-darkGrey"].join(" ")}>
          <span className={styles.header}>
            <div className={styles.avatarDiv}>
              <div>
                <div className={styles.avatar}></div>
              </div>
            </div>
            <div>
              <Icon icon="mdi:bell" className={styles.bell} />
            </div>
          </span>
          <div className={styles.menu}>
            <a className={styles.homeTab}>
              <div className={pathname.includes("Home") ? styles.selected : styles.notSelected}>
                <Icon
                  icon="mdi:house"
                  color={pathname.includes("Home") ? "#FFFFFF" : "#939393"}
                  className={styles.homeIcon}
                />
              </div>
              <span className={styles.homeTabWord}>Home</span>
            </a>
            <a href="/party-finder" className={styles.partyFinderTab}>
              <div
                className={pathname.includes("partyfinder") ? styles.selected : styles.notSelected}
              >
                <Icon
                  icon="mdi:sword-cross"
                  color={pathname.includes("partyfinder") ? "#FFFFFF" : "#939393"}
                  className={styles.partFinderIcon}
                />
              </div>
              <span className={styles.partyFinderTabWord}>Party Finder</span>
            </a>
            <a className={styles.communityTab}>
              <div
                className={pathname.includes("community") ? styles.selected : styles.notSelected}
              >
                <Icon
                  icon="fa-solid:user-friends"
                  color={pathname.includes("community") ? "#FFFFFF" : "#939393"}
                  className={styles.communityIcon}
                />
              </div>
              <span className={styles.communityTabWord}>Community</span>
            </a>
            <a className={styles.forYouTab}>
              <div className={pathname.includes("foryou") ? styles.selected : styles.notSelected}>
                <Icon
                  icon="ph:sparkle-fill"
                  color={pathname.includes("foryou") ? "#FFFFFF" : "#939393"}
                  className={styles.forYouIcon}
                />
              </div>
              <span className={styles.forYouTabWord}>For You</span>
            </a>
          </div>
        </section>
        <section className={[styles.graySection, "bg-mediumGrey"].join(" ")}>
          <h1>
            Friends - <span>9/26</span>
          </h1>
        </section>
        <section className={[styles.blackSection, "bg-darkGrey"].join(" ")}>
          <div className={styles.statusContainer}>
            <div className={styles.userAvatar}>
              <div className={getCurrentStatus()}></div>
            </div>
            <div className={styles.userNameContainer}>
              <span className={styles.userName}>Username</span>
              <select
                name="status"
                className={styles.status}
                id="status"
                onChange={e => handleChange(e)}
              >
                <option value="1">Online</option>
                <option value="2">Idle</option>
                <option value="3">Offline</option>
              </select>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (isError) {
    return <span>Error fetching data</span>;
  }

  return (
    <div className={[styles.sidenav, `theme-${mode}`].join(" ")}>
      <style>{`/* width */
        ::-webkit-scrollbar {
          width: 10px;
        }
        /* Track */
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        /* Handle */
        ::-webkit-scrollbar-thumb {
          background: #1a1b1e;;
          border-radius: 10px
        }
        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
          background: #333333;
        }`}</style>
      <section className={[styles.whiteSection, "bg-darkGrey"].join(" ")}>
        <span className={styles.header}>
          <div className={styles.avatarDiv}>
            <div>
              <div className={styles.avatar}></div>
            </div>
          </div>
          <div>
            <Icon icon="mdi:bell" color="#FFFFFF" className={styles.bell} />
          </div>
        </span>
        <div className={styles.menu}>
          <a className={styles.homeTab} href="/">
            <div
              className={[
                pathname === "/" ? styles.selected : styles.notSelected,
                "bg-pink-500"
              ].join(" ")}
            >
              <Icon icon="mdi:house" color="#FFFFFF" className={styles.homeIcon} />
            </div>
            <span className={styles.homeTabWord}>Home</span>
          </a>
          <a href="/party-finder" className={styles.partyFinderTab}>
            <div
              className={[
                pathname.includes("partyfinder") ? styles.selected : styles.notSelected,
                "bg-blue-100"
              ].join(" ")}
            >
              <Icon icon="mdi:sword-cross" color="#FFFFFF" className={styles.partFinderIcon} />
            </div>
            <span className={styles.partyFinderTabWord}>Party Finder</span>
          </a>
          <a className={styles.communityTab} href="/community">
            <div
              className={[
                pathname.includes("community") ? styles.selected : styles.notSelected,
                "bg-cyan-500"
              ].join(" ")}
            >
              <Icon icon="fa-solid:user-friends" color="#FFFFFF" className={styles.communityIcon} />
            </div>
            <span className={styles.communityTabWord}>Community</span>
          </a>
          <a className={styles.forYouTab} href="/foryou">
            <div
              className={[
                pathname.includes("foryou") ? styles.selected : styles.notSelected,
                "bg-yellow-500"
              ].join(" ")}
            >
              <Icon icon="ph:sparkle-fill" color="#FFFFFF" className={styles.forYouIcon} />
            </div>
            <span className={styles.forYouTabWord}>For You</span>
          </a>
        </div>
      </section>
      <section className={[styles.graySection, "bg-mediumGrey"].join(" ")}>
        {/*{fetchFriends()}*/}
      </section>
      <section className={[styles.blackSection, "bg-darkGrey"].join(" ")}>
        <div className={styles.statusContainer}>
          <div className={styles.userAvatar}>
            <div className={getCurrentStatus()}></div>
          </div>
          <div className={styles.userNameContainer}>
            {fetchUser()}
            <select
              name="status"
              className={[styles.status, "bg-darkGrey"].join(" ")}
              id="status"
              onChange={e => handleChange(e)}
            >
              <option value="1">Online</option>
              <option value="2">Idle</option>
              <option value="3">Offline</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SideNav;
