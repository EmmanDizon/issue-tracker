import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Issues } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  issues: Issues[];
}

const IssueTable = ({ issues }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
            </Table.Cell>
            <Table.Cell>
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell>{issue.createdAt.toDateString()}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default IssueTable;
