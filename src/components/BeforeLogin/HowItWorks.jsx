import { useState, useEffect, useCallback, useRef } from "react";

const testimonials = [
  {
    id: "slide1",
    quote: "DevTinder helped me find a co-founder for my startup! The matching algorithm is incredibly accurate.",
    name: "Jane",
    role: "Full Stack Developer",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    id: "slide2",
    quote:
      "I matched with amazing devs and learned so much from collaborating! Best decision ever.",
    name: "Priya",
    role: "Frontend Developer",
    avatar: "https://i.pravatar.cc/150?img=35",
  },
  {
    id: "slide3",
    quote: "The community is super supportive and the matching is spot on. Highly recommended!",
    name: "Alex",
    role: "Backend Developer",
    avatar: "https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk",
  },
  {
    id: "slide4",
    quote: "I found my dream team for a hackathon through DevTinder! We won 3rd place!",
    name: "Johnson",
    role: "UI/UX Designer",
    avatar:
      'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"',
  },
];

const steps = [
  {
    number: "01",
    icon: "/profile.svg",
    title: "Create Your Profile",
    description: "Set up your developer profile with your skills, interests, and project ideas."
  },
  {
    number: "02",
    icon: "/Match.svg",
    title: "Get Smart Matches",
    description: "Our AI algorithm finds developers that match your interests and goals."
  },
  {
    number: "03",
    icon: "/collab.svg",
    title: "Start Collaborating",
    description: "Connect, chat, and build amazing projects together with your matches."
  }
];

function HowItWorks() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const carouselRef = useRef(null);
  const sectionRef = useRef(null);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  useEffect(() => {
    if (isIntersecting) {
      const timer = setTimeout(goToNext, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, goToNext, isIntersecting]);

  useEffect(() => {
    if (carouselRef.current) {
      const carousel = carouselRef.current;
      carousel.scrollLeft = currentIndex * carousel.offsetWidth;
    }
  }, [currentIndex]);

  return (
    <section ref={sectionRef} className="relative px-6 md:px-20 py-20">
      <div className="max-w-6xl mx-auto">
        {/* How It Works Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Get started in three simple steps and find your perfect dev partner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0"></div>

            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="relative bg-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 h-full hover:border-blue-500/50 transition-all group">
                  {/* Step number badge */}
                  <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center font-bold text-white border-4 border-slate-900 group-hover:scale-110 transition-transform">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-3 mb-6 flex items-center justify-center group-hover:from-blue-500/40 group-hover:to-cyan-500/40 transition-all">
                    <img src={step.icon} alt={step.title} className="w-8 h-8" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-24 pt-16 border-t border-slate-700">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
              What Developers Say
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Join thousands of developers who found their perfect collaborators.
            </p>
          </div>

          <div className="relative">
            <div
              ref={carouselRef}
              className="overflow-x-auto scroll-smooth flex max-w-4xl mx-auto carousel"
              style={{ scrollBehavior: "smooth", scrollSnapType: 'x mandatory' }}
            >
              {testimonials.map((review) => (
                <div
                  key={review.id}
                  className="snap-center flex-shrink-0 w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 border border-slate-700/50 hover:border-blue-500/50 transition-all h-[320px]"
                >
                  {/* Star rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-lg md:text-xl text-white mb-6 italic leading-relaxed text-center">
                    "{review.quote}"
                  </p>

                  {/* User info */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500/50 flex-shrink-0">
                      <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-lg">{review.name}</p>
                      <p className="text-sm text-slate-400">{review.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={goToPrev}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600 transition-all transform hover:scale-110 flex items-center justify-center shadow-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600 transition-all transform hover:scale-110 flex items-center justify-center shadow-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${index === currentIndex
                    ? "bg-blue-500 w-8"
                    : "bg-slate-600 w-2 hover:bg-slate-500"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
