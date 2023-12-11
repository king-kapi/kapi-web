import DevLayout from "@/src/components/layouts/DevLayout";
import {atomsWithMutation, atomsWithQuery} from "jotai-tanstack-query";
import {ITag} from "@/src/models/Tag";
import Input from "@/src/components/Input";
import Button from "@/src/components/Button";
import React, {useCallback, useRef} from "react";
import {useAtom} from "jotai";
import Tag from "@/src/components/Tag";

const [, tagsStatusAtom] = atomsWithQuery(() => ({
  queryKey: ["devAllTags"],
  queryFn: async () => {
    const res = await fetch('/api/tags');
    if (!res.ok)
      throw await res.json();
    return await res.json() as ITag[];
  }
}));

const [, createTagStatusAtom] = atomsWithMutation(() => ({
  mutationKey: ["devCreateTag"],
  mutationFn: async (tag: Partial<ITag>) => {
    const res = await fetch('/api/tags', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tag)
    });

    if (!res.ok)
      throw await res.json();
    return await res.json() as ITag;
  }
}));

const [, deleteTagStatusAtom] = atomsWithMutation(() => ({
  mutationKey: ["devDeleteTag"],
  mutationFn: async (tagId: string) => {
    const res = await fetch(`/api/tags/${tagId}`, {
      method: "DELETE"
    });

    if (!res.ok)
      throw await res.text();
    return await res.text();
  }
}));

const TagsDevPage = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [tagsStatus, dispatchTag] = useAtom(tagsStatusAtom);
  const [createTagStatus, createTag] = useAtom(createTagStatusAtom);
  const [deleteTagStatus, deleteTag] = useAtom(deleteTagStatusAtom);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("tag") as string | undefined;
    const rainbow = formData.get("rainbow") === "on";

    if (!name) return;

    await createTag([{
      name, rainbow
    }]);

    if (formRef.current)
      formRef.current.reset();

    dispatchTag({type: "refetch"});
  }, [createTag, dispatchTag]);

  const handleDelete = useCallback(async (tagId: string) => {
    await deleteTag([tagId]);

    dispatchTag({type: "refetch"});
  }, [deleteTag, dispatchTag]);

  return (
    <div>
      <h2>All Tags</h2>
      <div className={"flex flex-wrap gap-2 mt-2"}>
        {tagsStatus.data && tagsStatus.data.map(tag => (
          <Tag border={tag.rainbow} icon={true} onIconClick={() => handleDelete(tag._id.toString())}
               key={tag._id.toString()}>{tag.name}</Tag>
        ))}
      </div>

      <h2 className={"mt-8"}>Create Tag</h2>

      <form className={"w-full max-w-xl flex flex-col gap-4 items-start"} onSubmit={handleSubmit} ref={formRef}>
        <div className={"w-full"}>
          <label>Tag Name</label>
          <Input name={"tag"} className={"w-full"}/>
        </div>

        <div>
          <label>Rainbow</label>
          <input name={"rainbow"} type={"checkbox"} className={"ml-2"}/>
        </div>

        <Button type={"submit"}>
          {createTagStatus.isLoading ? "Loading" : "Create"}
        </Button>
      </form>
    </div>
  )
}

TagsDevPage.getLayout = DevLayout.getLayout("/dev-pages");

export default TagsDevPage;