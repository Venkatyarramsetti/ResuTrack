import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Home.css';

const Home = () => {
  const [activeBox, setActiveBox] = useState(null);
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const elements = document.querySelectorAll('.animate-fade');
    elements.forEach((el, i) => {
      el.style.animationDelay = `${i * 0.1}s`;
      el.classList.add('fade-in');
    });
  }, []);

  const handleBoxClick = (index) => {
    setActiveBox(index === activeBox ? null : index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/send-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, query }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("Query sent!");
        setEmail("");
        setQuery("");
      } else {
        setStatus(`Error: ${data.error || "Failed to send query"}`);
      }
    } catch (error) {
      setStatus("Network error: Failed to send query");
    }

    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <div className="home-container">
      {/* Intro Section */}
      <div className="intro">
        <h1 className="animate-fade welcome-heading">Welcome to ResuTrack</h1>
        <p className="animate-fade">Your one-stop solution for job finding and more!</p>
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
              className={`feature-item ${activeBox === index ? "active" : ""}`}
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

      {/* Image + Description Section */}
      <section className="image-description-section animate-fade slide-in">
        <div className="image-description-container">
          <div className="image-container">
            <img
              src="https://th.bing.com/th/id/OIP.mTaPE6ys7sKpY7v7YixKxgHaE7?rs=1&pid=ImgDetMain"
              alt="Our mission"
            />
          </div>
          <div className="description-container">
            <h2>Discover Our Mission</h2>
            <p>
              Our Resume Analyzer helps you land your dream job by matching your resume with top company requirements.
              It provides real-time ATS scoring, identifying strengths and areas for improvement.
              Get smart suggestions to enhance skills, keywords, and formatting.
              Discover job openings that fit your profile perfectly.
              Receive personalized feedback to increase your chances of getting shortlisted.
              Your resume, reimagined — smarter, stronger, and job-ready.
            </p>
          </div>
        </div>
      </section>

      {/* How Resume Analyzer Works Section */}
      <section className="image-description-section reverse-layout">
        <div className="image-description-container">
          <div className="description-container">
            <h2>How Our Resume Analyzer Works</h2>
            <p>
              Upload your resume and let our intelligent engine scan it in real-time. It evaluates
              your skills and compares them with top job descriptions. Our AI highlights missing
              keywords, suggests optimizations, and gives you an ATS-friendly score. Get detailed
              feedback and instantly see jobs that match your improved resume!
            </p>
          </div>
          <div className="image-container">
            <img
              src="https://miro.medium.com/max/6200/1*u5qY6Pg7nbW_8oCZyYVOOA.jpeg"
              alt="Resume Analyzer Process"
            />
          </div>
        </div>
      </section>

      {/* Testimonials and Newsletter Section */}
      <section className="testimonials-newsletter animate-fade slide-in">
        <div className="testimonials">
          <div className="section-icon">💬</div>
          <h2 className="section-heading">What Our Users Say</h2>
          <div className="testimonial-item">
            <p>"This platform helped me land my dream job!"</p>
            <span>– Sanjay Roy.</span>
          </div>
          <div className="testimonial-item">
            <p>"I love how easy it is to use and how quickly I got results."</p>
            <span>– Supriya Rajaneni.</span>
          </div>
          <div className="testimonial-item">
            <p>"The resume tips were spot on and really helped me stand out."</p>
            <span>– Naveen Reddy.</span>
          </div>
        </div>

        <div className="newsletter">
          <div className="section-icon">📬</div>
          <h2 className="section-heading">Stay Updated</h2>
          <p>Subscribe to our newsletter to get the latest job tips and updates.</p>

          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <input
              type="text"
              placeholder="Enter your query"
              aria-label="Query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            />
            <br />
            <button type="submit" aria-label="Submit your queries">
              Submit
            </button>
          </form>

          {status && (
            <div
              className="popup-message"
              style={{
                marginTop: "10px",
                padding: "10px",
                borderRadius: "5px",
                color: "white",
                backgroundColor: status.startsWith("Error") ? "red" : "green",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {status}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
