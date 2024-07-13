import { currentUser } from "@clerk/nextjs/server";
import { FaBarsStaggered } from "react-icons/fa6";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import TagCard from "@/components/TagCard";
import AddTag from "@/components/AddTag";
import { db } from "@/lib/db";

const RightNav = async () => {
  const user = await currentUser();
  // if (!user) return null;

  const Tags = await db.tag.findMany({
    where: {
      questionId: null,
      userId: user?.id,
    },
  });
  return (
    <Sheet>
      <SheetTrigger asChild>
        <FaBarsStaggered className="size-6 cursor-pointer block md:hidden" />
      </SheetTrigger>
      <SheetContent side="right" className="border-none">
        <div className="custom-scrollbar flex flex-col overflow-y-auto pt-4 shadow-light-300 dark:shadow-none">
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
      </SheetContent>
    </Sheet>
  );
};

export default RightNav;
