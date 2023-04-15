import axios from "../index";
import { TMovie } from "../../features/main/movies/Movies.types";

export const moviesApi = {
  getMovies: () => axios.get<TMovie[]>("movies"),
};
