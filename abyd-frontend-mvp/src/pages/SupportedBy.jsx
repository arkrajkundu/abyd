import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import "./SupportedBy.css";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";
import logo3 from "../assets/logo3.png";
import logo4 from "../assets/logo4.png";
import logo5 from "../assets/logo5.png";
import logo6 from "../assets/logo6.png";
import logo7 from "../assets/DPIIT-header.png";
import logo8 from "../assets/logo8.png";
import logo9 from "../assets/logo9.png";
import logo10 from "../assets/logo10.png";
import logo11 from "../assets/logo11.png";
const SupportedBy = () => {
  const logos = [
    { id: 1, src: logo1, alt: "iSTART" },
    { id: 2, src: logo2, alt: "STPI Next Initiatives" },
    { id: 3, src: logo3, alt: "Startup Punjab" },
    { id: 4, src: logo4, alt: "DSCI" },
    { id: 5, src: logo5, alt: "Microsoft for Startups" },
    { id: 6, src: logo6, alt: "Chitkara University" },
    { id: 7, src: logo7, alt: "DPIIT" },
    { id: 8, src: logo8, alt: "Neuron" },
    { id: 9, src: logo9, alt: "Amazon" },
    { id: 10, src: logo10, alt: "ACIC" },
    { id: 11, src: logo11, alt: "IMPun" },
  ];

  // Group logos into chunks of 4
  const chunkedLogos = [];
  for (let i = 0; i < logos.length; i += 4) {
    chunkedLogos.push(logos.slice(i, i + 4));
  }

  return (
    <section className="supported-by">
      <h2>Supported By</h2>
      <div className="carousel-container">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showIndicators={false}
          showStatus={false}
          interval={3000} // Time interval between slides in milliseconds
          stopOnHover={false} // Carousel doesn't stop when hovered
        >
          {chunkedLogos.map((group, index) => (
            <div key={index} className="logo-slide">
              {group.map((logo) => (
                <img key={logo.id} src={logo.src} alt={logo.alt} className="logo" />
              ))}
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default SupportedBy;
