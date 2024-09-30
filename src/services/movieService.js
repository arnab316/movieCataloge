import movieRepository from '../repositories/movieRepository.js';
import redisClient from '../config/redis.js';
import esClient from '../config/elasticsearch.js';

class MovieService {
  
  // Add a new movie and index it in Elasticsearch
  async addMovie(movieData) {
    try {
      if (typeof movieData.genre === 'string') {
        movieData.genre = movieData.genre.split(',').map(item => item.trim().replace(/['"]+/g, ''));
      }
      if (typeof movieData.actors === 'string') {
        movieData.actors = movieData.actors.split(',').map(item => item.trim().replace(/['"]+/g, ''));
      }
  
      //* Create the movie in MongoDB
      const movie = await movieRepository.create(movieData);
     //* Invalidate the cache after adding the movie
      await this.invalidateCache('movies');
      //* Index the movie in Elasticsearch
      await esClient.index({
        index: 'movies',
        id: movie._id.toString(),
        body: {
          title: movie.title,
          description: movie.description,
          genre: movie.genre,
          actors: movie.actors,
          directors: movie.directors,
          releaseYear: movie.releaseYear,
          rating: movie.rating,
          posterUrl: movie.posterUrl,
        },
      });

      return movie;
    } catch (error) {
      throw {error}
    }
  }
//* cache invalidation 
  async invalidateCache(key) {
    try {
      await this.redisClient.del(key); // Remove the cached data for the given key
    } catch (error) {
      throw new Error(`Error invalidating cache: ${error.message}`);
    }
  }
  
//* search movie by title  
  async searchMoviesByTitle(title) {
    try {
      const { hits } = await esClient.search({
        index: 'movies',
      body: {
        query: {
          bool: {
            should: [
              {
                fuzzy: {
                  title: {
                    value: title.toLowerCase(),
                    fuzziness: "AUTO"
                  }
                }
              },
              {
                prefix: {
                  title: title.toLowerCase()
                }
              },
              {
                wildcard: {
                  title: {
                    value: `${title.toLowerCase()}*`,
                    boost: 1.5 
                  }
                }
              }
            ]
          }
        }
      }
    });

      return hits.hits.map(hit => hit._source);
    } catch (error) {
      throw new Error(`Error searching for movies by title: ${error.message}`);
    }
  }







  //* Get a movie by ID, check Redis cache first
  async getMovieById(movieId) {
    try {
      // Check if movie is cached in Redis
      const cachedMovie = await this.getCachedMovie(movieId);
      if (cachedMovie) return cachedMovie;

      // If not in cache, retrieve from MongoDB
      const movie = await movieRepository.findById(movieId);
      if (movie) {
        // Cache the movie data in Redis
        await this.cacheMovie(movieId, movie);
      }
      return movie;
    } catch (error) {
      throw new Error(`Error retrieving movie by ID: ${error.message}`);
    }
  }
//* get all movies in the database
  async getAllMovies() {
    try {
      //? Check if movies are cached in Redis
      const cachedMovies = await this.getCachedMovies('movies');
      if (cachedMovies) return cachedMovies;
  
      //? If not in cache, retrieve from MongoDB
      const movies = await movieRepository.findAll();
  
      //? Cache the movies data in Redis
      await this.cacheMovies('movies', movies);
  
      return movies;
    } catch (error) {
      throw new Error(`Error retrieving all movies: ${error.message}`);
    }
  }



  //* Cache movie in Redis with an expiration time of 1 hour
  async cacheMovies(key, movies) {
    try {
      await redisClient.set(key, JSON.stringify(movies), 'EX', 3600); // Cache for 1 hour
    } catch (error) {
      throw new Error(`Error caching movies in Redis: ${error.message}`);
    }
  }

  //* Get movie from Redis cache
  async getCachedMovies(key) {
    try {
      const data = await redisClient.get(key);
      return data ? JSON.parse(data) : null; // Return parsed data or null
    } catch (error) {
      console.error(`Error fetching from Redis: ${error.message}`);
      throw new Error(`Redis error: ${error.message}`);
    }
  }

  // Update movie and re-index in Elasticsearch
  async updateMovie(movieId, updateData) {
    try {
      // Update the movie in MongoDB
      const updatedMovie = await movieRepository.update(movieId, updateData);

      // Update the movie in Elasticsearch
      if (updatedMovie) {
        await esClient.update({
          index: 'movies',
          id: updatedMovie._id.toString(),
          body: {
            doc: updateData,
          },
        });
      }

      return updatedMovie;
    } catch (error) {
      throw new Error(`Error updating movie: ${error.message}`);
    }
  }

  // Delete movie from MongoDB and Elasticsearch
  async deleteMovie(movieId) {
    try {
      // Delete from MongoDB
      await movieRepository.delete(movieId);
      
      // Remove from Elasticsearch
      await esClient.delete({
        index: 'movies',
        id: movieId,
      });
      
      // Remove from Redis cache
      await redisClient.del(movieId);
    } catch (error) {
      throw new Error(`Error deleting movie: ${error.message}`);
    }
  }
}

export default new MovieService();
