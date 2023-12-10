import KapiListbox from '@/src/components/forms/KapiListbox';
import { Listbox, Menu, Transition } from '@headlessui/react';
import Icon from '@/src/components/icons/Icon';
import React from 'react';

const LobbyUserOptions = ({ onKick }: { onKick: () => void }) => {
  return (
    <Menu as={'div'} className={'relative'}>
      <Menu.Button className={`flex px-4 py-3 gap-3 bg-mediumGrey text-left rounded-lg w-full`}>
        <Icon icon={'toggle_vertical'} />
      </Menu.Button>

      <Transition
        enter="transition duration-200 ease-out"
        enterFrom="transform -translate-y-2 opacity-0"
        enterTo="transform translate-0 opacity-100"
        leave="transition duration-100 ease-out"
        leaveFrom="transform translate-0 opacity-100"
        leaveTo="transform -translate-y-2 opacity-0"
      >
        <Menu.Items
          as="div"
          className="absolute translate-y-1 flex flex-col bg-darkGrey p-1 rounded-lg overflow-y-auto w-fit right-0"
        >
          <Menu.Item
            as={'div'}
            className={
              'flex items-center px-4 py-3 hover:bg-grey rounded-lg transition-colors duration-100 cursor-pointer ui-selected:bg-blue-500'
            }
            onClick={onKick}
          >
            Kick
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default LobbyUserOptions;
