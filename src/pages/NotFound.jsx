import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] text-white text-center space-y-6 bg-black-2">
      <AlertTriangle className="w-16 h-16 text-red-500" />
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-gray-400">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link to="/">
        <Button className="bg-emerald-500 text-black-1 hover:text-emerald-500 hover:bg-black-1 transition-colors">
          Go Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
