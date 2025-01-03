import { NextResponse } from "next/server";
import { prismaClient } from "../../lib/db";
import { getServerSession } from "next-auth";
import { date } from "zod";

export async function GET() {
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

    const mostUpvotedStream = await prismaClient.stream.findFirst({
        where: {
            userId: user.id,
            played: false
        },
        orderBy: {
            upvotes: {
                _count: "desc"
            }
        }
    });

    await Promise.all([, prismaClient.currentStream.upsert({
        where: {
            userId: user.id
        },
        update: {
            userId: user.id,
            streamId: mostUpvotedStream?.id
        },
        create: {
            userId: user.id,
            streamId: mostUpvotedStream?.id
        }
    }), prismaClient.currentStream.update({
        where: {
            streamId: mostUpvotedStream?.id
        },
        data: {
            played: true,
            playedTs: new Date()
        }

    })])

    return NextResponse.json({
        streamId: mostUpvotedStream?.id
    })
}