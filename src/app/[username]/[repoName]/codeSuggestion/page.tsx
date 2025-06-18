import ShowIssues from "./ShowIssues";
export const dynamic = 'force-dynamic';

export default async function codeSuggestion({ params }: { params: Promise<{ username: string, repoName: string }> }) {
  const { username, repoName } = await params;
  const data = {
    username,
    repoName
  }

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXTAUTH_URL
      : "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/getIssues`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const result = await res.json();
  // console.log("Data received in getIssue: ", result.issues.issues);

  return (
    <ShowIssues repoIssues={result.issues.issues} />
  );
}
