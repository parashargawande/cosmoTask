
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const AppPreviewSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const screenshots = [
    {
      title: "Today's Tasks",
      description: "See your personalized daily to-dos based on planetary influences",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=300&h=600&fit=crop"
    },
    {
      title: "Horoscope View",
      description: "Explore your birth chart and understand planetary positions",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=600&fit=crop"
    },
    {
      title: "Settings & Profile",
      description: "Customize your experience and update your birth details",
      image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=300&h=600&fit=crop"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">See It In Action</h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Experience the beautiful interface designed to make astrology accessible and actionable
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8 gap-2 sm:gap-4 flex-wrap">
            {screenshots.map((screenshot, index) => (
              <Button
                key={index}
                variant={activeTab === index ? "default" : "outline"}
                onClick={() => setActiveTab(index)}
                className={`text-xs sm:text-sm px-3 sm:px-4 py-2 ${activeTab === index ? 
                  "bg-purple-600 hover:bg-purple-700" : 
                  "border-purple-400 text-purple-300 hover:bg-purple-500/20"
                }`}
              >
                {screenshot.title}
              </Button>
            ))}
          </div>
          
          <div className="text-center">
            <div className="inline-block relative">
              <div className="w-64 sm:w-80 h-[500px] sm:h-[640px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.5rem] sm:rounded-[3rem] p-3 sm:p-4 shadow-2xl">
                <div className="w-full h-full rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden">
                  <img 
                    src={screenshots[activeTab].image}
                    alt={screenshots[activeTab].title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 sm:-bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm rounded-lg p-3 sm:p-4 max-w-xs sm:max-w-sm mx-4">
                <h3 className="font-semibold mb-2 text-sm sm:text-base">{screenshots[activeTab].title}</h3>
                <p className="text-xs sm:text-sm text-gray-300">{screenshots[activeTab].description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
