import React, { useState } from "react";
import "./index.css";
import "./ImageAnalyzer.css"
const ImageAnalyzer = () => {
  const [image, setImage] = useState(null);
  const [prompt, setPrompt] = useState("");
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

1. Analyze my resume and identify key strengths and any skill gaps.
2. Suggest a list of companies I can realistically apply to (excluding startups), with roles that best match my skills and experience.
3. Provide a personalized roadmap for getting selected at ${company}, including what to learn, prepare, and improve over the next 3–6 months.

Please structure your response using the following three sections:
- 🏢 Target Companies & Roles
- 🛣️ Personalized Roadmap (3–6 Months Plan)
- 🔍 Areas for Improvement`);

    try {
      const res = await fetch("http://localhost:2051/image-analyze", {
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
    const analysisStart = text.indexOf("**Target Companies & Roles");
    const roadmapStart = text.indexOf("**Personalized Roadmap");
    const improvementStart = text.indexOf("**Areas for Improvement");

    const analysis = text.slice(0, analysisStart).trim();
    const companies = text.slice(analysisStart, roadmapStart).trim();
    const roadmap = text.slice(roadmapStart, improvementStart).trim();
    const improvements = text.slice(improvementStart).trim();

    return { analysis, roadmap, companies, improvements };
  };

  const { analysis, roadmap, companies } = splitSections(response);
  return (

    <div className="container">

      <h2 className="title">ResuTrack Analyzer</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="file-input"
      />
      upload your resume in image format

      {/* <textarea
        placeholder="Enter a prompt..."
        rows="4"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="prompt-input" */}

      <label htmlFor="dreamCompany" style={{ fontWeight: "bold", fontSize: "16px" }}>
        🎯 Enter Your Dream Company:
      </label>
      <br />

      <input type="text" onChange={(e) => {
        setCompany(e.target.value)
      }}></input><br />
      <button onClick={handleAnalyze} className="analyze-button">
        Assess Now
      </button>

      {preview && <img src={preview} alt="Preview" className="preview" />}

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Analyzing image, please wait...</p>
        </div>
      ) : (
        <>
          <div className="venkat">
            <section>
              <h2>📊 Analysis Based on Resume</h2>
              <pre>{analysis}</pre>
            </section>

            <section>
              <h2>🏁 Personalized Roadmap to Get Into Amazon</h2>
              <pre>{roadmap}</pre>
            </section>

            <section>
              <h2>🏢 Eligible Companies and Roles</h2>
              <pre>{companies}</pre>
            </section>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageAnalyzer;
