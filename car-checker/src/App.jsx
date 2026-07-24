import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import FloatingStyles from "./components/FloatingStyles";
import Home from "./pages/Home";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Guides from "./pages/Guides";
import GuideArticle from "./pages/GuideArticle";
import { COLORS } from "./theme";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full" style={{ backgroundColor: COLORS.paper }}>
        <FloatingStyles />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/guides/:slug" element={<GuideArticle />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}