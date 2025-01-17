"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "@/app/components/Spinner";
import { Issues } from "@prisma/client";

interface IssueForm {
  title: string;
  description: string;
}

interface Props {
  issue?: Issues;
}

const IssueForm = ({ issue }: Props) => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      if (issue) await axios.patch(`/api/issues/${issue.id}`, data);
      else await axios.post("/api/issues", data);

      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setError("An unexpected error occured.");
      setLoading(false);
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          defaultValue={issue?.title}
          placeholder="Title"
          {...register("title")}
        >
          <TextField.Slot />
        </TextField.Root>
        <Controller
          name="description"
          defaultValue={issue?.description}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <Button disabled={loading}>
          {issue ? "Update Issue" : " Submit New Issue"}
          {loading && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
