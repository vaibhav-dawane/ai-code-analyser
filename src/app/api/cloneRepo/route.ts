import { NextRequest, NextResponse } from "next/server";
import { exec } from 'child_process';

type Payload = {
    repoToken: string,
    repoOwner: string,
    selectedRepo: string
}

export async function POST(req: NextRequest)
{
    const data: Payload = await req.json();
    console.log("data in clone route: ",data);
    const token = data.repoToken;
    const owner = data.repoOwner;
    const repo = data.selectedRepo;
    const folder = `./src/temp/${repo}`

    const command = `git clone https://${token}@github.com/${owner}/${repo}.git ${folder}`;

    await exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`❌ Clone failed: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`⚠️ stderr: ${stderr}`);
    }
    console.log(`✅ Repo cloned: ${stdout}`);
    });

    return NextResponse.json({message: "Repo Cloned Successfully"}, {status: 201});
}