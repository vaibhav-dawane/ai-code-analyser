import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.json();
    const username = data.username;
    const repoName = data.repoName;


    const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    });
    const issues = await prisma.issue.findFirst({
        where: {
            userId: user?.id,
            repoName: repoName,
        }
    });
    // console.log(issues);

    return NextResponse.json({message: "Issues received from database", issues}, {status: 200})
}