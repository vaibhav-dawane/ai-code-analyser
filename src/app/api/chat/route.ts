// import { promises as fs } from 'fs';
import {analyzeFiles} from '@/utils/analyseFile'
import {readAllFilesInDir} from '@/utils/readFiles'
import { NextResponse } from "next/server";

export async function GET() 
{
  const repoPath = process.cwd() + '/src/temp';

  // each file with its content
  const results = await readAllFilesInDir(repoPath);

  // it will anaylse each file code, and return an map with file location and bugs present inside it
  const response = await analyzeFiles(results);

  return NextResponse.json({response}, {status: 200});
}