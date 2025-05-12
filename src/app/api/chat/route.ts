// import { promises as fs } from 'fs';
import {analyzeFiles} from '@/utils/analyseFile'
import {readAllFilesInDir} from '@/utils/readFiles'
import { NextResponse } from "next/server";

export async function GET() 
{
  const repoPath = process.cwd() + '/src/temp';

  const results = await readAllFilesInDir(repoPath);

  const response = await analyzeFiles(results);

  return NextResponse.json({response}, {status: 200});
}