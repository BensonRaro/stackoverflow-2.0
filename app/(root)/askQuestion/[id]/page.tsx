import AskQuestionAddEdit from "@/components/AskQuestion/AskQuestionAddEdit";
import { db } from "@/lib/db";

const AskQuestionPage = async ({ params }: { params: { id: string } }) => {
  const question = await db.question.findUnique({
    where: {
      id: params.id,
    },
    include: {
      tags: true,
    },
  });
  return <AskQuestionAddEdit question={question} />;
};

export default AskQuestionPage;
