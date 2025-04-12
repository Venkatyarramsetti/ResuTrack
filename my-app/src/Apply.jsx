import React, { useState } from "react";
import "./Apply.css";
import { useNavigate } from "react-router-dom";
const Apply = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileSelected, setFileSelected] = useState(false);

  const handleUploadChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileSelected(true);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 100);
    }
  };

  const isUploadComplete = uploadProgress >= 100;

  return (
    <div className="apply-container">
      <div className="apply-box">
        <h2 className="title">Upload Your Resume</h2>
        <input
          type="file"
          onChange={handleUploadChange}
          className="file-input"
        />
        {fileSelected && (
          <div className="upload-bar-container">
            <div
              className="upload-bar"
              style={{ width: `${uploadProgress}%` }}
            ></div>
            <span className="upload-percentage">{uploadProgress}%</span>
          </div>
        )}
        <ul>
          <li>ATS score report using your resume.</li>
          <li>Matching against job requirements.</li>
          <li>Job selection:Whether you fit for this role?</li>
          
        </ul>
        <button
          className="submit-btn"
          disabled={!isUploadComplete}
          onClick={() => alert("You applied successfully")}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Apply;
