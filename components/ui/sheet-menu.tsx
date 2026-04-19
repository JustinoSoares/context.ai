import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="w-8 h-8 cursor-pointer" />
      </SheetTrigger>
      <SheetContent className="h-full pt-8">
        <SheetHeader>
          <SheetTitle>Context AI</SheetTitle>
          <SheetDescription>
            {
              "Your AI-powered assistant for all your needs. \
                From scheduling to reminders, we've got you covered. Experience the future of productivity with Context AI."
            }
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">
              Ajude com o teu contributo...
            </Label>
            <textarea
              className="min-h-[100px] p-2 border rounded-md"
              id="sheet-demo-name"
              placeholder="Dê o seu comentário"
            />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Login</Button>
          <SheetClose asChild>
            <Button variant="outline">Sign</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
