import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "../../lib/db";

export async function GET(req: NextRequest) {
    const session = await getServerSession();
    //TODO can get rid of the db call here

    const user = await prismaClient.user.findFirst({
        where: {
            email: session?.user?.email ?? ""
        }

    });
    // console.log(session, session?.user, user);

    if (!user) {
        return NextResponse.json(
            {
                message: "Unauthenticated"
            },
            {
                status: 403
            }
        );
    }

    const streams = await prismaClient.stream.findMany({
        where: {
            userId: user.id
        },
        include: {
            _count: {
                select: {
                    upvotes: true
                }
            },
            upvotes: {
                where: {
                    userId: user.id
                }
                
                
            }
        }
    });

    return NextResponse.json({
        streams: streams.map(({ _count, ...rest }) => ({
            ...rest,
            upvotes: _count.upvotes,
            haveUpvoted: rest.upvotes.length ? true : false
        }))
    });
}
