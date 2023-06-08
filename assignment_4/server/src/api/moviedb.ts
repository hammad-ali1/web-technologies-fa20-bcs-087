import axiosCreator from "axios";
import {
  MOVIE_API_URL,
  MOVIE_API_KEY,
  REQUEST_TOKEN_URL,
  LOGIN_URL,
  SESSION_ID_URL,
} from "../config";

const axios = axiosCreator.create({
  baseURL: MOVIE_API_URL,
});
//set axios configuration
axios.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params["api_key"] = MOVIE_API_KEY;
  config.params["language"] = "en-US";
  config.params["include_adult"] = false;

  return config;
});
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("Axios Error: ", error.message);
    throw error;
  }
);

const defaultConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

//Types
export class Movie {
  backdrop_path: string = "";
  id: number = 0;
  imdb_id: string = "";
  adult: boolean = false;
  original_title: string = "";
  overview: string = "";
  genres: Genre[] = [];
  video: boolean = false;
  popularity: number = 0;
  poster_path: string = "";
  title: string = "";
  vote_average: number = 0;
  vote_count: number = 0;
  budget: number = 0;
  runtime: number = 0;
  revenue: number = 0;
  release_date: string = "";
  status: string = "";
  tagline: string = "";
  homepage: string = "";
}
export class Movies {
  page: number = 0;
  results: Movie[] = [];
  total_pages: number = 0;
  total_results: number = 0;
}
export class Genres {
  genres: Genre[] = [];
}
export class Genre {
  id: number = 0;
  name: string = "";
}

export class Cast {
  character: string = "";
  credit_id: number = 0;
  name: string = "";
  profile_path: string = "";
}
export class Crew {
  job: string = "";
  name: string = "";
  credit_id: number = 0;
}
export class Credits {
  id: number = 0;
  cast: Cast[] = [];
  crew: Crew[] = [];
}

export class Video {
  iso_639_1: string = "";
  iso_3166_1: string = "";
  name: string = "";
  key: string = "";
  site: string = "";
  size: number = 0;
  type: string = "";
  official: boolean = false;
  published_at: string = "";
  id: string = "";
}
export class Videos {
  id: number = 0; //movie id
  results: Video[] = [];
}

//TV Shows
export class Shows {
  page: number = 0;
  results: Show[] = [];
  total_pages: number = 0;
  total_results: number = 0;
}
export class Show {
  backdrop_path: string | null = null;
  poster_path: string | null = null;
  id: number = 0;
  vote_average: number = 0;
  overview: string = "";
  name: string = "";
  original_name: string = "";
  original_language: string = "";
  popularity: number = 0;
  vote_count: number = 0;
  first_air_date: string = "";
}

const apiSettings = {
  fetchTopMovies: async (page: number): Promise<Movies> => {
    return await (
      await axios.get(`movie/top_rated?page=${page}`)
    ).data;
  },
  fetchPopularMovies: async (page: number): Promise<Movies> => {
    return await (
      await axios.get(`movie/popular?page=${page}`)
    ).data;
  },
  fetchTrendingMovies: async (
    page: number,
    time_window: "day" | "week"
  ): Promise<Movies> => {
    return await (
      await axios.get(`trending/movie/${time_window}?page=${page}`)
    ).data;
  },
  searchMovies: async (searchTerm: string, page: number): Promise<Movies> => {
    return await (
      await axios.get(`search/movie?query=${searchTerm}&page=${page}`)
    ).data;
  },
  fetchMovie: async (movieId: string): Promise<Movie> => {
    return await (
      await axios.get(`movie/${movieId}`)
    ).data;
  },
  fetchSimilarMovies: async (movieId: number): Promise<Movies> => {
    return await (
      await axios.get(`movie/${movieId}/recommendations`)
    ).data;
  },
  fetchLatestMovie: async (): Promise<Movie> => {
    return await (
      await axios.get("movie/latest")
    ).data;
  },
  fetchVideos: async (movieId: number): Promise<Videos> => {
    return await (
      await axios.get(`movie/${movieId}/videos`)
    ).data;
  },
  fetchCredits: async (movieId: number): Promise<Credits> => {
    return await (
      await axios.get(`movie/${movieId}/credits`)
    ).data;
  },
  fetchGenres: async (): Promise<Genres> => {
    return await (
      await axios.get("genre/movie/list")
    ).data;
  },
  //TV SHOWS
  fetchShow: async (showId: string): Promise<Show> => {
    return await (
      await axios.get(`tv/${showId}`)
    ).data;
  },
  fetchPopularShows: async (page: number): Promise<Shows> => {
    return await (
      await axios.get(`tv/popular?page=${page}`)
    ).data;
  },
  fetchTrendingShows: async (
    page: number,
    time_window: "day" | "week"
  ): Promise<Shows> => {
    return await (
      await axios.get(`trending/tv/${time_window}?page=${page}`)
    ).data;
  },
  fetchTopShows: async (page: number): Promise<Shows> => {
    return await (
      await axios.get(`tv/top_rated?page=${page}`)
    ).data;
  },
  searchShows: async (searchTerm: string, page: number): Promise<Shows> => {
    return await (
      await axios.get(`search/tv?query=${searchTerm}&page=${page}`)
    ).data;
  },
  // Bonus material below for login
  getRequestToken: async () => {
    const reqToken = await (await fetch(REQUEST_TOKEN_URL)).json();
    return reqToken.request_token;
  },
  authenticate: async (
    requestToken: string,
    username: string,
    password: string
  ) => {
    const bodyData = {
      username,
      password,
      request_token: requestToken,
    };
    // First authenticate the requestToken
    const data = await (
      await fetch(LOGIN_URL, {
        ...defaultConfig,
        body: JSON.stringify(bodyData),
      })
    ).json();
    // Then get the sessionId with the requestToken
    if (data.success) {
      const sessionId = await (
        await fetch(SESSION_ID_URL, {
          ...defaultConfig,
          body: JSON.stringify({ request_token: requestToken }),
        })
      ).json();
      return sessionId;
    }
  },
  rateMovie: async (sessionId: string, movieId: number, value: number) => {
    const endpoint = `${MOVIE_API_URL}movie/${movieId}/rating?api_key=${MOVIE_API_KEY}&session_id=${sessionId}`;

    const rating = await (
      await fetch(endpoint, {
        ...defaultConfig,
        body: JSON.stringify({ value }),
      })
    ).json();

    return rating;
  },
};

export default apiSettings;
