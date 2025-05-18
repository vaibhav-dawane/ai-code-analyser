import { exec } from 'child_process';

interface repoDetails {
    repoToken: string,
    repoOwner: string,
    repoName: string
}

const cloneRepo = ({repoToken, repoOwner, repoName}: repoDetails) => {
    const token = repoToken; // Never hardcode in production
    const owner = repoOwner;
    const repo = repoName;
    const folder = './temp';

    console.log("Token in ChildProcess: ",token);
    console.log("Owner name in ChildProcess: ",owner);
    console.log("Repo Name in ChildProcess: ",repoName);

    const command = `git clone https://${token}@github.com/${owner}/${repo}.git ${folder}`;

    exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`❌ Clone failed: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`⚠️ stderr: ${stderr}`);
    }
    console.log(`✅ Repo cloned: ${stdout}`);
    });
}

export default cloneRepo;