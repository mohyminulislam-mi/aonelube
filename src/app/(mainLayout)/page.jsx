import { Suspense } from "react";
import LandingPageContent from "@/components/mainLayout/home/LandingPageContent";
import { Loader2 } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Suspense
        fallback={
          <div className="py-20 flex flex-col items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }
      >
        <LandingPageContent />
      </Suspense>
    </main>
  );
}
