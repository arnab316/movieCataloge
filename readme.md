
# Movie Catalog Service

## Overview

The Movie Catalog Service is responsible for managing movies in the system. It allows users to add, update, search, and delete movies from the catalog, with integration to Elasticsearch for fast search and Redis for caching. The service supports file uploads (movie posters) using `Multer`, stores movie metadata in MongoDB, and uses Elasticsearch for indexing the movies.

## Features

- **Add a movie**: Add a new movie to the catalog with metadata and a poster image.
- **Update a movie**: Modify existing movie details.
- **Search movies by title**: Perform a fuzzy search of movies using Elasticsearch.
- **Retrieve all movies**: Fetch all movies from the catalog.
- **Cache movies**: Leverage Redis caching to store frequently accessed movies.
- **Delete movies**: Remove a movie from the catalog, Elasticsearch, and Redis.
- **GraphQL support**: Fetch and interact with movie data using GraphQL.

## Technologies

- **Node.js**: Runtime environment for the backend.
- **Express.js**: Web framework for routing and middleware handling.
- **MongoDB**: Database to store movie metadata.
- **Elasticsearch**: Search engine for fast text search.
- **Redis**: Caching layer to store movies.
- **Multer**: Middleware for handling file uploads.
- **GraphQL**: API query language for fetching movie data.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/arnab22/movie-catalog-service.git
   ```
2. Install dependencies:
   ```bash
   cd movie-catalog-service
   npm install
   ```
3. Create a `.env` file and add the following variables:
   ```bash
   MONGODB_URI=<your-mongodb-uri>
   REDIS_URL=<your-redis-url>
   ELASTICSEARCH_HOST=<your-elasticsearch-host>
   PORT=4000
   ```
4. Run the service:
   ```bash
   npm start
   ```

---

## API Endpoints

### 1. **Add a Movie**
- **Endpoint**: `POST /movies`
- **Description**: Adds a new movie with metadata and poster image.
- **Request Type**: `multipart/form-data`
- **Body**:
  ```bash
  {
    "title": "Inception",
    "description": "A mind-bending thriller",
    "genre": "Sci-fi, Action",
    "actors": "Leonardo DiCaprio, Joseph Gordon-Levitt",
    "directors": "Christopher Nolan",
    "releaseYear": 2010,
    "rating": 8.8,
    "poster": <image file>
  }
  ```
- **Response**:
  ```bash
  {
    "_id": "movieId",
    "title": "Inception",
    "description": "A mind-bending thriller",
    "genre": ["Sci-fi", "Action"],
    "actors": ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
    "directors": "Christopher Nolan",
    "releaseYear": 2010,
    "rating": 8.8,
    "posterUrl": "/uploads/1681234567-inception-poster.jpg"
  }
  ```

### 2. **Get All Movies**
- **Endpoint**: `GET /movies`
- **Description**: Retrieves all movies from the catalog.
- **Response**:
  ```bash
  [
    {
      "_id": "movieId1",
      "title": "Inception",
      "description": "A mind-bending thriller",
      "genre": ["Sci-fi", "Action"],
      "actors": ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
      "directors": "Christopher Nolan",
      "releaseYear": 2010,
      "rating": 8.8,
      "posterUrl": "/uploads/1681234567-inception-poster.jpg"
    },
    {
      "_id": "movieId2",
      "title": "Interstellar",
      "description": "A journey beyond the stars",
      "genre": ["Sci-fi", "Drama"],
      "actors": ["Matthew McConaughey", "Anne Hathaway"],
      "directors": "Christopher Nolan",
      "releaseYear": 2014,
      "rating": 8.6,
      "posterUrl": "/uploads/1681234568-interstellar-poster.jpg"
    }
  ]
  ```

### 3. **Search Movies by Title**
- **Endpoint**: `GET /movies/search?title=Inception`
- **Description**: Searches movies in Elasticsearch by title (fuzzy search).
- **Response**:
  ```bash
  [
    {
      "_id": "movieId1",
      "title": "Inception",
      "description": "A mind-bending thriller",
      "genre": ["Sci-fi", "Action"],
      "actors": ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
      "directors": "Christopher Nolan",
      "releaseYear": 2010,
      "rating": 8.8,
      "posterUrl": "/uploads/1681234567-inception-poster.jpg"
    }
  ]
  ```

### 4. **Get Movie by ID**
- **Endpoint**: `GET /movies/:id`
- **Description**: Retrieves a movie by its ID, checks Redis for cached data.
- **Response**:
  ```bash
  {
    "_id": "movieId",
    "title": "Inception",
    "description": "A mind-bending thriller",
    "genre": ["Sci-fi", "Action"],
    "actors": ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
    "directors": "Christopher Nolan",
    "releaseYear": 2010,
    "rating": 8.8,
    "posterUrl": "/uploads/1681234567-inception-poster.jpg"
  }
  ```

### 5. **Update a Movie**
- **Endpoint**: `PUT /movies/:id`
- **Description**: Updates a movie's metadata.
- **Body**:
  ```bash
  {
    "title": "Inception - Updated",
    "description": "An updated description"
  }
  ```
- **Response**:
  ```bash
  {
    "_id": "movieId",
    "title": "Inception - Updated",
    "description": "An updated description",
    "genre": ["Sci-fi", "Action"],
    "actors": ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
    "directors": "Christopher Nolan",
    "releaseYear": 2010,
    "rating": 8.8,
    "posterUrl": "/uploads/1681234567-inception-poster.jpg"
  }
  ```

### 6. **Delete a Movie**
- **Endpoint**: `DELETE /movies/:id`
- **Description**: Deletes a movie by its ID from MongoDB, Redis, and Elasticsearch.
- **Response**:
  ```bash
  {
    "message": "Movie deleted successfully."
  }
  ```
### 7. **GraphQL Endpoint**
 - **GraphQL Query**: `POST /graphql`
**Example Query:**
```bash {
  getAllMovies {
    id
    title
    description
    genre
    rating
  }
}
```
---

## Project Structure

```bash

.
├── src
│   ├── config
│   │   ├── elasticsearch.js    # Elasticsearch configuration
│   │   ├── multer.js           # Multer file upload configuration
│   │   ├── redis.js            # Redis configuration
│   ├── controllers
│   │   └── movieController.js  # Handles requests and responses
├── middleware
│   │   └── uploadFile.js        # File upload middleware (imports from multer config)
│   ├── graphql
│   │   └── graphql.js          # GraphQL schema and resolvers
│   ├── models
│   │   └── movie.js            # MongoDB movie schema/model
│   ├── repositories
│   │   └── movieRepository.js  # Repository for interacting with the database
│   ├── routes
│   │   └── movieRoutes.js      # API endpoints for movie-related operations
│   ├── services
│   │   └── movieService.js     # Business logic layer
│   ├── uploads                 # Directory for uploaded movie posters
│   └── index.js.js             # Express app configuration
└── README.md                   # Project documentation

---

## Running the Application

1. Start the application:
   ```bash
   npm start
   ```
2. Access the API on:
   - `http://localhost:4000/movies` for REST API requests.
   - `http://localhost:4000/graphql` if you implement a GraphQL interface.

---