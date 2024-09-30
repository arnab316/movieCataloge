import upload from '../config/multer.js';

const handleFileUpload = (req, res, next) => {
    const movieData = req.body;
  
    if (req.file) {
      movieData.posterUrl = `/uploads/${req.file.filename}`;
    }
  
    req.movieData = movieData; 
    next();
  };
  
  export { upload, handleFileUpload };
  