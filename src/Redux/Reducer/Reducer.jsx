import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  details: [],
  genres: [],
  populars: [],
  recomendations: [],
  trendings: [],
  searchs: [],
  token: localStorage.getItem("token"),
};

const movieSlicer = createSlice({
  name: "movie",
  initialState,
  reducers: {
    detailReducer: (state, action) => {
      state.details = action.payload;
    },
    genreReducer: (state, action) => {
      state.genres = action.payload;
    },
    popularReducer: (state, action) => {
      state.populars = action.payload;
    },
    recomendationReducer: (state, action) => {
      state.recomendations = action.payload;
    },
    trendingReducer: (state, action) => {
      state.trendings = action.payload;
    },
    searchReducer: (state, action) => {
      state.searchs = action.payload;
    },
  },
});

export const { detailReducer, genreReducer, popularReducer, recomendationReducer, trendingReducer, searchReducer } = movieSlicer.actions;

export default movieSlicer.reducer;