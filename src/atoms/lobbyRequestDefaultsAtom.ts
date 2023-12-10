import {atomWithStorage} from "jotai/utils";

const lobbyRequestDefaultsAtom = atomWithStorage("lobby-request-defaults", {
  nickname: "",
  ign: "",
  experience: "",
  role: "",
  message: ""
});

export default lobbyRequestDefaultsAtom;