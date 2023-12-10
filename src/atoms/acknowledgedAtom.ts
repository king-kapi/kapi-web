import {atomWithStorage} from "jotai/utils"

const acknowledgedAtom = atomWithStorage("acknowledged", false);

export default acknowledgedAtom;