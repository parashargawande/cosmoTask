
import { Calendar, Users, Smartphone, Clock } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: Calendar,
      title: "Daily Task Suggestions",
      description: "Personalized to-dos based on your astrological profile and current planetary positions."
    },
    {
      icon: Users,
      title: "Complete Horoscope View",
      description: "Detailed birth chart analysis with explanations of planetary influences on your day."
    },
    {
      icon: Smartphone,
      title: "Mood-Based Filtering",
      description: "Filter tasks by your current energy level and emotional state for better alignment."
    },
    {
      icon: Clock,
      title: "Smart Reminders",
      description: "Push notifications timed with optimal planetary windows for maximum effectiveness."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to align your daily productivity with cosmic rhythms
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-all duration-300 hover-scale">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 mb-4">Available on Android and Web</p>
          <div className="flex justify-center space-x-4">
            <div className="px-6 py-2 bg-green-100 text-green-800 rounded-full">📱 Android App</div>
            <div className="px-6 py-2 bg-blue-100 text-blue-800 rounded-full">🌐 Web Version</div>
          </div>
        </div>
      </div>
    </section>
  );
};
