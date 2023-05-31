import mongoose from "mongoose";
import { Movie as MovieClass } from "@api/moviedb";
const Schema = mongoose.Schema;

const movieSchema = new Schema<MovieClass>(
  {
    id: Number,
    title: String,
    original_title: String,
    overview: String,
    backdrop_path: String,
    poster_path: String,
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
