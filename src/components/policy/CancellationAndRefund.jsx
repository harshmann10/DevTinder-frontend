import { Link } from "react-router-dom";

const CancellationAndRefund = () => {
    return (
        <div className="min-h-screen bg-base-100 text-gray-100">
            <div className="container mx-auto px-4 py-8">
                <Link
                    to="/"
                    className="text-gray-200 hover:underline mb-4 inline-block"
                >
                    &larr; Back to Home
                </Link>
                <h1 className="text-3xl font-bold mb-6">
                    Cancellation and Refund Policy
                </h1>

                <div className="bg-base-200 shadow-md border border-gray-700 rounded-lg p-6">
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-2">
                            1. Cancellation Policy
                        </h2>
                        <p className="mb-4">
                            Users may cancel their subscription or service at any time.
                            Cancellations will take effect at the end of the current billing
                            period. No pro-rata refunds will be issued for partial periods.
                        </p>
                        <p className="mb-4">
                            To cancel your subscription, please navigate to your account
                            settings and follow the cancellation instructions.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-2">2. Refund Policy</h2>
                        <h3 className="text-xl font-semibold mb-2">
                            2.1. Subscription Services
                        </h3>
                        <p className="mb-4">
                            Generally, all sales for subscription services are final and
                            non-refundable. We do not offer refunds for any subscription
                            period that has already begun.
                        </p>
                        <p className="mb-4">
                            In exceptional circumstances, such as technical issues preventing
                            access to the service for an extended period, a refund may be
                            considered on a case-by-case basis. Please contact our support
                            team with detailed information.
                        </p>

                        <h3 className="text-xl font-semibold mb-2 mt-4">
                            2.2. Digital Products/One-time Purchases
                        </h3>
                        <p className="mb-4">
                            For any digital products or one-time purchases, refunds may be
                            issued within [X] days of purchase if the product is found to be
                            defective or not as described.
                        </p>
                        <p className="mb-4">
                            To request a refund for a digital product, please contact our
                            support team at [Your Support Email] with your order details and
                            the reason for your request.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-2">3. Changes to Policy</h2>
                        <p className="mb-4">
                            DevTinder reserves the right to modify this Cancellation and
                            Refund Policy at any time. Any changes will be effective
                            immediately upon posting the updated policy on our website. Your
                            continued use of our services after any such changes constitutes
                            your acceptance of the new policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">4. Contact Us</h2>
                        <p className="mb-4">
                            If you have any questions about this Cancellation and Refund
                            Policy, please contact us at:
                        </p>
                        <p className="mt-2 mb-4">Email: [Your Support Email]</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CancellationAndRefund;
