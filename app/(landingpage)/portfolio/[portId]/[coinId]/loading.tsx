import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Loading() {
  return (
    <div
      className={cn(
        "flex min-h-screen flex-col items-center justify-center m-0 p-0",
        "bg-slate-900 text-white"
      )}
    >
      <Loader2 className="mr-2 h-8 w-8 animate-spin fill-white" />
      <span className="font-semibold">Loading...</span>
    </div>
  );
}
