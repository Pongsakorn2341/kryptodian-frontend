import { cn } from "@/lib/utils";
import { ImSpinner } from "react-icons/im";

export default function LoadingComponent() {
  return (
    <div
      className={cn(
        "flex min-h-screen flex-col items-center justify-center",
        "bg-slate-900 text-white"
      )}
    >
      <ImSpinner className="mr-2 h-10 w-10 animate-spin fill-white" />
      <span className="font-semibold">Loading...</span>
    </div>
  );
}
