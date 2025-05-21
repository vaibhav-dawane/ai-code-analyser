'use client'

import { useSession } from "next-auth/react";
import React, { useState } from "react";

export default function RepoSelector({ repoNames }: { repoNames: string[] }) {

    const { data: session } = useSession();

    // const cloneRepo = async (repoToken: string, repoOwner: string, selectedRepo: string) => {
    //     console.log("Clone Repo Function..");

    //     const data = {
    //         repoToken, repoOwner, selectedRepo
    //     }
    //     const res = fetch('/api/cloneRepo', {
    //         method: 'POST',
    //         body: JSON.stringify(data)
    //     })
    //     console.log(res);
    // }

    const repoToken = session?.accessToken as string;
    const repoOwner = session?.username as string;
    const [selectedRepo, setSelectedRepo] = useState<string>("");

    const analyseRepo = async () => {
        // cloneRepo(repoToken, repoOwner, selectedRepo);
        const data = {
            repoToken, repoOwner, selectedRepo
        }
        console.log("Selected Repo is: ", selectedRepo);

        const res = await fetch('/api/cloneRepo', {
            method: 'POST',
            body: JSON.stringify(data)
        })
        console.log("Response after Cloning Repo: ", res);

        if (res.ok) {
            await fetch('/api/chat', {
                method: 'POST',
                body: JSON.stringify(data)
            })
        }
        else {
            throw new Error("Repo Clone Failed");
        }
    }

    return (
        <div className="text-white">
            <label>Choose a Repo:</label>
            <select defaultValue={'DEFAULT'} name="repos" onChange={(e) => {
                setSelectedRepo(e.currentTarget.value)
            }} className="bg-black">
                <option value="DEFAULT" disabled>Choose a Repository...</option>
                {repoNames.map((items: string, index: number) => (
                    <option key={index}>{items}</option>
                ))}
            </select>
            <br />
            <button type="submit" className="bg-green-500 p-2 cursor-pointer rounded-md"
                onClick={analyseRepo}
            >Start Analysing</button>
        </div>
    );
}
