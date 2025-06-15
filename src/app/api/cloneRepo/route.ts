import { NextRequest, NextResponse } from "next/server";
import { exec } from 'child_process';
import { promisify } from "util";
import fs from 'fs';

type Payload = {
    repoToken: string,
    repoOwner: string,
    selected: string
}
 
export async function POST(req: NextRequest) {
    const data: Payload = await req.json();
    console.log("data in clone route: ", data);
    const token = data.repoToken;
    const owner = data.repoOwner;
    const repo = data.selected;
    const folder = `./src/temp/${owner}/${repo}`

    const command = `git clone https://${token}@github.com/${owner}/${repo}.git ${folder}`;

    if(fs.existsSync(folder)) {
        fs.rmSync(folder, { recursive: true, force: true });
    }
    const execAsync = promisify(exec);

    try {
        const { stdout, stderr } = await execAsync(command)
        console.log(`✅ Repo cloned: ${stdout}`);

        console.error(`stderr: ${stderr}`);
        return NextResponse.json({ message: "Repo Cloned Successfully" }, { status: 200 });
    } catch (error) {
        console.error(`Repo Download failed: ${error}`);
    }

}