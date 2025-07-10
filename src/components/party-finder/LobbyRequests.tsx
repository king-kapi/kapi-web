import { ILobbyPopulated } from "@/src/models/Lobby";
import { useSession } from "next-auth/react";
import { useMolecule } from "jotai-molecules";
import LobbyMolecule from "@/src/state/LobbyMolecule";
import Icon from "../icons/Icon";
import Avatar from "../Avatar";
import IconButton from "@/src/components/atoms/IconButton";
import { useCallback } from "react";
import { useAtom } from "jotai/index";
import IconSpinner from "@/src/components/atoms/IconSpinner";

const LobbyRequests = ({ lobby }: {
  lobby: ILobbyPopulated
}) => {
  const userId = useSession()?.data?.id;

  // const isHost = lobby.hostId.toString() === userId;
  const inParty = lobby.users.filter(user => user._id.toString() === userId).length > 0;

  if (inParty) return <LobbyHostView />;
  return <LobbyNotJoinedView />;
};

const LobbyHostView = () => {
  const { lobbyStatusAtom, lobbyRequestAcceptStatusAtom, lobbyRequestDenyStatusAtom } = useMolecule(LobbyMolecule);
  const [lobbyStatus, dispatchLobby] = useAtom(lobbyStatusAtom);
  const [lobbyAcceptStatus, acceptRequest] = useAtom(lobbyRequestAcceptStatusAtom);
  const [lobbyDenyStatus, denyRequest] = useAtom(lobbyRequestDenyStatusAtom);

  const requests = lobbyStatus.data?.requests;

  const handleAccept = useCallback(async (requestId: string) => {
    await acceptRequest([requestId]);

    dispatchLobby({ type: "refetch" });
  }, [acceptRequest, dispatchLobby]);

  const handleDeny = useCallback(async (requestId: string) => {
    await denyRequest([requestId]);

    dispatchLobby({ type: "refetch" });
  }, [denyRequest, dispatchLobby]);

  if (!requests) return null;

  return (
    <div className={"flex flex-col justify-end h-full p-8 gap-8"}>
      {...requests.map(request => (
        <div key={request._id.toString()} className={"flex flex-col bg-mediumGrey rounded-lg overflow-hidden"}>
          <div className={"flex px-5 py-6 gap-5"}>
            <div>
              <Avatar c={request.sender.avatarColor} className={"w-[3.75rem] h-[3.75rem]"} />
            </div>
            <div className={"flex-auto flex flex-col"}>
              <div className={"flex"}>
                <div className={"flex-auto"}>
                  <div className={"description-strong"}>
                    {request.sender.username}
                  </div>

                  <div className={"header-4"}>
                    Role | Experience
                  </div>
                </div>
                <div className={"flex"}>
                  <IconButton icon={"toggle_horizontal"} />
                  <IconButton icon={"carat_down_large"} />
                </div>
              </div>

              <div>
                {request.message}
              </div>
            </div>
          </div>
          <div className={"flex text-black text-center"}>
            <button className={"flex-1 flex items-center justify-center gap-2 bg-status-green py-3"}
                    onClick={() => handleAccept(request._id.toString())}>
              {lobbyAcceptStatus.isLoading ? <IconSpinner /> : <Icon icon={"add"} />} Accept
            </button>
            <button className={"flex-1 flex items-center justify-center gap-2 bg-status-red py-3"}
                    onClick={() => handleDeny(request._id.toString())}>
              {lobbyDenyStatus.isLoading ? <IconSpinner /> : <Icon icon={"deny_default"} />}
              Deny
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const LobbyNotJoinedView = () => {
  return (
    <div className={"flex flex-col justify-end h-full"}>
      hi
    </div>
  );
};

export default LobbyRequests;