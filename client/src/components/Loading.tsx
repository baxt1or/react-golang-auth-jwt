import { Loader2 } from "lucide-react";

export const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  );
};
