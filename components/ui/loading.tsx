import { LoaderIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-10 animate-spin", className)}
      {...props}
    />
  );
}

export function SpinnerCustom() {
  return (
    <div className="absolute inset-0 z-50 backdrop-blur-sm bg-black/20 top-0 left-0 flex items-center justify-center">
      <div className="flex items-center gap-4">
        <Spinner />
      </div>
    </div>
  );
}
