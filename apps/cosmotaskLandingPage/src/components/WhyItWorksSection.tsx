
export const WhyItWorksSection = () => {
  const examples = [
    {
      planet: "Mars in Aries",
      effect: "Action-oriented tasks",
      description: "When Mars is in Aries, your energy is high and focused. Perfect time for tackling challenging projects and making important decisions."
    },
    {
      planet: "Venus in Libra",
      effect: "Relationship & creativity",
      description: "Venus in Libra enhances your social and artistic abilities. Ideal for networking, design work, and harmonizing relationships."
    },
    {
      planet: "Mercury Retrograde",
      effect: "Review & reflection",
      description: "During Mercury retrograde, focus on reviewing past work, backing up data, and avoiding major communications or purchases."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">The Science Behind the Magic</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Astrology observes how planetary movements correlate with human behavior and energy patterns. 
            Our app translates these ancient insights into practical, modern productivity strategies.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {examples.map((example, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {example.planet.split(' ')[0][0]}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">{example.planet}</h3>
              <p className="text-purple-600 font-medium text-center mb-3">→ {example.effect}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{example.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-white rounded-xl p-8 shadow-lg max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Spiritual Meets Scientific</h3>
          <p className="text-gray-700 leading-relaxed text-center">
            While astrology is an ancient practice, modern psychology recognizes that our environment, 
            including celestial cycles, can influence our moods and energy levels. Our app bridges this gap, 
            offering both spiritual insight and practical psychology-backed productivity techniques.
          </p>
        </div>
      </div>
    </section>
  );
};
