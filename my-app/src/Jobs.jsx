import React, { useState } from "react";
import "./Jobs.css";

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
];

const Jobs = () => {
  const [expanded, setExpanded] = useState({});

  const toggle = (company, job) => {
    const key = `${company}-${job}`;
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  return (
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
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Jobs;