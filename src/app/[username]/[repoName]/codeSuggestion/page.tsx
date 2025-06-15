import ShowIssues from "./ShowIssues";

interface Params {
  username: string;
  repoName: string;
}

export default async function codeSuggestion({
  params,
}: {
  params: Params;
}) {
    const { username, repoName } = params;
    const data = {
        username,
        repoName
    }

    const res = await fetch('http://localhost:3000/api/getIssues', {
        method: 'POST',
        body: JSON.stringify(data)
    })
    const result = await res.json();
    // console.log("Data received in getIssue: ", result.issues.issues);
    
    return (
        <ShowIssues repoIssues={result.issues.issues}/>
    );
}
