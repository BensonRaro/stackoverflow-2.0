"use client";

import { Editor } from "@tinymce/tinymce-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useTransition } from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QuestionsSchema } from "@/lib/validations";
import Tag from "@/components/AskQuestion/tag";
import { AskQuestion, EditQuestion } from "@/actions/Question";
import { question, tag } from "@prisma/client";

const AskQuestionAddEdit = ({
  question,
}: {
  question?:
    | (question & {
        tags: tag[];
      })
    | null;
}) => {
  const [isPending, startTransition] = useTransition();
  const { resolvedTheme } = useTheme();
  const router = useRouter();
  // console.log(resolvedTheme);

  const tagNames = question?.tags.map((tag) => ({
    id: tag.id,
    text: tag.tag,
  }));

  const explanation = question?.explanation!.toString();

  const form = useForm<z.infer<typeof QuestionsSchema>>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: question
      ? {
          title: question.title,
          explanation: explanation,
          tags: tagNames,
        }
      : {
          title: "",
          explanation: "",
          tags: [],
        },
  });

  const onSubmit = async (values: z.infer<typeof QuestionsSchema>) => {
    if (question) {
      startTransition(async () => {
        await EditQuestion(values, question.id)
          .then(() => {
            form.reset();
            router.push("/");
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      startTransition(async () => {
        await AskQuestion(values)
          .then(() => {
            form.reset();
            router.push("/");
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  };
  // form.
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>

      <div className="mt-9">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-10"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Question Title <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Input
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription className="body-regular mt-2.5 text-light-500">
                    Be specific and imagine you&apos;re asking a question to
                    another person.
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="explanation"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-3">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Detailed explanation of your problem{" "}
                    <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Editor
                      apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                      onBlur={field.onBlur}
                      onEditorChange={(content) => field.onChange(content)}
                      initialValue={field.value || "Welcome to Stackoverflow"}
                      init={{
                        plugins:
                          "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
                        toolbar:
                          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                        content_style:
                          "body { font-family:Inter; font-size:16px }",
                        skin: resolvedTheme === "dark" ? "oxide-dark" : "oxide",
                        content_css:
                          resolvedTheme === "dark" ? "dark" : "light",
                      }}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription className="body-regular mt-2.5 text-light-500">
                    Introduce the problem and expand on what you put in the
                    title. Minimum 20 characters.
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => {
                return (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel className="paragraph-semibold text-dark400_light800">
                      Tags <span className="text-primary-500">*</span>
                    </FormLabel>
                    <FormControl className="mt-3.5">
                      <Tag
                        questionTags={field.value}
                        disabled={isPending}
                        onChange={(tags) => field.onChange(tags)}
                      />
                    </FormControl>
                    <FormDescription className="body-regular mt-2.5 text-light-500">
                      Add up to 3 tags to describe what your question is about.
                      You need to press enter to add a tag.
                    </FormDescription>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                );
              }}
            />
            <Button
              type="submit"
              className="primary-gradient w-fit !text-light-900"
              disabled={isPending}
            >
              Ask a Question
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AskQuestionAddEdit;
