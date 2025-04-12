import React from "react";
import "./FAQ.css";
import AboutUs from "./Aboutus"; // Adjust path if needed

const faqs = [
  {
    question: "What is ResuTrack?",
    answer: "ResuTrack analyzes your resume and provides a personalized roadmap for landing your dream job.",
  },
  {
    question: "How do I upload my resume?",
    answer: "You can upload your resume as an image (JPG or PNG) using the upload section on the main page.",
  },
  {
    question: "Is my data safe?",
    answer: "Yes, your data is not stored permanently and is only used for analysis during your session.",
  },
  {
    question: "What kind of resume can I upload?",
    answer: "You can upload a scanned image or a screenshot of your resume in image format.",
  },
  {
    question: "What is the roadmap section?",
    answer: "It provides tailored steps including skills to learn, certifications to take, and networking tips.",
  },
  {
    question: "Can I choose any company for roadmap?",
    answer: "Yes! Enter your dream company, and we’ll generate a personalized plan for it.",
  },
  {
    question: "Does it work for freshers?",
    answer: "Absolutely. ResuTrack works for freshers as well as experienced professionals.",
  },
  {
    question: "What technologies does ResuTrack use?",
    answer: "We use AI (Gemini), React for frontend, and Node.js with Express on the backend.",
  },
  {
    question: "Is it free to use?",
    answer: "Yes, the current version of ResuTrack is completely free to use.",
  },
  {
    question: "Can I edit my resume inside the app?",
    answer: "No, but you can analyze and get suggestions for improvements.",
  },
  {
    question: "Can I share my roadmap?",
    answer: "Yes, you can copy and share the roadmap with mentors or peers.",
  },
  {
    question: "How often should I update my resume?",
    answer: "We recommend updating it every 3–6 months or after any major achievement.",
  },
  {
    question: "Do I get interview tips?",
    answer: "Yes, the roadmap section includes preparation tips for interviews at your selected company.",
  },
  {
    question: "Will there be PDF export option?",
    answer: "It's planned for future updates so you can download your roadmap easily.",
  },
  {
    question: "How can I contact the support team?",
    answer: "Soon we'll add a contact page. For now, you can raise issues via GitHub.",
  },

];

const FAQ = () => {
  return (
    <div className="faq-container">
      <div className="faq-content">
        <div className="faq-right">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div className="faq-item" key={index}>
                <div className="faq-question">{faq.question}</div>
                <div className="faq-answer">{faq.answer}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AboutUs /> {/* This will render the About Us section */}
    </div>
  );
};

export default FAQ;
