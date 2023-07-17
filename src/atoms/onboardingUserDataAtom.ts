import { atom } from "jotai";
import { IUser } from "@/src/models/User";

const onboardingUserDataAtom = atom<Partial<IUser>>({});

export default onboardingUserDataAtom;