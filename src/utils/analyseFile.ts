import { GoogleGenAI } from "@google/genai";
import {systemInstruction} from '@/utils/systemInstructions' 
import path from "path";

type FileWithContent = {
    filePath: string;
    content: string;
};

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API});

export async function analyzeFiles(files: FileWithContent[]) {
    
    // to store rsponse, in map format. Filepath and its bugs
    const fileWithIssue: Record<string, any[]> = {};

    // iterate each file
    for (const file of files) {
        const { filePath, content } = file;
        console.log(`📄 Reading file: ${filePath}`);

        if (content.length > 10000) continue;
        try {
            const result = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: file.content,
                config: {
                    systemInstruction: systemInstruction,
                },
            });
    
            const rawText = result.text || '';
            const jsonString = rawText.replace(/```json|```/g, "").trim();
            const parsed = JSON.parse(jsonString);

            // to store only repo path e.g. '/repo/src/page.tsx'
            const repoRoot = path.join(process.cwd(), 'src/temp');
            // it will first find relative path which is '/src/page.tsx'. And replace all backward \ with forward /
            const relativePath = path.relative(repoRoot, filePath).replace(/\\/g, '/');;

            // storing file and its issues in map. 'page.tsx' -> issues[]
            fileWithIssue["/repo/"+relativePath] = parsed.issues || [];
        } catch (error) {
            console.error(`❌ Failed analyzing ${filePath}:`, error);
        }
    }
    return fileWithIssue;
}