import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.json();
    const issuesFound = data.response;
    const repoName = data.repoName;
    console.log("Data received in saveIssues Route: ", issuesFound);

    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
        where: { username: session?.username },
    })

    if (!user) {
        return NextResponse.json({ message: "User Not Found" }, { status: 401 });
    }

    if (Object.keys(issuesFound).length === 0) {
        await prisma.issue.create({
            data: {
                userId: user.id,
                issues: {message: "No Issues Found"},
                repoName: repoName
            }
        })
    }else {
        await prisma.issue.create({
            data: {
                userId: user.id,
                issues: data.response,
                repoName: repoName
            }
        })
    }

    // console.log("Data Received Successful");
    return NextResponse.json({ message: "Data Stored Successful" }, { status: 201 });
}