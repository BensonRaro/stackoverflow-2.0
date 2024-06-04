import { currentUser } from "@clerk/nextjs/server";

import TagCard from "@/components/TagCard";
import { Drizzle } from "@/drizzle";
import AddTag from "@/components/AddTag";

const RightSidebar = async () => {
  const db = await Drizzle();
  // const user = await currentUser();
  // if (!user) return null;
  const Tags = await db.query.Tags.findMany({
    where: (tag, { eq }) => eq(tag.clerkId, "tffyghuj"),
  });
  const userTags = Tags.filter((tag) => tag.questionId === "");
  // console.log(userTags);
  return (
    <div className="dark:bg-background bg-light-800 custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <h1 className="h3-bold text-dark200_light900">Your Tags</h1>
      {userTags.length === 0 && (
        <div className="text-neutral-400 mt-2">You have No Tags</div>
      )}
      <AddTag />
      <div className="flex flex-col gap-2 mt-2">
        {userTags.map((tag) => (
          <TagCard key={tag.id} tag={tag.tag} id={tag.id} use="RightSidebar" />
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;
