import {
    FaRobot,
    FaUserMd,
    FaCalendarCheck,
    FaHistory,
    FaShieldAlt,
    FaHeartbeat
} from "react-icons/fa";

const About = () => {

    const features = [
        {
            icon: <FaRobot />,
            title: "AI Healthcare Chatbot",
            description:
                "Get intelligent healthcare guidance powered by AI for symptom analysis and general health-related questions."
        },
        {
            icon: <FaHeartbeat />,
            title: "AI Diagnosis",
            description:
                "Describe your symptoms and receive AI-generated insights to help understand possible conditions."
        },
        {
            icon: <FaUserMd />,
            title: "Verified Doctors",
            description:
                "Book appointments with verified healthcare professionals securely."
        },
        {
            icon: <FaCalendarCheck />,
            title: "Appointment Booking",
            description:
                "Schedule doctor appointments quickly with an easy booking system."
        },
        {
            icon: <FaHistory />,
            title: "Chat History",
            description:
                "Access previous AI conversations anytime for future reference."
        },
        {
            icon: <FaShieldAlt />,
            title: "Secure Authentication",
            description:
                "Protected using JWT authentication and role-based access for Patients, Doctors."
        }
    ];

    return (
        <div className="bg-black text-white min-h-screen">

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-6 py-24 text-center">

                <span className="bg-red-600 px-4 py-1 rounded-full text-sm">
                    AI Powered Healthcare
                </span>

                <h1 className="text-5xl md:text-6xl font-bold mt-6">
                    About Our Platform
                </h1>

                <p className="max-w-3xl mx-auto mt-8 text-gray-400 text-lg leading-8">
                    AI Healthcare Assistant is designed to bridge the gap between
                    patients and healthcare professionals using Artificial
                    Intelligence. Our platform helps users understand symptoms,
                    interact with an AI medical assistant, connect with verified
                    doctors, and securely manage healthcare information from one
                    place.
                </p>

            </section>

            {/* Mission */}
            <section className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-10">

                <div className="bg-zinc-900 rounded-3xl p-8">
                    <h2 className="text-3xl font-bold mb-5 text-red-500">
                        Our Mission
                    </h2>

                    <p className="text-gray-400 leading-8">
                        Our mission is to make healthcare guidance more
                        accessible through Artificial Intelligence while helping
                        patients connect with trusted doctors. We aim to provide
                        fast, secure, and user-friendly healthcare assistance
                        without replacing professional medical advice.
                    </p>
                </div>

                <div className="bg-zinc-900 rounded-3xl p-8">
                    <h2 className="text-3xl font-bold mb-5 text-red-500">
                        Our Vision
                    </h2>

                    <p className="text-gray-400 leading-8">
                        We envision a future where AI empowers people to make
                        informed healthcare decisions, improves access to medical
                        information, and supports healthcare professionals with
                        intelligent digital tools.
                    </p>
                </div>

            </section>

            {/* Features */}
            <section className="max-w-7xl mx-auto px-6 py-20">

                <h2 className="text-4xl font-bold text-center mb-16">
                    What We Offer
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {features.map((feature, index) => (

                        <div
                            key={index}
                            className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 hover:border-red-500 transition duration-300"
                        >

                            <div className="text-4xl text-red-500 mb-6">
                                {feature.icon}
                            </div>

                            <h3 className="text-xl font-semibold mb-3">
                                {feature.title}
                            </h3>

                            <p className="text-gray-400 leading-7">
                                {feature.description}
                            </p>

                        </div>

                    ))}

                </div>

            </section>

            {/* CTA */}
            <section className="py-24 text-center px-6">

                <h2 className="text-4xl font-bold">
                    Smarter Healthcare Starts Here
                </h2>

                <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
                    Whether you're looking for AI-powered health guidance or
                    booking appointments with verified doctors, our platform is
                    built to provide a secure and seamless healthcare experience.
                </p>

                <button className="mt-10 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-semibold transition">
                    Get Started
                </button>

            </section>

        </div>
    );
};

export default About;