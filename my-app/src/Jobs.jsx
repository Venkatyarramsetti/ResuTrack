import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Jobs.css";
import Apply from './Aply';

const companies = [ 
    {
        name: "Google",
        logo: "https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000",
        location: "Bangalore Campus",
        jobs: [
          {
            title: "Frontend Engineer",
            requirements: [
              { skill: "React.js", description: "Building dynamic UI with reusable components" },
              { skill: "JavaScript", description: "Strong ES6+ knowledge" },
              { skill: "HTML/CSS", description: "Semantic markup and modern layouts" },
              { skill: "Communication", description: "Clear communication in teams" },
              { skill: "Bachelor’s Degree", description: "In CS or related field" },
            ],
          },
          {
            title: "UX Designer",
            requirements: [
              { skill: "Figma", description: "Proficient with design tools" },
              { skill: "User Research", description: "Conduct interviews & testing" },
              { skill: "Accessibility", description: "Designing for all users" },
            ],
          },
        ],
      },
      {
        name: "Amazon",
        logo: "https://img.icons8.com/?size=100&id=21295&format=png&color=000000",
        location: "Hyderabad Campus",
        jobs: [
          {
            title: "Backend Developer",
            requirements: [
              { skill: "Node.js", description: "Efficient APIs and server-side logic" },
              { skill: "Databases", description: "MongoDB/PostgreSQL experience" },
              { skill: "Cloud", description: "AWS services: EC2, Lambda" },
            ],
          },
          {
            title: "Data Analyst",
            requirements: [
              { skill: "SQL", description: "Query large datasets efficiently" },
              { skill: "Python", description: "Data wrangling and analysis" },
              { skill: "Communication", description: "Presenting data to stakeholders" },
            ],
          },
        ],
      },
      {
        name: "Microsoft",
        logo: "https://img.icons8.com/?size=100&id=22989&format=png&color=000000",
        location: "Noida Campus",
        jobs: [
          {
            title: "DevOps Engineer",
            requirements: [
              { skill: "CI/CD", description: "Automated pipelines with Azure DevOps" },
              { skill: "Docker/Kubernetes", description: "Containerized deployments" },
            ],
          },
          {
            title: "Cloud Consultant",
            requirements: [
              { skill: "Azure", description: "Hands-on with Azure services" },
              { skill: "Client Management", description: "Handling enterprise clients" },
            ],
          },
        ],
      },
      {
        name: "Netflix",
        logo: "https://img.icons8.com/?size=100&id=20519&format=png&color=000000",
        location: "Mumbai Office",
        jobs: [
          {
            title: "Video Engineer",
            requirements: [
              { skill: "Encoding", description: "Optimize video delivery" },
              { skill: "Java", description: "Backend video APIs" },
            ],
          },
          {
            title: "Data Engineer",
            requirements: [
              { skill: "Spark", description: "Big Data processing" },
              { skill: "Python", description: "ETL pipelines" },
            ],
          },
        ],
      },
      {
        name: "Apple",
        logo: "https://img.icons8.com/?size=100&id=30840&format=png&color=000000",
        location: "Hyderabad Development Center",
        jobs: [
          {
            title: "iOS Developer",
            requirements: [
              { skill: "Swift", description: "Build iOS apps with SwiftUI" },
              { skill: "UI/UX", description: "Pixel-perfect interfaces" },
            ],
          },
        ],
      },
      {
        name: "Meta",
        logo: "https://img.icons8.com/?size=100&id=1rWM8zYmJ1ks&format=png&color=000000",
        location: "Gurugram Campus",
        jobs: [
          {
            title: "AR/VR Developer",
            requirements: [
              { skill: "Unity", description: "3D development experience" },
              { skill: "C#", description: "Scripting interactions" },
            ],
          },
          {
            title: "Product Manager",
            requirements: [
              { skill: "Agile", description: "Scrum experience" },
              { skill: "Strategy", description: "Product roadmap planning" },
            ],
          },
        ],
      },
      {
        name: "Tesla",
        logo: "https://img.icons8.com/?size=100&id=OinYGm0fZ470&format=png&color=000000",
        location: "Bangalore R&D",
        jobs: [
          {
            title: "Embedded Engineer",
            requirements: [
              { skill: "C/C++", description: "Firmware development" },
              { skill: "RTOS", description: "Real-time operating systems" },
            ],
          },
        ],
      },
      {
        name: "Adobe",
        logo: "https://img.icons8.com/?size=100&id=gav46YArUSy1&format=png&color=000000",
        location: "Noida Office",
        jobs: [
          {
            title: "Creative Cloud Engineer",
            requirements: [
              { skill: "JavaScript", description: "Frontend for Adobe apps" },
              { skill: "Design Systems", description: "Working with reusable components" },
            ],
          },
        ],
      },
      {
        name: "Intel",
        logo: "https://img.icons8.com/?size=100&id=n6EUDVJy4EhY&format=png&color=000000",
        location: "Bangalore Design Center",
        jobs: [
          {
            title: "Hardware Engineer",
            requirements: [
              { skill: "VHDL", description: "Hardware design language" },
              { skill: "PCB Design", description: "Schematic and layout" },
            ],
          },
        ],
      },
      {
        name: "Spotify",
        logo: "https://img.icons8.com/?size=100&id=63316&format=png&color=000000",
        location: "Mumbai Office",
        jobs: [
          {
            title: "Machine Learning Engineer",
            requirements: [
              { skill: "Python", description: "Data modeling" },
              { skill: "ML Ops", description: "Model deployment" },
            ],
          },
          {
            title: "Audio Engineer",
            requirements: [
              { skill: "DSP", description: "Audio effects and filters" },
              { skill: "Realtime Systems", description: "Low-latency processing" },
            ],
          },
        ],
      },
      {
        name: "SpaceX",
        logo: "/images.png",
        location: "California HQ",
        jobs: [
          {
            title: "Aerospace Engineer",
            requirements: [
              { skill: "Orbital Mechanics", description: "Trajectory planning for spacecraft" },
              { skill: "MATLAB", description: "Simulation and modeling" },
            ],
          },
          {
            title: "Software Engineer",
            requirements: [
              { skill: "C++", description: "Real-time systems development" },
              { skill: "Telemetry", description: "Data acquisition and analysis" },
            ],
          },
        ],
      },
      {
        name: "Flipkart",
        logo: "/flip.png",
        location: "Bangalore HQ",
        jobs: [
          {
            title: "Full Stack Developer",
            requirements: [
              { skill: "React.js", description: "Dynamic frontend development" },
              { skill: "Node.js", description: "Backend APIs and microservices" },
            ],
          },
          {
            title: "Business Analyst",
            requirements: [
              { skill: "Excel", description: "Advanced data modeling" },
              { skill: "Power BI", description: "Dashboard and reporting tools" },
            ],
          },
        ],
      },
      {
        name: "Infosys",
        logo: "/info.png",
        location: "Pune Campus",
        jobs: [
          {
            title: "Systems Engineer",
            requirements: [
              { skill: "Java", description: "Backend enterprise applications" },
              { skill: "Spring Boot", description: "Microservice architecture" },
            ],
          },
          {
            title: "QA Tester",
            requirements: [
              { skill: "Selenium", description: "Automated UI testing" },
              { skill: "TestNG", description: "Framework and test suites" },
            ],
          },
        ],
      },
      {
        name: "Twitter",
        logo: "https://img.icons8.com/?size=100&id=13963&format=png&color=000000",
        location: "San Francisco Office",
        jobs: [
          {
            title: "Site Reliability Engineer",
            requirements: [
              { skill: "Monitoring Tools", description: "Prometheus, Grafana, etc." },
              { skill: "Incident Response", description: "Rapid outage resolution" },
            ],
          },
          {
            title: "Security Engineer",
            requirements: [
              { skill: "Penetration Testing", description: "Identify and fix vulnerabilities" },
              { skill: "Cryptography", description: "Secure communication design" },
            ],
          },
        ],
      },
      {
        name: "Airbnb",
        logo: "https://img.icons8.com/?size=100&id=103424&format=png&color=000000",
        location: "Bangalore Tech Hub",
        jobs: [
          {
            title: "Frontend Developer",
            requirements: [
              { skill: "TypeScript", description: "Typed JavaScript for large-scale apps" },
              { skill: "Design Systems", description: "Reusable UI components" },
            ],
          },
          {
            title: "Data Scientist",
            requirements: [
              { skill: "Pandas", description: "Data manipulation and preprocessing" },
              { skill: "A/B Testing", description: "Data-driven decision making" },
            ],
          },
        ],
      },
 ];

