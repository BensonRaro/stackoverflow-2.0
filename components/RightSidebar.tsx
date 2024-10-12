import { SignedIn, SignedOut } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import TagCard from "@/components/TagCard";
import AddTag from "@/components/AddTag";

const RightSidebar = async () => {
  const user = await currentUser();
  // if (!user) return null;

  const Tags = await db.tag.findMany({
    where: {
      questionId: null,
      userId: user?.id,
    },
  });
  // const userTags = Tags.filter((tag) => tag.questionId === "");
  // console.log(Tags);
  return (
    <>
      <SignedOut>
        <div className="dark:dark-gradient bg-light-800 custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
          <h2 className="text-neutral-400 text-xl font-semibold mt-4 items-center justify-center flex">
            Sign In to Add Your Tags
          </h2>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="dark:dark-gradient bg-light-800 custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
          <h1 className="h3-bold text-dark200_light900">Your Tags</h1>
          {Tags.length === 0 && (
            <div className="text-neutral-400 mt-2">You have No Tags</div>
          )}
          <AddTag />
          <div className="flex flex-col gap-2 mt-2">
            {Tags.map((tag) => (
              <TagCard
                key={tag.id}
                tag={tag.tag}
                id={tag.id}
                use="RightSidebar"
              />
            ))}
          </div>
        </div>
      </SignedIn>
    </>
  );
};

export default RightSidebar;
