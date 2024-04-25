import { Flex } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import IssueActions from "./IssueActions";
import IssueTable from "./IssueTable";
import { Issues } from "@prisma/client";

interface Props {
  searchParams: { status: string; orderBy: keyof Issues };
}

interface IssueColumn {
  label: string;
  value: keyof Issues;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const status = searchParams?.status;
  const validStatuses = ["OPEN", "CLOSED", "IN_PROGRESS"];
  const columns: IssueColumn[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status" },
    { label: "Created", value: "createdAt" },
  ];

  let where = {};

  if (status && status !== "ALL" && validStatuses.includes(status)) {
    where = { status: { equals: status } };
  }

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const issues = await prisma.issues.findMany({
    where,
    orderBy,
  });

  return (
    <div>
      <Flex direction="column" gap="3">
        <IssueActions />
        <IssueTable
          issues={issues}
          columns={columns}
          searchParams={searchParams}
        />
      </Flex>
    </div>
  );
};

export default IssuesPage;
