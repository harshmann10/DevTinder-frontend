import { useState, useEffect, useCallback, useRef } from "react";

const testimonials = [
  {
    id: "slide1",
    quote: "DevTinder helped me find a co-founder for my startup!",
    name: "Jane",
    role: "Full Stack Developer",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    id: "slide2",
    quote:
      "I matched with amazing devs and learned so much from collaborating!",
    name: "Priya",
    role: "Frontend Developer",
    avatar: "https://i.pravatar.cc/150?img=35",
  },
  {
    id: "slide3",
    quote: "The community is super supportive and the matching is spot on.",
    name: "Alex",
    role: "Backend Developer",
    avatar: "https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk",
  },
  {
    id: "slide4",
    quote: "I found my dream team for a hackathon through DevTinder!",
    name: "Johnson",
    role: "UI/UX Designer",
    avatar:
      'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"',
  },
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

  // Effect to observe if the component is in the viewport to pause the timer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 } // Start/stop timer if 10% of the component is visible
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

  // Effect for auto-playing the carousel, but only when it's visible.
  useEffect(() => {
    if (isIntersecting) {
      const timer = setTimeout(goToNext, 5000); // 5-second delay
      return () => clearTimeout(timer);
    }
  }, [currentIndex, goToNext, isIntersecting]);

  // Effect to programmatically scroll the carousel container.
  // This replaces `scrollIntoView` to prevent the whole page from jumping.
  useEffect(() => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: currentIndex * slideWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  return (
    <section
      ref={sectionRef}
      className="px-6 md:px-20 py-16 flex flex-col md:flex-row items-start md:items-center"
    >
      <div className="md:w-1/2">
        <h2 className="text-3xl font-semibold mb-8">How It Works</h2>
        <div className="space-y-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-600 rounded-full mr-4">
              <img src="/profile.svg" alt="" className="w-10" />
            </div>
            <span className="font-medium">Create a Dev Profile</span>
          </div>
          <div className="flex items-center">
            <div className="p-3 bg-blue-600 rounded-full mr-4">
              <img src="/Match.svg" alt="" className="w-10" />
            </div>
            <span className="font-medium">Match with Devs</span>
          </div>
          <div className="flex items-center">
            <div className="p-3 bg-blue-600 rounded-full mr-4">
              <img src="/collab.svg" alt="" className="w-10" />
            </div>
            <span className="font-medium">Collaborate on Projects</span>
          </div>
        </div>
      </div>
      <div ref={carouselRef} className="carousel w-full">
        {testimonials.map((review) => (
          <div
            key={review.id}
            id={review.id}
            className="carousel-item relative w-full flex flex-col items-center justify-center bg-base-200 py-12"
          >
            <div className="avatar mb-4">
              <div className="w-20 rounded-full">
                <img src={review.avatar} alt="User" />
              </div>
            </div>
            <p className="text-lg italic text-center mb-2">{review.quote}</p>
            <span className="font-semibold">
              - {review.name}, {review.role}
            </span>
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <button onClick={goToPrev} className="btn btn-circle btn-ghost">
                ❮
              </button>
              <button onClick={goToNext} className="btn btn-circle btn-ghost">
                ❯
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
