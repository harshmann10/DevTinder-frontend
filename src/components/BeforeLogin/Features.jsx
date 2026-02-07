import React from "react";

function Features() {
  const features = [
    {
      icon: "/coder.svg",
      title: "Smart Matching",
      description: "Find developers with similar interests, skills, and goals to collaborate on meaningful projects.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: "/lock.svg",
      title: "Secure & Private",
      description: "Enterprise-grade security with JWT authentication and encrypted communications to protect your data.",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: "/project.svg",
      title: "Project Focused",
      description: "Collaborate on real projects, build your portfolio, and create something amazing together.",
      gradient: "from-pink-500 to-pink-600"
    }
  ];

  return (
    <section className="relative px-6 md:px-20 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold text-white">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">DevTinder</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Everything you need to find, connect, and collaborate with amazing developers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105"
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/15 group-hover:to-cyan-500/15 transition-all duration-300"></div>

              {/* Card content */}
              <div className="relative bg-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 group-hover:border-slate-600 transition-all h-full flex flex-col">
                {/* Icon container with gradient background */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} p-3 mb-6 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}>
                  <img src={feature.icon} alt={feature.title} className="w-8 h-8" />
                </div>

                {/* Text content */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-all">
                  {feature.title}
                </h3>
                <p className="text-slate-300 leading-relaxed flex-grow">
                  {feature.description}
                </p>

                {/* Bottom accent */}
                <div className="w-12 h-1 bg-blue-400 rounded-full mt-6 group-hover:w-full transition-all duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
