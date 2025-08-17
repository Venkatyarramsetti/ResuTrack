import React, { useState } from "react";
import "./index.css";
import "./ImageAnalyzer.css";

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
    formData.append(
      "prompt",
      `Here is my resume. Based on this, please do the following:

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
    ### 🔍 Areas for Improvement`
    );

    try {
      const res = await fetch("http://localhost:5000/image-analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResponse(data.analysis || "No response from Gemini.");
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
      const analysis = text
        .slice(analysisStart + "📊 Resume Analysis".length, companiesStart)
        .trim();
      const companies = text
        .slice(companiesStart + "🏢 Target Companies & Roles".length, roadmapStart)
        .trim();
      const roadmap = text
        .slice(roadmapStart + "🛣️ Personalized Roadmap (3–6 Months Plan)".length, improvementStart)
        .trim();
      const improvements = text.slice(improvementStart + "🔍 Areas for Improvement".length).trim();
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
      .replace(/^### (.*$)/gim, "<h4>$1</h4>")
      .replace(/^## (.*$)/gim, "<h3>$1</h3>")
      .replace(/^# (.*$)/gim, "<h2>$1</h2>")
      .replace(/^- (.*$)/gim, "<li>$1</li>")
      .replace(/^\* (.*$)/gim, "<li>$1</li>")
      .replace(/(<li>.*<\/li>)/gims, "<ul>$1</ul>")
      .replace(/^\d+\. (.*$)/gim, "<li>$1</li>")
      .replace(/(<li>.*<\/li>)/gims, "<ol>$1</ol>")
      .replace(/\*\*(.*?)\*\*/gim, "<b>$1</b>")
      .replace(/\*(.*?)\*/gim, "<i>$1</i>")
      .trim();
  };

  const { analysis, roadmap, companies, improvements } = splitSections(response);

  return (
    <div>
      {/* 🔹 Top Input Box */}
      <div className="container">
        <h2 className="title">ResuTrack Analyzer</h2>

        <div className="input-group">
          <label htmlFor="resume-upload" className="input-label">
            Upload your resume:
          </label>
          <input
            id="resume-upload"
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setResponse("");
              setPreview(null);
            }}
            className="file-input"
          />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAnalyze();
          }}
        >
          <div className="input-group">
            <label htmlFor="company-input" className="input-label">
              Dream Company:
            </label>
            <input
              id="company-input"
              type="text"
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g., Google, Microsoft, Apple..."
              className="company-input"
            />
          </div>

          <button type="submit" className="analyze-button">
            Assess Now
          </button>
        </form>

        {preview && <img src={preview} alt="Preview" className="preview" />}

      <div className="response-container">
        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
            <p>Analyzing resume, please wait...</p>
          </div>
        ) : (
          <>
            <section>
              <h3>📊 Analysis Based on Resume</h3>
              <div
                className="response-box"
                dangerouslySetInnerHTML={{ __html: cleanMarkdown(analysis) }}
              />
            </section>

            <section>
              <h3>🏁 Personalized Roadmap to Get Into {company || "Your Dream Company"}</h3>
              <div
                className="response-box"
                dangerouslySetInnerHTML={{ __html: cleanMarkdown(roadmap) }}
              />
            </section>

            <section>
              <h3>🏢 Eligible Companies and Roles</h3>
              <div
                className="response-box"
                dangerouslySetInnerHTML={{ __html: cleanMarkdown(companies) }}
              />
            </section>

            <section>
              <h3>🔍 Areas for Improvement</h3>
              <div
                className="response-box"
                dangerouslySetInnerHTML={{ __html: cleanMarkdown(improvements) }}
              />
            </section>

            <details>
              <summary>Show Raw</summary>
              <pre>{response}</pre>
            </details>
          </>
        )}
      </div>
    </div>
      </div>
      
  );
};

export default ImageAnalyzer;
