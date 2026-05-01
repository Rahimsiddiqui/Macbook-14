import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import ProductViewer from "./components/ProductViewer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

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

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default App;
