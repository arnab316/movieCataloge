import MovieService from '../services/movieService.js';


import {StatusCodes} from 'http-status-codes'
const handleError = (res, error) => {
    const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR; 
    const errorResponse = {
        success: false,
        message: error.message || 'An unexpected error occurred',
    };
    if (error.details) {
        errorResponse.error = error.details; 
    } else {
        errorResponse.error = {
            name: error.name || 'Error',
            message: error.message || 'An error occurred',
            description: error.description || 'No additional information available',
            statusCode: statusCode,
        };
    }
    return res.status(statusCode).json(errorResponse);
};

 const addMovie = async (req, res) => {
    try {
      const movieData = req.body;
      const movie = await MovieService.addMovie(movieData)
      res.status(201).json({ 
        success: true,
        message: 'Movie added successfully',
         data: movie 
        });
    } catch (error) {
        handleError(res, error);
    }
  };
const searchMoviesByTitle = async (req, res) => {
    try {

        const { title } = req.params;
        if (!title) {
            return res.status(400).json({
              success: false,
              message: 'Title query parameter is required',
            });
          }
      const movies = await MovieService.searchMoviesByTitle(title);
      res.status(200).json({ 
        success: true, 
        message: 'Movies retrieved successfully',
        data: movies
     });
    } catch (error) {
      handleError(res, error);
    }
  };

  const getAllMovies = async (req, res) => {
    try {
      const movies = await MovieService.getAllMovies();
      res.status(200).json({
        success: true,
        message: 'Movies retrieved successfully',
        data: movies,
      });
    } catch (error) {
      handleError(res, error);
    }
  };
  

export default {
    addMovie,
    searchMoviesByTitle,
    getAllMovies
}