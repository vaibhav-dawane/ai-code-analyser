import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    // console.log('Cookies: ', cookies());

    const token = await getToken({ req });

    if(!token || !token.accessToken){
        return NextResponse.json({error: "Not Authenticated"}, {status: 401})
    }

    // console.log("Received Token: ", token.accessToken);
    
    const res = await fetch(`https://api.github.com/user/repos?per_page=100`, {
        headers: {
            Authorization: `token ${token?.accessToken}`,
        }
    })

    if(!res.ok)
    {
        return NextResponse.json({error: "Github Error Occured"}, {status: 400})
    }

    // console.log("Resonse after api call to github: ",res);
    
    const data = await res.json();

    // console.log("Data after parsing: ",data);

    let repoNames:string[] = [];

    data.map((items: {name: string}) => {
        repoNames.push(items.name)
    })

    // console.log("Repo Names: ",repoNames);
    

    return NextResponse.json({repositories: repoNames});
}