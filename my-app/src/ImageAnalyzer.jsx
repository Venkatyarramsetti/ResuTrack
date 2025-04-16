import React, { useState } from "react";
import "./index.css";
import "./ImageAnalyzer.css";
import { marked } from "marked";

const ImageAnalyzer = () => {
  const [image, setImage] = useState(null);
  const [company, setCompany] = useState("");
  const [response, setResponse] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!image) {
      alert("Please select an image.");
      return;
    }

    setLoading(true);
    setPreview(URL.createObjectURL(image));
    setResponse("Analyzing image...");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("prompt", `Here is my resume. Based on this, please do the following:

1. 🧠 Analyze My Resume
   - Identify my core strengths, key skills, experience, and any noticeable gaps.
   - Highlight significant accomplishments and areas where I can improve.

2. 🏢 Suggest Companies & Roles
   - Recommend well-established companies (excluding startups) that align with my profile.
   - For each company, suggest roles that fit my background and where I could add the most value.

3. 🛣️ Create a Personalized Roadmap to get hired at: "${company}"
   - Key skills to strengthen
   - Recommended courses or certifications
   - Networking advice (e.g., groups to join)
   - Preparation tips for interviews at this company

Please structure your response **exactly** using these 4 sections:

### 📊 Resume Analysis  
### 🏢 Target Companies & Roles  
### 🛣️ Personalized Roadmap (3–6 Months Plan)  
### 🔍 Areas for Improvement`);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/image-analyze`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResponse(marked.parse(data.analysis));
    } catch (err) {
      console.error("Error:", err);
      setResponse("Error uploading or analyzing image.");
    } finally {
      setLoading(false);
    }
  };

  const splitSections = (text) => {
    const analysisStart = text.indexOf("📊 Resume Analysis");
    const companiesStart = text.indexOf("🏢 Target Companies & Roles");
    const roadmapStart = text.indexOf("🛣️ Personalized Roadmap (3–6 Months Plan)");
    const improvementStart = text.indexOf("🔍 Areas for Improvement");

    if (
      analysisStart !== -1 &&
      companiesStart !== -1 &&
      roadmapStart !== -1 &&
      improvementStart !== -1
    ) {
      const analysis = text.slice(analysisStart + 21, companiesStart).trim();
      const companies = text.slice(companiesStart + 28, roadmapStart).trim();
      const roadmap = text.slice(roadmapStart + 43, improvementStart).trim();
      const improvements = text.slice(improvementStart + 27).trim();
      return { analysis, roadmap, companies, improvements };
    }

    return {
      analysis: text,
      roadmap: "",
      companies: "",
      improvements: "",
    };
  };

  const cleanMarkdown = (text) => {
    return text
      .replace(/[*_~`>#-]/g, "")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .replace(/\n{2,}/g, "\n")
      .trim();
  };

  const { analysis, roadmap, companies, improvements } = splitSections(response);

  return (
    <div className="container">
      <h2 className="title">ResuTrack - Resume Analyzer</h2>
      <p className="subtitle">
        Upload your resume image, and let us help you find the perfect job!
      </p>
      <div className="form-container">
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
          className="file-input"
        />
        <input
          type="text"
          placeholder="Target Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="company-input"
        />
        <button
          onClick={handleAnalyze}
          className="analyze-button"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {response && (
        <div className="analysis-result">
          <div className="section">
            <h3>📊 Resume Analysis</h3>
            <p>{cleanMarkdown(analysis)}</p>
          </div>
          <div className="section">
            <h3>🏢 Target Companies & Roles</h3>
            <p>{cleanMarkdown(companies)}</p>
          </div>
          <div className="section">
            <h3>🛣️ Personalized Roadmap</h3>
            <p>{cleanMarkdown(roadmap)}</p>
          </div>
          <div className="section">
            <h3>🔍 Areas for Improvement</h3>
            <p>{cleanMarkdown(improvements)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageAnalyzer;
