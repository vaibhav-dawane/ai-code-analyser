import { promises as fs } from 'fs';
import path from 'path';

type FileWithContent = {
    filePath: string;
    content: string;
};

// Allowed code extensions
const allowedExtensions = ['.ts', '.tsx', '.js', '.jsx', '.py', '.java', '.go', '.rb'];

// if the file is without extension (also we can take user input)
const allowedFileWithoutExtension = ['Dockerfile'];

export async function readAllFilesInDir(dir: string): Promise<FileWithContent[]> {
    let results: FileWithContent[] = [];

    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        // if its an folder, then recursivly go in that dir and read files
        if (entry.isDirectory()) {
            const nestedResults = await readAllFilesInDir(fullPath);
            results = results.concat(nestedResults);
        } else if (entry.isFile()) {
            const ext = path.extname(fullPath);
            const fileName = path.basename(fullPath);
            if (allowedExtensions.includes(ext) || allowedFileWithoutExtension.includes(fileName)) {
                try {
                    const content = await fs.readFile(fullPath, 'utf-8');

                    // storing each filepath and its content
                    results.push({ filePath: fullPath, content });

                } catch (err) {
                    console.error(`❌ Failed to read file: ${fullPath}`, err);
                }
            }
        }
    }
    // it will return each file with its content
    return results;
}
