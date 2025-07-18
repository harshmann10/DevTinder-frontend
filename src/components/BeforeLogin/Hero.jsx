import { Link } from "react-router-dom";

function Hero() {
    return (
        <section className="flex-1 flex flex-col md:flex-row items-center justify-evenly px-6 md:px-20 py-16">
            <div className="max-w-xl space-y-6">
                <h1 className="text-5xl font-bold text-white">
                    Find Your Next Dev Partner
                </h1>
                <p className="text-lg text-slate-300">
                    Connect. Collaborate. Build cool things together.
                </p>
                <div className="space-x-4">
                    <Link
                        to="/SignUp"
                        className="px-6 py-3 bg-blue-700 rounded-xl font-medium hover:bg-blue-500 transition"
                    >
                        Get Started
                    </Link>
                    <Link
                        to="/login"
                        className="px-6 py-3 border border-slate-600 rounded-xl font-medium hover:border-slate-400 transition"
                    >
                        Login
                    </Link>
                </div>
            </div>
            <div className="mt-10 md:mt-0">
                <img
                    src="/dev.svg"
                    alt="Developer coding illustration"
                    className="w-[420px] mx-auto"
                />
            </div>
        </section>
    );
}

export default Hero;
