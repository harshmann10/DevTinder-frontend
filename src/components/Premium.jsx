import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

// A simple checkmark icon component
const CheckIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-success"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

// A simple cross icon component
const CrossIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-error"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
        />
    </svg>
);

// --- Main Page Component ---
function Premium() {
    const [isYearly, setIsYearly] = useState(false);

    const handleBuyNowClick = async (type) => {
        const order = await axios.post(
            BASE_URL + "/payment/create",
            { type, period: isYearly ? 'yearly' : 'monthly' },
            { withCredentials: true }
        );

        const { keyId, amount, currency, notes, orderId } = order.data;

        const options = {
            key: keyId,
            amount,
            currency,
            name: 'Dev Tinder',
            description: 'Test Transaction',
            order_id: orderId,
            prefill: {
                name: notes.firstName + ' ' + notes.lastName,
                email: notes.email,
            },
            theme: {
                color: '#F37254'
            },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const tiers = [
        {
            name: "basic",
            monthlyPrice: 249,
            yearlyPrice: 2499,
            features: [
                { text: "10 Swipes per day", included: true },
                { text: "Basic Filtering", included: true },
                { text: "Community Support", included: true },
                { text: "Project Collaboration (view only)", included: true },
                { text: "Code Review (1 per month)", included: true },
                { text: "Pair Programming", included: false },
                { text: "Stealth Mode", included: false },
            ],
            buttonText: "Go Basic",
            buttonVariant: "btn-primary",
            isPopular: false,
        },
        {
            name: "Pro",
            monthlyPrice: 1249,
            yearlyPrice: 12499,
            features: [
                { text: "Unlimited Swipes", included: true },
                { text: "Advanced Filtering (language, experience)", included: true },
                { text: "Priority Support", included: true },
                { text: "Project Collaboration (full access)", included: true },
                { text: "Code Review (5 per month)", included: true },
                { text: "Pair Programming (10 hours/month)", included: true },
                { text: "Stealth Mode", included: false },
            ],
            buttonText: "Go Pro",
            buttonVariant: "btn-secondary",
            isPopular: true,
        },
        {
            name: "Ultra",
            monthlyPrice: 2499,
            yearlyPrice: 24999,
            features: [
                { text: "Unlimited Swipes", included: true },
                {
                    text: "Advanced Filtering (language, experience, skills)",
                    included: true,
                },
                { text: "Dedicated Support", included: true },
                { text: "Project Collaboration (full access)", included: true },
                { text: "Unlimited Code Reviews", included: true },
                { text: "Unlimited Pair Programming", included: true },
                { text: "Stealth Mode", included: true },
            ],
            buttonText: "Become an Ultra",
            buttonVariant: "btn-accent",
            isPopular: false,
        },
    ];

    return (
        <div className="bg-base-200 min-h-screen antialiased">
            <div className="container mx-auto px-4 py-16 lg:py-24">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl lg:text-5xl font-extrabold mb-3">
                        Upgrade Your DevTinder Experience
                    </h1>
                    <p className="text-lg text-base-content/70">
                        Unlock exclusive features to connect with fellow developers.
                    </p>
                </div>

                {/* Monthly/Yearly Toggle */}
                <div className="flex justify-center items-center gap-4 mb-10">
                    <span className={`font-medium ${!isYearly ? "text-primary" : ""}`}>
                        Monthly
                    </span>
                    <input
                        type="checkbox"
                        className="toggle toggle-primary"
                        checked={isYearly}
                        onChange={() => setIsYearly(!isYearly)}
                    />
                    <span className={`font-medium ${isYearly ? "text-primary" : ""}`}>
                        Yearly{" "}
                        <span className="text-sm font-normal text-success">(Save 16%)</span>
                    </span>
                </div>

                {/* Pricing Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {tiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`card bg-base-100 shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl ${tier.isPopular ? "border-2 border-secondary" : ""
                                }`}
                        >
                            <div className="card-body">
                                {tier.isPopular && (
                                    <div className="badge badge-secondary self-center">
                                        Most Popular
                                    </div>
                                )}

                                <h2 className="card-title text-2xl font-bold justify-center my-4">
                                    {tier.name}
                                </h2>

                                <div className="text-center mb-6">
                                    <span className="text-5xl font-extrabold">
                                        ₹
                                        {isYearly
                                            ? tier.yearlyPrice.toLocaleString("en-IN")
                                            : tier.monthlyPrice.toLocaleString("en-IN")}
                                    </span>
                                    <span className="text-xl text-base-content/70">
                                        /{isYearly ? "yr" : "mo"}
                                    </span>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {tier.features.map((feature) => (
                                        <li key={feature.text} className="flex items-center gap-3">
                                            {feature.included ? <CheckIcon /> : <CrossIcon />}
                                            <span>{feature.text}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="card-actions justify-center">
                                    <button
                                        className={`btn w-full btn-outline ${tier.buttonVariant}`}
                                        onClick={() => handleBuyNowClick(tier.name.toLowerCase())}
                                    >
                                        {tier.buttonText}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Premium;
