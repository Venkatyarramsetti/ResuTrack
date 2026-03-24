import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: "resutrack_uploads",
		allowed_formats: ["jpg", "jpeg", "png", "pdf"],
		resource_type: "auto",
	},
});

export const upload = multer({ storage });
