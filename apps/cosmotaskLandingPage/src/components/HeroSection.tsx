import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Smartphone } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Animated stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 z-10 w-full max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-6 lg:space-y-8 animate-fade-in">
            <Badge
              variant="secondary"
              className="bg-purple-500/20 text-purple-200 border-purple-400"
            >
              ✨ Powered by Real Astrology
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Let the Stars
              </span>
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
                Plan Your Day
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0">
              Get personalized daily task suggestions from your todo list based on your birth chart and
              planetary movements. Turn cosmic wisdom into actionable insights for your day.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 w-full sm:w-auto"
              >
                <Smartphone className="mr-2 h-5 w-5" />
                Download for Android
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-400 text-purple-300 hover:bg-purple-500/20 w-full sm:w-auto"
              >
                Try Web Version
              </Button>
            </div>
          </div>

          {/* App Mockup */}
          <div className="relative flex justify-center animate-scale-in">
            <div className="relative">
              <div className="w-64 sm:w-72 h-[500px] sm:h-[600px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.5rem] sm:rounded-[3rem] p-2 sm:p-3 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden">
                  <div className="bg-gradient-to-br from-purple-600 to-pink-600 h-16 sm:h-20 flex items-center justify-center">
                    <h3 className="text-white font-semibold text-sm sm:text-base">
                      Today's Tasks
                    </h3>
                  </div>
                  <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                    <div className="bg-purple-50 p-2 sm:p-3 rounded-lg">
                      <p className="text-xs sm:text-sm font-medium text-purple-800">
                        🌟 Morning Meditation
                      </p>
                      <p className="text-xs text-purple-600">
                        Mercury in harmony - perfect for reflection
                      </p>
                    </div>
                    <div className="bg-pink-50 p-2 sm:p-3 rounded-lg">
                      <p className="text-xs sm:text-sm font-medium text-pink-800">
                        💼 Tackle Important Emails
                      </p>
                      <p className="text-xs text-pink-600">
                        Mars energy favors communication
                      </p>
                    </div>
                    <div className="bg-blue-50 p-2 sm:p-3 rounded-lg">
                      <p className="text-xs sm:text-sm font-medium text-blue-800">
                        🎨 Creative Project Time
                      </p>
                      <p className="text-xs text-blue-600">
                        Venus inspires artistic expression
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-full animate-bounce" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 sm:w-6 sm:h-6 bg-purple-400 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
