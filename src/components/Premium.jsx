import { useState, useEffect } from "react";
import api from "../utils/apiAxios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

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
    const user = useSelector((store) => store.user);
    const isUserPremium = user?.isPremium;
    const membershipType = user?.membershipType;
    const membershipValidity = user?.membershipValidity;
    const dispatch = useDispatch();

    // useEffect(() => {
    //     verifyPremiumUser();
    // }, []);

    const verifyPremiumUser = async () => {
        try {
            const res = await api.get("/payment/verify");

            if (res.data.isPremium) {
                const updatedUserResponse = await api.get("/profile/view");
                dispatch(addUser(updatedUserResponse.data));
            }
        } catch (error) {
            console.error("Error verifying premium user:", error);
        }
    };

    const handleBuyNowClick = async (type) => {
        try {
            const order = await api.post("/payment/create", {
                type,
                period: isYearly ? "yearly" : "monthly",
            });

            const { keyId, amount, currency, notes, orderId } = order.data;

            const options = {
                key: keyId,
                amount,
                currency,
                name: "Dev Tinder",
                description: "Test Transaction",
                order_id: orderId,
                prefill: {
                    name: notes.firstName + " " + notes.lastName,
                    email: notes.email,
                },
                theme: {
                    color: "#F37254",
                },
                handler: verifyPremiumUser,
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Error during payment process:", error);
            alert("Something went wrong. Please try again.");
        }
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

    const currentMembershipButtonVariant = tiers.find(
        (tier) => tier.name.toLowerCase() === membershipType?.toLowerCase()
    )?.buttonVariant;

    return (
        <div className="bg-base-200 min-h-screen antialiased">
            <div className="container mx-auto px-4 py-16 lg:py-8">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl lg:text-5xl font-extrabold mb-3">
                        Your Premium Membership
                    </h1>
                    <p className="text-lg text-base-content/70">
                        Manage your subscription and explore other plans.
                    </p>
                </div>

                {/* Current Membership Status */}
                <div className="max-w-2xl mx-auto mb-12">
                    <div
                        className={`card bg-base-100 shadow-xl border-2 ${currentMembershipButtonVariant?.replace("btn", "border") ||
                            "border-primary"
                            }`}
                    >
                        <div className="card-body">
                            <div
                                className={`badge ${currentMembershipButtonVariant?.replace("btn", "badge") ||
                                    "badge-primary"
                                    } self-center mb-4`}
                            >
                                Current Membership Tier
                            </div>
                            <h2 className="card-title text-3xl font-bold justify-center my-4 capitalize">
                                {isUserPremium ? membershipType : "Free Plan"}
                            </h2>
                            <div className="text-center">
                                <p className="text-lg text-base-content/80">
                                    Valid until:{" "}
                                    <span className="font-semibold">
                                        {isUserPremium
                                            ? new Date(membershipValidity).toLocaleDateString()
                                            : "Unlimited"}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Tier Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl lg:text-4xl font-extrabold mb-3">
                        {isUserPremium
                            ? "Change Membership Tier"
                            : "Upgrade Your DevTinder Experience"}
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
                    <div className="form-control">
                        <label className="label cursor-pointer gap-2">
                            <input
                                type="checkbox"
                                className="toggle toggle-primary"
                                checked={isYearly}
                                onChange={() => setIsYearly(!isYearly)}
                            />
                            <span className={`font-medium ${isYearly ? "text-primary" : ""}`}>
                                Yearly{" "}
                                <span className="text-sm font-normal text-success">
                                    (Save 16%)
                                </span>
                            </span>
                        </label>
                    </div>
                </div>

                {/* Pricing Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {tiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`card bg-base-100 shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl ${tier.name.toLowerCase() === membershipType?.toLowerCase()
                                    ? `border-2 ${tier.buttonVariant?.replace("btn", "border")}`
                                    : ""
                                } ${tier.isPopular ? "border-2 border-secondary" : ""}`}
                        >
                            <div className="card-body pt-12">
                                {isUserPremium
                                    ? tier.name.toLowerCase() ===
                                    membershipType?.toLowerCase() && (
                                        <div
                                            className={`badge ${tier.buttonVariant?.replace(
                                                "btn",
                                                "badge"
                                            )} absolute top-4 left-1/2 -translate-x-1/2`}
                                        >
                                            Current Plan
                                        </div>
                                    )
                                    : tier.isPopular && (
                                        <div className="badge badge-secondary absolute top-4 left-1/2 -translate-x-1/2">
                                            Most Popular
                                        </div>
                                    )}

                                <h2 className="card-title text-2xl font-bold justify-center my-2">
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
                                        className={`btn w-full ${tier.name.toLowerCase() === membershipType?.toLowerCase()
                                                ? "btn-primary btn-disabled"
                                                : `btn-outline ${tier.buttonVariant}`
                                            }`}
                                        onClick={() => handleBuyNowClick(tier.name.toLowerCase())}
                                        disabled={
                                            tier.name.toLowerCase() === membershipType?.toLowerCase()
                                        }
                                    >
                                        {tier.name.toLowerCase() === membershipType?.toLowerCase()
                                            ? "Current Plan"
                                            : `Switch to ${tier.name}`}
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
