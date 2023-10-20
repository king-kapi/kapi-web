import {atom} from "jotai";
import User from "@/src/types/User";

const meAtom = atom<User | null>(null);

export default meAtom;