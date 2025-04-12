import React from "react";
import "./AboutUs.css";

// Information about the team members
const teamMembers = [
  {
    name: "John Doe",
    github: "https://github.com/johndoe",
    email: "johndoe@example.com",
    description: "Lead Developer, passionate about creating seamless user experiences.",
  },
  {
    name: "Jane Smith",
    github: "https://github.com/janesmith",
    email: "janesmith@example.com",
    description: "Frontend Developer, loves working with React and UI design.",
  },
  {
    name: "Michael Brown",
    github: "https://github.com/michaelbrown",
    email: "michaelbrown@example.com",
    description: "Backend Developer, specializing in Node.js and database management.",
  },
  {
    name: "Emily White",
    github: "https://github.com/emilywhite",
    email: "emilywhite@example.com",
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
            <p>Email: <a href={`mailto:${member.email}`}>{member.email}</a></p>
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
