import { atom } from "jotai";
import User from "@/src/types/User";

const onboardingUserDataAtom = atom<Partial<User>>({});

export default onboardingUserDataAtom;