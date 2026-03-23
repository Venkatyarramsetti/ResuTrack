import React from "react";
import "./BackgroundVideo.css";

const BackgroundVideo = () => {
  return (
    <video className="video-bg" autoPlay muted loop playsInline>
      <source src="fff.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default BackgroundVideo;
