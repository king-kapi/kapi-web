import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

export interface BaseModalProps extends React.PropsWithChildren {
  open: boolean;
  onClose: () => void;
  panelClassName?: string;
}

const BaseModal = ({
                     open, onClose, panelClassName = "", children
                   }: BaseModalProps) => {
  return (
    <Transition as={Fragment} show={open}>
      <Dialog
        open={open}
        onClose={onClose}
        className="relative z-50"
      >

        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <Transition.Child
          as={Fragment}
          enter="transition duration-100 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition duration-100 ease-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.1)] backdrop-blur-md" aria-hidden="true" />
        </Transition.Child>

        {/* Full-screen container to center the panel */}
        <Transition.Child
          as={Fragment}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-100 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            {/* The actual dialog panel  */}
            <Dialog.Panel className={`mx-auto max-w-full rounded-3xl bg-darkGrey ${panelClassName}`}>
              {children}
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default BaseModal;