import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/authOptions";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
  const session = await getServerSession(authOptions);
  const issue = await prisma.issues.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();

  // y -> taas
  // x-> baba
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <EditIssueButton issueId={issue.id} />
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
