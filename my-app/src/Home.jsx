import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Home.css';

const Home = () => {
  const [activeBox, setActiveBox] = useState(null);

  useEffect(() => {
    const elements = document.querySelectorAll('.animate-fade');
    elements.forEach((el, i) => {
      el.style.animationDelay = `${i * 0.1}s`; // ✅ Fixed template string
      el.classList.add('fade-in');
    });
  }, []);

  const handleBoxClick = (index) => {
    setActiveBox(index === activeBox ? null : index);
  };

  return (
    <div className="home-container">
      {/* Intro Section */}
      <div className="intro">
        <h1 className="animate-fade">Welcome to Our Website</h1>
        <p className="animate-fade">Your one-stop solution for job finding and more!</p>
        {/* Optional CTA buttons */}
        {/* <div className="cta-buttons">
          <Link to="/login" className="cta-btn animate-fade">Login</Link>
          <Link to="/signup" className="cta-btn animate-fade">Sign Up</Link>
        </div> */}
      </div>

      {/* Features Section */}
      <section className="features animate-fade slide-in">
        <div className="section-icon">🚀</div>
        <h2 className="section-heading">Explore Our Features</h2>
        <div className="features-grid">
          {[
            {
              icon: "💼",
              title: "Find Jobs",
              desc: "Browse job listings based on your skills and interests.",
              link: "/jobs"
            },
            {
              icon: "📄",
              title: "Track Resume",
              desc: "Keep track of your resume updates and submissions.",
              link: "/resutrack"
            },
            {
              icon: "🎯",
              title: "Get Career Advice",
              desc: "Receive tips and guidance on how to advance your career.",
              link: "/about"
            }
          ].map((feature, index) => (
            <Link
              to={feature.link}
              key={index}
              className={`feature-item ${activeBox === index ? "active" : ""}`} // ✅ fixed className formatting
              onClick={() => handleBoxClick(index)}
            >
              <div className="feature-icon">
                <span role="img" aria-label={feature.title} className="icon-large">
                  {feature.icon}
                </span>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials animate-fade slide-in">
        <div className="section-icon">💬</div>
        <h2 className="section-heading">What Our Users Say</h2>
        <div className="testimonial-item">
          <p>"This platform helped me land my dream job!"</p>
          <span>– Alex J.</span>
        </div>
        <div className="testimonial-item">
          <p>"I love how easy it is to use and how quickly I got results."</p>
          <span>– Maria R.</span>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter animate-fade slide-in">
        <div className="section-icon">📬</div>
        <h2 className="section-heading">Stay Updated</h2>
        <p>Subscribe to our newsletter to get the latest job tips and updates.</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </section>
    </div>
  );
};

export default Home;
