import axios from "axios";
import { detailReducer, genreReducer, searchReducer } from "../Reducer/Reducer";
import { popularReducer, recomendationReducer, trendingReducer } from "../Reducer/Reducer";

export const getAllDetails = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`);

    dispatch(detailReducer(data));
  } catch (error) {
    throw error;
  }
};

export const getAllGenres = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`);

    dispatch(genreReducer(data));
  } catch (error) {
    throw error;
  }
};

export const getAllPopular = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`);

    dispatch(popularReducer(data));
  } catch (error) {
    throw error;
  }
};

export const getAllRecomendations = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`);

    dispatch(recomendationReducer(data));
  } catch (error) {
    throw error;
  }
};

export const getAllTrending = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`);

    dispatch(trendingReducer(data));
  } catch (error) {
    throw error;
  }
};

export const getSearchMovies = (query) => async (dispatch) => {
  try {
    const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=${query}`);

    dispatch(searchReducer(data));
  } catch (error) {
    throw error;
  }
};