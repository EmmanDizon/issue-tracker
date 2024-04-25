import { Flex } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import IssueActions from "./IssueActions";
import IssueTable from "./IssueTable";

const IssuesPage = async () => {
  const issues = await prisma.issues.findMany();

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
