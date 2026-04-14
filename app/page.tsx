import { Button } from "@/components/ui/button";
import { SquareArrowOutUpRight } from "lucide-react";

export default function Home() {
  return (
    <div>
      <header className="flex justify-between items-center py-4 px-8">
        <h2 className=" text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Context AI
        </h2>
        <div className="flex justify-center items-center gap-1">
          <Button variant="outline">Get Started</Button>
          <Button variant="default">Get Started</Button>
        </div>
      </header>
      <div className="flex justify-center items-center min-h-[calc(100vh-30vh)]">
        <div className="flex flex-col justify-center items-center max-w-7xl mx-auto py-20 px-4 text-center">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary opacity-30 blur-3xl rounded-full" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary opacity-30 blur-3xl rounded-full" />
          <h1 className="text-4xl font-bold text-foreground mb-4 w-2xl">
            Context AI Builded with goals to be the best AI assistant for
            everyone.
          </h1>
          <p className="text-lg text-muted-foreground mb-8 w-4xl">
            Your AI-powered assistant for all your needs. From scheduling to
            reminders, we’ve got you covered. Experience the future of
            productivity with Context AI. 
          </p>
          <Button variant="default">Get Started</Button>
        </div>
     
      </div>
         <footer className="absolute bottom-0 w-full px-8 py-4">
          <div className="flex justify-end items-center gap-2 text-xl text-muted-foreground">

          <Button size="lg" variant="link">Himersus <SquareArrowOutUpRight className="w-4 h-4 gap-1" /></Button>
          </div>
        </footer>
    </div>
  );
}
