import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MusicIcon, UsersIcon, RadioIcon } from "lucide-react"
import Link from "next/link"
import { Appbar } from "./components/Appbar"
import { Redirect } from "./components/Redirect"


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900 via-teal-900 to-purple-900 text-gray-100">
      <Appbar />
      <Redirect/>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Let Your Fans <span className="text-teal-400">Choose the Tune</span>
              </h1>
              <p className="mx-auto max-w-[600px] text-gray-300 md:text-xl">
                FanTune: Where creators and fans collaborate on the perfect streaming soundtrack.
              </p>
              <Button className="bg-teal-600 hover:bg-teal-700 text-white">Get Started</Button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-800 bg-opacity-30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 p-6 rounded-lg bg-blue-900 bg-opacity-50 h-full">
                <UsersIcon className="h-12 w-12 text-teal-400 mb-2" />
                <h2 className="text-xl font-bold">Fan Engagement</h2>
                <p className="text-center text-gray-300 flex-grow">
                  Let your audience choose your streams music, boosting interaction and loyalty.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-6 rounded-lg bg-blue-900 bg-opacity-50 h-full">
                <RadioIcon className="h-12 w-12 text-teal-400 mb-2" />
                <h2 className="text-xl font-bold">Live Streaming</h2>
                <p className="text-center text-gray-300 flex-grow">
                  Stream with fan-curated soundtracks, creating a unique and interactive experience.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-6 rounded-lg bg-blue-900 bg-opacity-50 h-full">
                <MusicIcon className="h-12 w-12 text-teal-400 mb-2" />
                <h2 className="text-xl font-bold">Vast Music Library</h2>
                <p className="text-center text-gray-300 flex-grow">
                  Access millions of tracks for your streams, ensuring endless variety for your content.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Join Jonkybox Today</h2>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1 bg-blue-800 bg-opacity-50 border-blue-700 text-white" placeholder="Enter your email" type="email" />
                  <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white">Sign Up</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-blue-800">
        <p className="text-xs text-gray-300">© 2023 Jonkybox. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:text-teal-400" href="#">
            Terms
          </Link>
          <Link className="text-xs hover:text-teal-400" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}