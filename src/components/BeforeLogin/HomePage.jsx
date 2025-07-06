import Features from "./Features";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";

function HomePage() {
    return (
        <div>
            <main data-theme="black">
                <Hero />
                <Features />
                <HowItWorks />
            </main>
        </div>
    );
}

export default HomePage;
