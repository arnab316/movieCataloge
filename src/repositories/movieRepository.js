import { Movie } from '../model/movieModel.js';

class MovieRepository {
  
  // Create a new movie
  async create(movieData) {
    try {
      const movie = new Movie(movieData);
      return await movie.save();
    } catch (error) {
      throw new Error(`Error creating movie: ${error.message}`);
    }
  }

  // Find a movie by its ID
  async findById(movieId) {
    try {
      return await Movie.findById(movieId);
    } catch (error) {
      throw new Error(`Error finding movie by ID: ${error.message}`);
    }
  }

  // Find all movies with optional query, pagination, and sorting
  async findAll(query = {}, options = {}) {
    try {
      const { limit = 10, page = 1, sortBy = 'createdAt', sortOrder = 'desc' } = options;
      const skip = (page - 1) * limit;
      
      return await Movie.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 });
    } catch (error) {
      throw new Error(`Error finding movies: ${error.message}`);
    }
  }

  // Update movie by its ID
  async update(movieId, updateData) {
    try {
      return await Movie.findByIdAndUpdate(movieId, updateData, { new: true });
    } catch (error) {
      throw new Error(`Error updating movie: ${error.message}`);
    }
  }

  // Delete a movie by its ID
  async delete(movieId) {
    try {
      return await Movie.findByIdAndDelete(movieId);
    } catch (error) {
      throw new Error(`Error deleting movie: ${error.message}`);
    }
  }
}

export default new MovieRepository();
