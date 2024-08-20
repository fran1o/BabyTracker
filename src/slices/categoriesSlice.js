import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "https://babytracker.develotion.com";

// Acción para listar categorías
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { getState }) => {
    const state = getState();
    const { apiKey, id } = state.user.userInfo;
    const response = await axios.get(
      `${apiUrl}/categorias.php?idUsuario=${id}`,
      {
        headers: {
          apikey: apiKey,
          iduser: id,
        },
      }
    );
    return response.data;
  }
);

// Estado inicial de categorías
const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Listar categorías
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categorias;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categoriesSlice.reducer;
