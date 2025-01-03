import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "../../lib/db";
import { log } from "console";

const UpvoteSchema = z.object({
    streamId: z.number(),
})

export async function POST(req: NextRequest) {
    const session = await getServerSession();
    //TODO can get rid of the db call here

    const user = await prismaClient.user.findFirst({
        where: {
            email: session?.user?.email ?? ""
        }
    });
  

    if (!user) {
        console.log(user)
        return NextResponse.json({
            message:"Unauthenticated"
        }, {
            status: 403
        })
    }
    
    try {
        const body = await req.json();
        
        const data = UpvoteSchema.parse(body);
        
        await prismaClient.upvote.create({
            data: {
                userId: user.id,
                streamId: data.streamId.toString()
            }
            
        });
        console.log("bye")
        return NextResponse.json({
            message: "Done!"
        })
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            message:"Error while upvoting"
        }, {
            status: 403
        })
    }

}