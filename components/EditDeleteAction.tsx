"use client";

import { DeleteAnswer } from "@/actions/Answer";
import { DeleteQuestion } from "@/actions/Question";
import { answer, tag } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  type: string;
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/askQuestion/${itemId}`);
  };

  const handleDelete = async () => {
    if (type === "Question") {
      // Delete question
      await DeleteQuestion(itemId);
    } else if (type === "Answer") {
      // Delete answer
      await DeleteAnswer(itemId);
    }
  };

  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === "Question" && (
        <Image
          src="/assets/icons/edit.svg"
          alt="Edit"
          width={14}
          height={14}
          className="cursor-pointer object-contain"
          onClick={handleEdit}
        />
      )}

      <Image
        src="/assets/icons/trash.svg"
        alt="Delete"
        width={14}
        height={14}
        className="cursor-pointer object-contain"
        onClick={handleDelete}
      />
    </div>
  );
};

export default EditDeleteAction;
