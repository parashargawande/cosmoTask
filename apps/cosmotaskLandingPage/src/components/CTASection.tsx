import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const CTASection = () => {
  const handleNotifyMe = () => {
    toast({
      title: "Thank you for your interest!",
      description: "We'll notify you when the iOS version is available.",
    });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">
            Ready to Align Your Life?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            Start your journey towards cosmic productivity today. Let the stars
            guide your daily tasks and unlock your natural potential.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 text-lg px-8 py-3"
            >
              <Smartphone className="mr-2 h-6 w-6" />
              Download for Android
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-purple-400 text-purple-300 hover:bg-purple-500/20 text-lg px-8 py-3"
            >
              Try Web Version
            </Button>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 max-w-sm sm:max-w-lg mx-auto">
            <h3 className="text-base sm:text-lg font-semibold mb-3">
              Interested in iOS?
            </h3>
            <p className="text-sm sm:text-base text-gray-300 mb-4">
              Be the first to know when we launch on the App Store
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 sm:px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 text-sm sm:text-base"
              />
              <Button
                onClick={handleNotifyMe}
                className="bg-purple-600 hover:bg-purple-700 text-sm sm:text-base px-4 py-2 w-full sm:w-auto mt-2 sm:mt-0"
              >
                Notify Me
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
