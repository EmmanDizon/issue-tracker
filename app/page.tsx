import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";

interface Props {
  searchParams: { page: string };
}

export default async function Home({ searchParams }: Props) {
  const openIssue = await prisma.issues.count({ where: { status: "OPEN" } });

  const inProgress = await prisma.issues.count({
    where: { status: "IN_PROGRESS" },
  });

  const closed = await prisma.issues.count({
    where: { status: "CLOSED" },
  });

  return (
    <IssueSummary open={openIssue} inProgress={inProgress} closed={closed} />
  );
}
