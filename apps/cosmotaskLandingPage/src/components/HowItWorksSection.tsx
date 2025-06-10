
import { Calendar, Users, Smartphone } from "lucide-react";

export const HowItWorksSection = () => {
  const steps = [
    {
      icon: Calendar,
      title: "Enter Birth Details",
      description: "Provide your birth date, time, and location for accurate astrological calculations.",
      color: "text-purple-600"
    },
    {
      icon: Users,
      title: "Horoscope Generated",
      description: "Our system analyzes planetary positions and creates your personalized birth chart.",
      color: "text-pink-600"
    },
    {
      icon: Smartphone,
      title: "Daily Tasks Suggested",
      description: "Receive customized to-dos that align with cosmic energies and your unique chart.",
      color: "text-blue-600"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform ancient wisdom into modern productivity with just three simple steps
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group hover-scale">
              <div className="relative mb-6">
                <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center ${step.color} transition-transform group-hover:scale-110`}>
                  <step.icon className="w-10 h-10" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-yellow-800">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
