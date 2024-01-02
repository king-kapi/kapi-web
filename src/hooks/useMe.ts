import { useAtomValue } from "jotai";
import meAtom from "@/src/atoms/meAtom";

/**
 * useMe will return the current user aka. me
 */
const useMe = () => {
  const me = useAtomValue(meAtom);

  return me;
}

export default useMe;