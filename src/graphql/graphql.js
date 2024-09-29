import { ApolloServer } from '@apollo/server';
import MovieService from '../services/movieService.js';
import { expressMiddleware } from "@apollo/server/express4";
import pkg from 'body-parser';
const { json } = pkg;

const typeDefs = `#graphql
  type Movie {
    id: ID!
    title: String!
    description: String!
    genre: [String!]!
    actors: [String!]!
    directors: [String!]!
    releaseYear: Int!
    rating: Float!
    posterUrl: String
  }
  
  type Query {
    getAllMovies: [Movie]
    getMovieById(id: ID!): Movie
  }
  `
const resolvers = {
    Query:{
        getAllMovies: async () => {
            try {
              const movies = await MovieService.getAllMovies();
              return movies;
            } catch (error) {
                throw {error}
            }
        }
        // getMovieById: async (_, { id }) => await MovieService.getMovieById(id),
  
    }
}

export const createGraphQLServer = async(app) => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });
    await server.start();
    app.use(
        '/graphql',
        json(),
        expressMiddleware(server, {
          context: async ({ req }) => ({ token: req.headers.token }),
        })
      );
  };