const Jobs = () => {
  const [expanded, setExpanded] = useState({});
  const navigate = useNavigate();

  const toggle = (company, job) => {
    const key = `${company}-${job}`;
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleApply = () => {
    navigate("/apply");
  };

  return (
    <>
      <div className="jobs-heading">
        <h1>Job Vacancies</h1>
        <div className="scrolling-text">
          <marquee behavior="scroll" direction="left" scrollamount="6">
            📣 A job is vacant at your nearest city 🏙️ | Venue: Tech Park Auditorium 🏢 | Timing: 10 AM - 4 PM ⏰ | Post: Software Developer 💻 | Qualification: B.Tech / M.Tech 🎓
          </marquee>
        </div>
      </div>

      <div className="jobs-wrapper">
        {companies.map((company, idx) => (
          <div key={idx} className="company-card">
            <div className="company-header">
              <img src={company.logo} alt={company.name} className="company-logo" />
              <div>
                <h2>{company.name}</h2>
                <p className="location">{company.location}</p>
              </div>
            </div>
            {company.jobs.map((job, i) => {
              const key = `${company.name}-${job.title}`;
              return (
                <div key={i} className="job-role">
                  <h3>{job.title}</h3>
                  <button onClick={() => toggle(company.name, job.title)}>
                    {expanded[key] ? "Hide Requirements" : "Requirements"}
                  </button>
                  {expanded[key] && (
                    <>
                      <ul className="requirements">
                        {job.requirements.map((req, index) => (
                          <li key={index}>
                            <span className="tooltip">
                              {req.skill}
                              <span className="tooltiptext">{req.description}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                      <button className="apply-btn" onClick={handleApply}>
                        Apply Now
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

export default Jobs;