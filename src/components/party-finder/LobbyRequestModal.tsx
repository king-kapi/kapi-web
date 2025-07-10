import BaseModal, { BaseModalProps } from "@/src/components/modal/BaseModal";
import { Dialog } from "@headlessui/react";
import Button from "../Button";
import Input from "../Input";
import TextArea from "@/src/components/forms/TextArea";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useMolecule } from "jotai-molecules";
import LobbyMolecule from "@/src/state/LobbyMolecule";
import { useAtom, useSetAtom } from "jotai/index";
import IconSpinner from "@/src/components/atoms/IconSpinner";

const requestMessagePlaceholder = "Hi i’m ____, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const LobbyRequestModal = (props: BaseModalProps) => {
  const {onClose} = props;
  
  const { lobbyStatusAtom, lobbyRequestStatusAtom } = useMolecule(LobbyMolecule);
  const dispatchLobby = useSetAtom(lobbyStatusAtom);
  const [sendRequestStatus, sendRequest] = useAtom(lobbyRequestStatusAtom);

  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const nickname = formData.get("nickname");
    const ign = formData.get("ign");
    const experience = formData.get("experience");
    const role = formData.get("role");
    const message = formData.get("message") as string;

    if (!nickname || nickname.length === 0) {
      setError("Please enter a nickname");
      return;
    }

    if (!ign || ign.length === 0) {
      setError("Please enter your in game name");
      return;
    }
    setError(null);

    await sendRequest([message]);

    dispatchLobby({ type: "refetch" });
    onClose();
  }, [dispatchLobby, onClose, sendRequest]);

  // reset state
  useEffect(() => {
    if (!props.open) return;

    setError(null);
    if (formRef.current) formRef.current.reset();
  }, [props.open]);

  return (
    <BaseModal {...props} panelClassName={"p-16 theme-blue"}>
      <Dialog.Title className={"flex justify-between items-center w-[40rem]"}>
        Request to Join
        <Button icon={"deny_default"} buttonType={"transparent"} />
      </Dialog.Title>
      <p>Want to change your player info for this lobby?</p>
      <form className={"space-y-6 mt-10"} onSubmit={handleSubmit} ref={formRef}>
        <div>
          <label className={"form-label"}>Nickname</label>
          <Input name={"nickname"} />
        </div>

        <div>
          <label className={"form-label"}>In Game Name</label>
          <Input placeholder={"This is not shown until you join the lobby"} name={"ign"} />
        </div>

        <div className={"flex gap-8"}>
          <div className={"flex-1"}>
            <label className={"form-label"}>Experience (Optional)</label>
            <Input placeholder={"Level, rank, etc."} name={"experience"} />
          </div>

          <div className={"flex-1"}>
            <label className={"form-label"}>Role (Optional)</label>
            <Input placeholder={"Role, position, etc."} name={"role"} />
          </div>
        </div>

        <div>
          <label className={"form-label"}>Request Message (Optional)</label>
          <TextArea style={{
            minHeight: "6rem"
          }} placeholder={requestMessagePlaceholder} name={"message"} />
        </div>

        {error && <div className={"text-red-500"}>
          {error}
        </div>}

        <div className={"flex justify-end !mt-10"}>
          <Button buttonType={"primary"} className={"w-[12.25rem]"} type={"submit"}>
            {sendRequestStatus.isLoading && <IconSpinner />}
            Send Request
          </Button>
        </div>
      </form>
    </BaseModal>
  );
};

export default LobbyRequestModal;