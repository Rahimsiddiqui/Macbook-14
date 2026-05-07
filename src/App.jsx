import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import ProductViewer from "./components/ProductViewer";
import Showcase from "./components/Showcase";
import Performance from "./components/Performance";
import Features from "./components/Features";
import Highlights from "./components/Highlights";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  return (
    <main>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Product Viewer Section */}
      <ProductViewer />

      {/* Showcase Section */}
      <Showcase />

      {/* Performance Section */}
      <Performance />

      {/* Features Section */}
      <Features />

      {/* Highlights Section */}
      <Highlights />

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default App;
