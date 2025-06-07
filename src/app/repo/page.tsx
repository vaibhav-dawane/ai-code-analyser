import { cookies } from "next/headers";
import RepoSelector from "./RepoSelector";

const ReposPage = async () => {
    const cookieStore = await cookies();
    const res = await fetch("http://localhost:3000/api/getRepos", {
        method: 'GET',
        headers: {
            cookie: cookieStore.toString()
        }
    });
    
    if (!res.ok) {
        console.error("Failed to fetch repositories", res.text());
        return <div>Error loading repositories</div>;
    }

    const repos = await res.json();
    const repoNames = repos.repositories;
    // console.log("All the repo names: ",repoNames);

    return (
        <RepoSelector repoNames={repoNames} />
    );
}

export default ReposPage;