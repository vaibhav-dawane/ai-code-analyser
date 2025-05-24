// import { promises as fs } from 'fs';
import { analyzeFiles } from '@/utils/analyseFile';
import { readAllFilesInDir } from '@/utils/readFiles';
import { NextRequest, NextResponse } from "next/server";

type Payload = {
  repoOwner: string,
  selectedRepo: string
}

export async function POST(req: NextRequest) {
  const data: Payload = await req.json();
  const repoPath = process.cwd() + `/src/temp/${data.repoOwner}/${data.selectedRepo}`;

  // each file with its content
  const results = await readAllFilesInDir(repoPath);

  // it will anaylse each file code, and return an map with file location and bugs present inside it
  const response = await analyzeFiles(results);

  // console.log("After analysing files: ", response);

  return NextResponse.json({ message: "Repo Analysed Successfully", response }, { status: 200 });
}