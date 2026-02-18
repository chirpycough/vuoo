import { AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center shadow-2xl">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="h-10 w-10 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">404 Page Not Found</h1>
          <p className="text-slate-400">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        <Link href="/">
          <button className="w-full h-12 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-xl transition-all">
            Return to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
