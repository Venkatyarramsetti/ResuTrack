// viewData.js

require('dotenv').config(); // <-- Load variables from .env

const mongoose = require('mongoose');

// Use MONGO_URI from .env
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Define schema (loose format to allow flexibility)
const ResumeSchema = new mongoose.Schema({}, { strict: false });
const Resume = mongoose.model('Resume', ResumeSchema, 'resumes'); // <-- collection name

async function fetchResumes() {
  try {
    const resumes = await Resume.find();
    console.log("📄 Stored Resumes:");
    console.dir(resumes, { depth: null });
  } catch (err) {
    console.error('⚠️ Error fetching resumes:', err);
  } finally {
    mongoose.connection.close();
  }
}

fetchResumes();
