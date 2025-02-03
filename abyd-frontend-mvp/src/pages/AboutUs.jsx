import React from 'react'
import './HeroSection.css';
import heroImage from '../assets/Aboutus.png'
function AboutUs() {
  return (
    <section className="hero-section">
          <div className="hero-content">
            <h1>About Us</h1>
            <p>
            We are Datence Technologies building One Stop Legal & Compliance Platform called ABYD specifically
for start-ups founders. This platform will assist in ensuring 360-degree legal & compliance solutions by
providing access to all relevant laws, regulations, industry best practices, documents, and
certifications necessary for start-ups. Our goal is to become the go-to legal compliance
consultant for founders at all stages, transforming day-to-day legal compliance from a burden
into a competitive advantage.
We not only help the founders in identifying the risk areas where they need
assistance but also we provide them with expert guidance to make them legally prepared to
operate safely and effectively within their industry.
            </p>
            {/* <div className="hero-buttons">
              <button className="cta-primary">Get Free Demo</button>
              <button className="cta-secondary">Learn More</button>
            </div> */}
          </div>
          <div className="hero-visual">
            <img src={heroImage} alt="Hero Visual" />
          </div>
        </section>
  )
}

export default AboutUs