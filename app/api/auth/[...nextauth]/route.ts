import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { prismaClient } from "../../lib/db";
import Google from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        })
    ],
    secret : process.env.NEXTAUTH_SECRET ?? "secret",
    callbacks: {
        async signIn(params) {
            if (!params.user.email) {
                console.log("no user")
                return false;
            }
            console.log(params);
            try {
                await prismaClient.user.create({
                    data: {
                        email: params.user.email,
                        provider: "Google"
                    }
                    
    
                })

            } catch (e) {
                console.log(e)
            }
            
            return true;
        }
    }
})

export { handler as GET, handler as POST }