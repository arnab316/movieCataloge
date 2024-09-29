import mongoose from 'mongoose';

const movieSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: [String], required: true },
    actors: { type: [String], required: true },
    directors: { type: [String], required: true },
    releaseYear: { type: Number, required: true },
    rating: { type: Number, required: true, min: 0, max: 10 },
    posterUrl: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    duration: { type: Number, required: false }, 
    language: { type: String, required: false },
  });

export const Movie = mongoose.model('Movie', movieSchema);