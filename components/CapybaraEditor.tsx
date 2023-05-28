import { useEffect, useState } from 'react';
import Image from 'next/image';
import ColorWheel from '@uiw/react-color-wheel';
import Button from '@/components/Button';

const CapybaraEditor = () => {
  function getRandomColor(): string {
    return `#${Math.floor(Math.random() * 0x1000000)
      .toString(16)
      .padStart(6, '0')}`;
  }
  const [color, setColor] = useState(getRandomColor());

  return (
    <div className="flex flex-row items-center justify-evenly">
      <div className="flex flex-col items-center space-y-3">
        <h6>Your Avatar</h6>
        <div
          className="rounded-full flex align-middle justify-center w-40 h-40"
          style={{ backgroundColor: color }}
        >
          <Image src={'/capybara.svg'} height={100} width={100} alt="Capybara" />
        </div>
      </div>

      <div className="flex flex-col items-center space-y-3">
        <h6>Drag on your color of choice</h6>
        <ColorWheel
          color={color}
          onChange={color => {
            setColor(color.hex);
          }}
          width={160}
          height={160}
        />
      </div>
    </div>
  );
};

const OnboardingEditorPage = () => {
  return (
    <div className="shadow-sm flex flex-col space-y-10  bg-grey rounded-md p-4">
      <div>
        <h2>Let&apos;s Create an Avatar</h2>
        <h3>Customize the color of your capybara</h3>
      </div>
      <CapybaraEditor />

      <div className="flex flex-row justify-between ml-2 mr-2">
        <Button>Back</Button>
        <Button>Next</Button>
      </div>
    </div>
  );
};

export { OnboardingEditorPage };
