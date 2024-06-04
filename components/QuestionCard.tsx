import TagCard from "@/components/TagCard";
import { Drizzle } from "@/drizzle";
import Moment from "react-moment";

const QuestionCard = async ({
  question,
  user,
  tags,
}: {
  question: QuestionProps;
  user: UserProps | undefined;
  tags: TagProps[];
}) => {
  const db = await Drizzle();
  const answered = await db.query.Answer.findMany({
    where: (answer, { eq }) => eq(answer.clerkId, user?.clerkId!),
  });
  return (
    <div className="flex gap-3 border-b dark:border-muted pt-3">
      <div className="flex flex-col space-y-2">
        <p>0 votes</p>
        <p>0 answers</p>
        <p>3 views</p>
      </div>
      <div className="space-y-2">
        <h3 className="text-blue-400 text-xl md:text-2xl font-light line-clamp-2">
          {question.title}
        </h3>
        <div className="flex gap-2">
          {tags.map((tag) => (
            <TagCard key={tag.id} tag={tag.tag} use="Home" id={tag.id} />
          ))}
        </div>
        <div className="pb-3 gap-2 flex right-0">
          {user?.picture}
          <p>{user?.username}</p>
          <p>{answered.length} answered</p>
          <Moment fromNow>{question.createdAt!}</Moment>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
