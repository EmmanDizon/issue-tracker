import { Flex } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import IssueActions from "./IssueActions";
import IssueTable from "./IssueTable";
import { Status } from "@prisma/client";

interface Props {
  searchParams: { status: string };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const status = searchParams?.status;
  const validStatuses = ["OPEN", "CLOSED", "IN_PROGRESS"];

  let where = {};

  if (status && status !== "ALL" && validStatuses.includes(status)) {
    where = { status: { equals: status } };
  }

  const issues = await prisma.issues.findMany({ where });

  return (
    <div>
      <Flex direction="column" gap="3">
        <IssueActions />
        <IssueTable issues={issues} />
      </Flex>
    </div>
  );
};

export default IssuesPage;
