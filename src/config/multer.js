import multer from 'multer';
import path from 'path';

// Set storage engine for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Save files to the 'uploads/' directory
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Define a unique filename (using the original name and current timestamp)
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Check the file type (only allow images for posters)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!'); // Reject other file types
  }
};

// Set up Multer middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: fileFilter,
});

export default upload;
