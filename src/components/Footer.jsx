import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="flex flex-col md:flex-row bg-base-300 text-neutral-content items-center justify-around p-4 gap-4">
            <div className="flex items-center gap-2">
                <img src="/icon.svg" alt="icon" />
                <span className="text-white text-xl">DevTinder</span>
            </div>
            <aside className="flex flex-col items-center text-center">
                <p>DevTinder - Connecting Developers since 2025</p>
                <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
                <div className="flex gap-4 mt-4">
                    <Link to="/terms-of-service" className="link link-hover">
                        Terms of Service
                    </Link>
                    <Link to="/privacy-policy" className="link link-hover">
                        Privacy Policy
                    </Link>
                    <Link to="/contact-us" className="link link-hover">
                        Contact Us
                    </Link>
                    <Link to="/cancellation-and-refund" className="link link-hover">
                        Cancellation And Refund
                    </Link>
                    <Link to="/shipping-And-delivery" className="link link-hover">
                        Shipping And Delivery
                    </Link>
                </div>
            </aside>
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <a href="https://www.linkedin.com/in/harsh-mann01/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin size={24} />
                    </a>
                    <a href="https://github.com/harshmann10" target="_blank" rel="noopener noreferrer">
                        <FaGithub size={24} />
                    </a>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;
