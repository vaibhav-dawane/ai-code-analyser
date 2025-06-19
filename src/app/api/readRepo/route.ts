import { NextRequest, NextResponse } from "next/server"
import JSZip from 'jszip';
import { analyzeFiles } from "@/utils/analyseFile";

type Payload = {
    repoToken: string,
    repoOwner: string,
    selected: string,
    branch: string
}

type FileWithContent = {
    filePath: string;
    content: string;
};

const allowedExtensions = ['.ts', '.tsx', '.js', '.jsx', '.py', '.java', '.go', '.rb', '.html', '.css'];
const allowedFileWithoutExtension = ['Dockerfile'];
const notAllowedDirectory = ['node_modules', 'AI Chat'];

function isValidFile(path: string): boolean {
    const baseName = path.split('/').pop() || '';
    const isBlocked = notAllowedDirectory.some(dir => path.includes(`/${dir}/`));
    const hasAllowedExt = allowedExtensions.some(ext => path.endsWith(ext));
    const isAllowedNamed = allowedFileWithoutExtension.includes(baseName);

    return !isBlocked && (hasAllowedExt || isAllowedNamed);
}

export async function POST(req: NextRequest) {
    const repoDetails: Payload = await req.json();

    const zipUrl = `https://api.github.com/repos/${repoDetails.repoOwner}/${repoDetails.selected}/zipball`;

    const zipResponse = await fetch(zipUrl, {
        headers: { Authorization: `Bearer ${repoDetails.repoToken}` }
    });

    if (!zipResponse.ok) throw new Error("Failed to fetch zip");

    const buffer = await zipResponse.arrayBuffer();
    const zip = await JSZip.loadAsync(buffer);

    const files: FileWithContent[] = [];

    await Promise.all(
        Object.entries(zip.files).map(async ([path, file]) => {
            if (!file.dir && isValidFile(path)) {
                const content = await file.async("string");
                files.push({ filePath: path, content });
            }
        })
    );

    // console.log("File with Contexnt: ", files);

    const response = await analyzeFiles(files);

    return NextResponse.json({ message: "Successfully saved file paths", response }, { status: 200 });
}