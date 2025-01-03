import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "../../lib/db";

const DownvoteSchema = z.object({
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
        return NextResponse.json({
            message:"Unauthenticated"
        }, {
            status: 403
        })
    }
    
    try {
        const data = DownvoteSchema.parse(await req.json());
        await prismaClient.upvote.delete({
            where: {
                userId_streamId: {
                    userId: user.id,
                    streamId: data.streamId.toString()
                }
                
            }
        });
        console.log("bye")
        return NextResponse.json({
            message: "Done!"
        })
    } catch (e) {
        return NextResponse.json({
            message:"Error while downvoting"
        }, {
            status: 403
        })
    }

}