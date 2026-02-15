import { Link } from "react-router-dom";
import { FaCheckCircle, FaCode } from "react-icons/fa";

function Hero() {
    return (
        <section className="relative overflow-hidden px-6 md:px-20 py-20 md:py-32">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent rounded-3xl blur-3xl opacity-40"></div>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl"></div>

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="max-w-2xl space-y-8">
                    <div className="space-y-4">
                        <div className="inline-block">
                            <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 uppercase tracking-wider">Welcome to DevTinder</span>
                        </div>
                        <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
                            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Dev Partner</span>
                        </h1>
                    </div>
                    <p className="text-xl text-slate-300 leading-relaxed">
                        Connect with talented developers, collaborate on exciting projects, and build the future together. Your next great partnership is just a match away.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Link
                            to="/signup"
                            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl font-semibold text-white hover:from-blue-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50 text-center"
                        >
                            Get Started Free
                        </Link>
                        <Link
                            to="/login"
                            className="px-8 py-4 border-2 border-slate-400 rounded-xl font-semibold text-white hover:border-slate-200 hover:bg-white/10 transition-all duration-300 text-center"
                        >
                            Sign In
                        </Link>
                    </div>
                    <div className="flex gap-8 pt-4 text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                            <FaCheckCircle className="w-5 h-5 text-green-400" />
                            <span>Free to join</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaCheckCircle className="w-5 h-5 text-green-400" />
                            <span>Verified developers</span>
                        </div>
                    </div>
                </div>
                <div className="relative md:flex-1 flex justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-400/10 rounded-3xl blur-2xl"></div>
                    <div className="relative w-full max-w-md md:max-w-lg drop-shadow-2xl animate-float flex items-center justify-center">
                        <FaCode className="w-48 h-48 text-blue-400/30" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
