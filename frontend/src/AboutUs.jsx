import React from "react";
import "./AboutUs.css";

// Information about the team members
const teamMembers = [
  {
    name: "Vinnakota C H Teja",
    github: "https://github.com/hackerteja",
    email: "vinnakotateja118@gmail.com",
    description: "Lead Developer, passionate about creating seamless user experiences.",
  },
  {
    name: "Vadisala Lohith",
    github: "https://github.com/Lance4711",
    email: "lohit.v4711@gmail.com",
    description: "Frontend Developer, loves working with React and UI design.",
  },
  {
    name: "Satya Sai Venkat Yarramsetti",
    github: "https://github.com/Venkatyarramsetti",
    email: "venkatyarramsetti33@gmail.com",
    description: "Full-stack Developer building smart job platforms with React, Node.js, and AI-enhanced tools.",
  },
  {
    name: "Thippani Rakesh",
    github: "https://github.com/Rakesh2004",
    email: "thippani.rakesh2356@gmail.com",
    description: "Full Stack Developer, enjoys tackling both frontend and backend challenges.",
  },
];

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h3>About Us</h3>
      <div className="about-us-content">
        {teamMembers.map((member, index) => (
          <div className="team-member" key={index}>
            <h4>{member.name}</h4>
            <p>{member.description}</p>
            <a href={member.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <p>Email: <a href={`mailto:${member.email}`} style={{ color: '#00ffe0' }}>{member.email}</a></p>
          </div>
        ))}
      </div>
      <div className="copyright">
        <p>&copy; 2025 ResuTrack. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default AboutUs;
