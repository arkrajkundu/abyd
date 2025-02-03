import React, { useEffect, useState, useRef } from 'react';
import './LandingPage.css';
import HeroSection from './HeroSection';
import FeaturesOverview from './FeatureOverview';
import HowItWorks from './HowItWorks';
import Industries from './Industries';
import Contact from './Contact';
import Pricing from './Pricing';
import SupportedBy from './SupportedBy';
import Footer from './Footer';
import Resources from './Resources';
import abydImage from '../assets/abyd.png';
import AboutUs from './AboutUs';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/signup');
  };
  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => [...new Set([...prev, entry.target.id])]);
          }
        });
      },
      { threshold: 0.2 } // Adjust visibility threshold as needed
    )
  );

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.current.observe(section));

    return () => {
      sections.forEach((section) => observer.current.unobserve(section));
    };
  }, []);

  const isVisible = (sectionId) => visibleSections.includes(sectionId);

  return (
    <div className="landing-page">
      <header className="navbar">
        <img src={abydImage} alt="Abyd" className="Abyd" />
        <nav className="menu">
          <a href="#hero">Home</a>
          <a href="#aboutus">About Us</a>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#industries">Industries</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="actions">
        <button className="sign-in" onClick={handleSignInClick}>Sign in</button>
          <button className="get-demo"><a href="https://calendly.com/groverswastik/30min" target='_blank'><i className='bx bx-phone'></i> Free call</a></button>
        </div>
      </header>

      <section id="hero" className={isVisible('hero') ? 'fade-in' : 'hidden'}>
        <HeroSection />
      </section>
      <section id="aboutus" className={isVisible('aboutus') ? 'fade-in' : 'hidden'}>
        <AboutUs />
      </section>
      <section id="features" className={isVisible('features') ? 'fade-in' : 'hidden'}>
        <FeaturesOverview />
      </section>
      <section id="how-it-works" className={isVisible('how-it-works') ? 'fade-in' : 'hidden'}>
        <HowItWorks />
      </section>
      <section id="industries" className={isVisible('industries') ? 'fade-in' : 'hidden'}>
        <Industries />
      </section>
      <section id="contact" className={isVisible('contact') ? 'fade-in' : 'hidden'}>
        <Contact />
      </section>
      <section id="support" className={isVisible('support') ? 'fade-in' : 'hidden'}>
        <SupportedBy />
      </section>
      <section id="footer" className={isVisible('footer') ? 'fade-in' : 'hidden'}>
        <Footer />
      </section>
    </div>
  );
};

export default LandingPage;
