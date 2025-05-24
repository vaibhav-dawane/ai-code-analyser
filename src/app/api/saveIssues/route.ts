import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest)
{
    const data = await req.json();
    console.log("Data received in saveIssues Route: ", data.response);

    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
        where: {username: session?.username},
    })

    if(!user)
    {
        return NextResponse.json({message: "User Not Found"}, {status: 401});
    }

    await prisma.website.create({
        data: {
            userId: user.id,
            issues: data.response
        }
    })
    // console.log("Data Received Successful");
    return NextResponse.json({message: "Data Stored Successful"}, {status: 201});
}