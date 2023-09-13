import Input from '@/src/components/Input';
import Icon from '@/src/components/icons/Icon';
import Tag from './Tag';
import { useState, useEffect } from 'react';
import { ITag } from "@/src/models/Tag";

export default function LobbyRepresentation() {
  const [profileTags, setProfileTags] = useState([
    { name: 'POC Gamers', rainbow: true },
    { name: 'LGBTQ+', rainbow: false },
    { name: 'PST', rainbow: false },
    { name: 'Casual Gaming', rainbow: false },
  ]);
  const [suggestedTags, setSuggestedTags] = useState([
    { name: 'Casual Gaming', rainbow: false },
    { name: 'NA Region', rainbow: false },
  ]);

  const [tags, setTags] = useState<ITag[]>([]);

  function fetchTags() {
    fetch('/api/tags')
      .then(res => res.json())
      .then(tags => setTags(tags));
  }

  useEffect(() => {
    fetchTags();
  }, []);

  console.log(tags)

  return (
    <div>
      <h1 className="text-[2.25rem] font-semibold">What does your lobby represent?</h1>
      <h2 className="text-[1.5rem] font-normal my-7">
        This is pulled from your profile. Feel free to edit it out or skip!
      </h2>
      <div className="flex justify-between w-[10] items-center">
        <div className="w-[42.5rem]">
          <h3 className="text-[1rem] font-semibold mb-[1rem]">Name of Lobby</h3>
          <Input icon={<Icon icon={'search'} />} placeholder={'Search Category Tags'} />
        </div>
        <button className="underline font-semibold text-[.875rem]">Clear all</button>
      </div>
      <div className="mt-[2.6rem]">
        <h4 className="mb-[.65rem]">Based on your profile</h4>
        <div className="flex gap-[.75rem]">
          {tags.map((tag, index) => {
            return (
              <Tag key={index} border={tag.rainbow} size="large" icon>
                {tag.name}
              </Tag>
            );
          })}
        </div>
      </div>
      <div className="mt-[1.5rem]">
        <h4 className="mb-[.65rem]">Suggested Tags</h4>
        <div className="flex gap-[.75rem] flex-wrap w-[100%]">
          {suggestedTags.map((tag, index) => {
            return (
              <Tag key={index} border={tag.rainbow} size="large" icon>
                {tag.name}
              </Tag>
            );
          })}
        </div>
      </div>
    </div>
  );
}
