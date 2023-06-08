//START MOVIES CONFIG
const MOVIE_API_URL: string = "https://api.themoviedb.org/3/";
const MOVIE_API_KEY: string | undefined = process.env.MOVIE_API_KEY;

const SEARCH_BASE_URL: string = `${MOVIE_API_URL}search/movie?query=`;
const POPULAR_BASE_URL: string = `${MOVIE_API_URL}movie/popular`;
const TOP_BASE_URL: string = `${MOVIE_API_URL}movie/top_rated`;
// For login and voting
const REQUEST_TOKEN_URL: string = `${MOVIE_API_URL}authentication/token/new?api_key=${MOVIE_API_KEY}`;
const LOGIN_URL: string = `${MOVIE_API_URL}authentication/token/validate_with_login?api_key=${MOVIE_API_KEY}`;
const SESSION_ID_URL: string = `${MOVIE_API_URL}authentication/session/new?api_key=${MOVIE_API_KEY}`;

const IMAGE_BASE_URL: string = "http://image.tmdb.org/t/p/";
// Sizes: w300, w780, w1280, original
const BACKDROP_SIZE: string = "w1280";
// w92, w154, w185, w342, w500, w780, original
const POSTER_SIZE: string = "w780";

//END MOVIE CONFIG

export {
  MOVIE_API_URL,
  MOVIE_API_KEY,
  SEARCH_BASE_URL,
  POPULAR_BASE_URL,
  REQUEST_TOKEN_URL,
  LOGIN_URL,
  SESSION_ID_URL,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE,
  TOP_BASE_URL,
};
