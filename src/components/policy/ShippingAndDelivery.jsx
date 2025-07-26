import { Link } from "react-router-dom";

const ShippingAndDelivery = () => {
    return (
        <div className="bg-base-100 text-gray-100">
            <div className="container mx-auto px-4 py-8">
                <Link
                    to="/"
                    className="text-gray-200 hover:underline mb-4 inline-block"
                >
                    &larr; Back to Home
                </Link>
                <h1 className="text-3xl font-bold mb-6">
                    Shipping and Delivery Policy
                </h1>

                <div className="bg-base-200 shadow-md border border-gray-700 rounded-lg p-6">
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-2">1. Nature of Service</h2>
                        <p className="mb-4">
                            DevTinder is a digital platform designed to connect developers. As
                            such, we do not offer or deal in physical products that require
                            shipping or delivery. All our services are provided digitally and
                            are accessible online.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-2">2. Digital Access</h2>
                        <p className="mb-4">
                            Upon successful registration and/or subscription, users gain
                            immediate access to the features and functionalities of the
                            DevTinder platform. There are no delivery times or shipping fees
                            associated with our services.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-2">
                            3. Service Availability
                        </h2>
                        <p className="mb-4">
                            Our services are available globally, subject to internet
                            connectivity and compliance with our Terms of Service. Access to
                            the platform is granted electronically.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">4. Contact Us</h2>
                        <p className="mb-4">
                            If you have any questions regarding access to our digital
                            services, please contact us at:
                        </p>
                        <p className="mt-2 mb-4">Email: devtinder6@gmail.com</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ShippingAndDelivery;
