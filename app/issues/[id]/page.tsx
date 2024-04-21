import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
  if (typeof id !== "number") notFound();

  const issue = await prisma.issues.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();

  return (
    <div>
      <p>{issue.title}</p>
    </div>
  );
};

export default IssueDetailPage;
