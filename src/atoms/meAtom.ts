import {atom} from "jotai";
import User from "@/src/types/User";

const meAtom = atom<User>({
  _id: "", bio: "", email: "", onboarded: false, status: 2, tag: "", username: ""
});

export default meAtom;