import { promises as fs } from 'fs';
import path from 'path';

type FileWithContent = {
  filePath: string;
  content: string;
};

// Allowed code extensions
const allowedExtensions = ['.ts', '.tsx', '.js', '.jsx', '.py', '.java', '.go', '.rb'];

export async function readAllFilesInDir(dir: string): Promise<FileWithContent[]> {
    let results: FileWithContent[] = [];

    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            const nestedResults = await readAllFilesInDir(fullPath);
            results = results.concat(nestedResults);
        } else if (entry.isFile()) {
            const ext = path.extname(fullPath);
            if (allowedExtensions.includes(ext)) {
            try {
                const content = await fs.readFile(fullPath, 'utf-8');
                
                results.push({ filePath: fullPath, content });
                
                results.push({
                    filePath: fullPath,
                    content,
                });
            } catch (err) {
                console.error(`❌ Failed to read file: ${fullPath}`, err);
            }
        }
        }
    }
  return results;
}
