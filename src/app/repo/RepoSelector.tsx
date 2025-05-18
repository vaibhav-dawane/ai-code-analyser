'use client'

// import cloneRepo from "@/lib/cloneRepo";
import { useSession } from "next-auth/react";
import React from "react";

export default function RepoSelector({repoNames}: {repoNames: string[]}) {

    const {data: session} = useSession();
    console.log(session);

    const cloneRepo = async(repoToken:string, repoOwner:string, selectedRepo:string) => {
        const data = {
            repoToken, repoOwner, selectedRepo
        }
        const res = fetch('/api/cloneRepo', {
            method: 'POST',
            body: JSON.stringify(data)
        })
        console.log(res);
    }
    
    const selectRepo = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // console.log("Selected Repo is: ", repo);
        const selectedRepo = event.target.value;
        console.log("Selected Repo is: ", selectedRepo);

        const repoToken = session?.accessToken as string;
        const repoOwner = session?.username as string;

        // cloneRepo({repoToken, repoOwner, repoName: selectedRepo});

        cloneRepo(repoToken, repoOwner, selectedRepo);
    }

    return (
        <div className="text-white">
            <label>Choose a Repo:</label>
            <select name="repos" onChange={selectRepo}>
                <option disabled selected>Select a Repository</option>
                {repoNames.map((items: string, index: number) => (
                    <option key={index}>{items}</option>
                ))}
            </select>
        </div>
    );
}
