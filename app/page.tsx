import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";

interface Props {
  searchParams: { page: string };
}

export default async function Home({ searchParams }: Props) {
  const open = await prisma.issues.count({ where: { status: "OPEN" } });

  const inProgress = await prisma.issues.count({
    where: { status: "IN_PROGRESS" },
  });

  const closed = await prisma.issues.count({
    where: { status: "CLOSED" },
  });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>

      <LatestIssues />
    </Grid>
  );
}
