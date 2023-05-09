import styles from "@/styles/Icon.module.css";

import add_friend from "@/assets/icons/add_friend.svg";
import edit_pencil from "@/assets/icons/edit_pencil.svg";
import toggle_vertical from "@/assets/icons/toggle_vertical.svg";
import exit from "@/assets/icons/exit.svg";
import pin from "@/assets/icons/pin.svg";
import add from "@/assets/icons/add.svg";
import deny_default from "@/assets/icons/deny_default.svg";
import deny_small from "@/assets/icons/deny_small.svg";
import reply from "@/assets/icons/reply.svg";
import reroll from "@/assets/icons/reroll.svg";
import search from "@/assets/icons/search.svg";
import list_view from "@/assets/icons/list_view.svg";
import crown from "@/assets/icons/crown.svg";
import carat_down from "@/assets/icons/carat_down.svg";
import carat_up from "@/assets/icons/carat_up.svg";
import carat_left from "@/assets/icons/carat_left.svg";
import carat_right from "@/assets/icons/carat_right.svg";
import carat_down_large from "@/assets/icons/carat_down_large.svg";
import carat_up_large from "@/assets/icons/carat_up_large.svg";
import carat_left_large from "@/assets/icons/carat_left_large.svg";
import carat_right_large from "@/assets/icons/carat_right_large.svg";
import Image from "next/image";

export const Icons = {
  ADD_FRIEND: add_friend,
  EDIT_PENCIL: edit_pencil,
  TOGGLE_VERTICAL: toggle_vertical,
  EXIT: exit,
  PIN: pin,
  ADD: add,
  DENY_DEFAULT: deny_default,
  DENY_SMALL: deny_small,
  REPLY: reply,
  REROLL: reroll,
  SEARCH: search,
  LIST_VIEW: list_view,
  CROWN: crown,
  DOWN_CARAT: carat_down,
  UP_CARAT: carat_up,
  LEFT_CARAT: carat_left,
  RIGHT_CARAT: carat_right,
  DOWN_CARAT_LARGE: carat_down_large,
  UP_CARAT_LARGE: carat_up_large,
  LEFT_CARAT_LARGE: carat_left_large,
  RIGHT_CARAT_LARGE: carat_right_large
};

const Icon = ({ icon }: { icon: any }) => {
  return <div className={styles.Icon}>
    <Image src={icon} alt={icon} />
  </div>;
};

export default Icon;