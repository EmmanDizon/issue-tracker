import { Flex } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery } from "./IssueTable";
import { Issues } from "@prisma/client";
import Pagination from "@/app/components/Pagination";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
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

  const page = parseInt(searchParams?.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issues.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issues.count({ where });

  return (
    <div>
      <Flex direction="column" gap="3">
        <IssueActions />
        <IssueTable
          searchParams={searchParams}
          issues={issues}
          columns={columns}
        />
        <Pagination
          pageSize={pageSize}
          currentPage={page}
          itemCount={issueCount}
        />
      </Flex>
    </div>
  );
};

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all issues",
};

export default IssuesPage;
