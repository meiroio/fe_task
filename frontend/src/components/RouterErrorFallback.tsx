import { Button } from "@/components/ui/button";
import { AlertTriangleIcon, RefreshCw } from "lucide-react";

export const RouterErrorFallaback = () => {
  return (
    <div className="py-5 h-full">
      <div className="bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-4 rounded-lg w-full flex flex-col justify-center items-center h-1/2">
        <div className="flex items-center gap-4">
          <AlertTriangleIcon className="h-5 w-5 text-red-500" />
          <div className="text-sm font-semibold text-red-600 dark:text-red-400">
            Error
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Oops! Something went wrong. Please try refreshing the page.
        </div>
        <Button
          onClick={() => location.reload()}
          className="mt-4"
          variant="outline"
        >
          <RefreshCw className="h-4 w-4 mr-1 -translate-x-0.5" />
          Refresh
        </Button>
      </div>
    </div>
  );
};
