import LatestIssues from "./LatestIssues";

interface Props {
  searchParams: { page: string };
}

export default function Home({ searchParams }: Props) {
  return <LatestIssues />;
}
