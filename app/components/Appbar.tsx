"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MusicIcon } from "lucide-react"
import Link from "next/link"

export function Appbar() {
    const session = useSession()
    function Logout(): void {
        throw new Error("Function not implemented.");
    }

    return <div className="flex justify-between px-20 pt-2">
        <div className="text-lg font-bold flex flex-col">
            Jonkybox
        </div>
        <div>
            {session.data?.user && <Button className="m-2 p-2 bg-teal-600 hover:bg-teal-700 text-white" onClick={() => signOut()}>Logout</Button>}
                {!session.data?.user && <Button className="m-2 p-2 bg-teal-600 hover:bg-teal-700 text-white" onClick={() => signIn()}>Signin</Button>}
        </div>
                
            </div>
        
    
    
}