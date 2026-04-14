import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <header className="flex justify-between items-center p-4">
        <h2 className="text-black font-bold">Context AI</h2>
        <Button variant="default">Get Started</Button>
      </header>
    </div>
  );
}
