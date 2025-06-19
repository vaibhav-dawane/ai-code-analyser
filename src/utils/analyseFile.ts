import { GoogleGenAI } from "@google/genai";
import { systemInstruction } from '@/utils/systemInstructions'
import path from "path";

type FileWithContent = {
    filePath: string;
    content: string;
};

interface Issue {
    line: number;
    type: 'bug' | 'error' | 'warning' | 'optimization'; // expand as needed
    message: string;
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API });

export async function analyzeFiles(files: FileWithContent[]) {
    const fileWithIssue: Record<string, Issue[]> = {};
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
    const batchSize = 5;

    const repoRoot = path.join(process.cwd(), 'src/temp');

    for (let i = 0; i < files.length; i += batchSize) {
        const batch = files.slice(i, i + batchSize);

        const prompt = batch.map(file => {
            const relativePath = path.relative(repoRoot, file.filePath).replace(/\\/g, '/');
            return `### FILE: ${relativePath}\n\`\`\`\n${file.content}\n\`\`\``;
        }).join("\n\n");

        const finalPrompt = `
${systemInstruction}

Please analyze each file below and return your response in the following JSON format:
{
  "files": [
    {
      "path": "src/pages/index.tsx",
      "issues": [
        { "line": 1, "type": "bug", "message": "..." }
      ]
    }
  ]
}

${prompt}
    `;

        try {
            const result = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: finalPrompt
            });

            const rawText = result.text || '';
            const jsonString = rawText.replace(/```json|```/g, "").trim();

            let parsed;
            try {
                parsed = JSON.parse(jsonString);
            } catch (error) {
                console.warn("⚠️ Failed to parse Gemini JSON:", jsonString, error);
                continue;
            }

            for (const fileResult of parsed.files || []) {
                const fullPath = "/repo/" + fileResult.path.replace(/\\/g, '/');
                fileWithIssue[fullPath] = fileResult.issues || [];
            }

            await delay(5000); // avoid Gemini 429
        } catch (err) {
            console.error("❌ Gemini batch failed:", err);
        }
    }

    console.log("Gemini Response: ", fileWithIssue);

    return fileWithIssue;
}


// export async function analyzeFiles(files: FileWithContent[]) {

//     // to store rsponse, in map format. Filepath and its bugs
//     const fileWithIssue: Record<string, Issue[]> = {};
//     const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

//     // iterate each file
//     for (const file of files) {
//         const { filePath, content } = file;
//         console.log(`📄 Reading file: ${filePath}`);

//         if (content.length > 10000) continue;
//         try {
//             const result = await ai.models.generateContent({
//                 model: "gemini-2.0-flash",
//                 contents: content,
//                 config: {
//                     systemInstruction: systemInstruction,
//                 },
//             });

//             const rawText = result.text || '';
//             const jsonString = rawText.replace(/```json|```/g, "").trim();
//             if (typeof jsonString !== 'string') continue;
//             let parsed;

//             try {
//                 parsed = JSON.parse(jsonString);
//             } catch (error) {
//                 console.warn("⚠️ Failed to parse JSON:", jsonString, "Error Occured: ", error);
//                 continue;
//             }

//             // to store only repo path e.g. '/repo/src/page.tsx'
//             const repoRoot = path.join(process.cwd(), 'src/temp');
//             // it will first find relative path which is '/src/page.tsx'. And replace all backward \ with forward /
//             const relativePath = path.relative(repoRoot, filePath).replace(/\\/g, '/');;

//             // storing file and its issues in map. 'page.tsx' -> issues[]
//             fileWithIssue["/repo/" + relativePath] = parsed.issues || [];
//             await delay(5000);
//         } catch (error) {
//             console.error(`❌ Failed analyzing ${filePath}:`, error);
//         }
//     }
//     return fileWithIssue;
// }