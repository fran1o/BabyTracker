import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "https://babytracker.develotion.com";

// Obtener lista de departamentos
export const fetchDepartments = createAsyncThunk(
  "user/fetchDepartments",
  async () => {
    const response = await axios.get(`${apiUrl}/departamentos.php`);
    return response.data.departamentos;
  }
);

// Obtener lista de ciudades según el departamento seleccionado
export const fetchCities = createAsyncThunk(
  "user/fetchCities",
  async (departamentoId) => {
    const response = await axios.get(
      `${apiUrl}/ciudades.php?idDepartamento=${departamentoId}`
    );
    return response.data.ciudades;
  }
);

// Acción para registrar un nuevo usuario
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData) => {
    const response = await axios.post(`${apiUrl}/usuarios.php`, userData);
    return response.data;
  }
);

// Acción para iniciar sesión
export const loginUser = createAsyncThunk("user/login", async (loginData) => {
  const response = await axios.post(`${apiUrl}/login.php`, loginData);
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    loading: false,
    error: null,
    departments: [],
    cities: [],
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.departments = [];
      state.cities = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.departments = action.payload;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.cities = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
