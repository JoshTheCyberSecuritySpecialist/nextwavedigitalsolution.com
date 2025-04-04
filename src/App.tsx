import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import EnterpriseSupport from './components/EnterpriseSupport';
import Pricing from './components/Pricing';
import Blog from './components/Blog';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <EnterpriseSupport />
      <Pricing />
      <Blog />
      <Contact />
    </div>
  );
}

export default App;