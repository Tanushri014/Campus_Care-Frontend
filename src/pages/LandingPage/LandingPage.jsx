import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import About from "../../components/About/About";
import Features from "../../components/Features/Features";
import Footer from "../../components/Footer/Footer";

function LandingPage() {
    return (
        <>
            <Navbar />
            <Hero />
            <About />
            <Features />
            <Footer />
        </>
    );
}

export default LandingPage;