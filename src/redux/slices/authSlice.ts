import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser as loginUserAPI,
  registerUser as registerUserAPI,
  recoverPassword as recoverPasswordAPI,
  resetPassword as resetPasswordAPI,
  getCurrentUser as getCurrentUserAPI,
  logoutUser as logoutUserAPI,
  deleteAccount as deleteAccountAPI,
} from "@api/auth";

interface AuthState {
  user: any;
  loading: boolean;
  initialLoading: boolean;
  error: any;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  initialLoading: true, // <--- nuevo flag solo para el arranque
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await loginUserAPI(credentials);
      return await getCurrentUserAPI();
    } catch (err: any) {
      const backendError = err.response?.data?.error || "Error del servidor";
      return rejectWithValue({ error: backendError });
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData: any, { rejectWithValue }) => {
    try {
      const res = await registerUserAPI(formData);
      return await getCurrentUserAPI();
    } catch (err: any) {
      const backendError = err.response?.data?.error || "Error al registrar";
      return rejectWithValue({ error: backendError });
    }
  }
);

export const recoverPassword = createAsyncThunk(
  "auth/recoverPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const res = await recoverPasswordAPI(email);
      return res;
    } catch (err: any) {
      const backendError = err.response?.data?.error || "Error al enviar email";
      return rejectWithValue({ error: backendError });
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    { token, newPassword }: { token: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await resetPasswordAPI(token, newPassword);
      return res;
    } catch (err: any) {
      const backendError =
        err.response?.data?.error || "Error al cambiar contraseña";
      return rejectWithValue({ error: backendError });
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getCurrentUserAPI();
      return res;
    } catch (err: any) {
      return rejectWithValue({ error: "Sesión expirada" });
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await logoutUserAPI();
});

export const deleteAccount = createAsyncThunk(
  "auth/deleteAccount",
  async (_, { rejectWithValue }) => {
    try {
      const res = await deleteAccountAPI();
      return res;
    } catch (err: any) {
      const backendError =
        err.response?.data?.error || "No se pudo eliminar la cuenta";
      return rejectWithValue({ error: backendError });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // RECOVER PASSWORD
      .addCase(recoverPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(recoverPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(recoverPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // RESET PASSWORD
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET CURRENT USER
      .addCase(getCurrentUser.pending, (state) => {
        state.initialLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.initialLoading = false;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.user = null;
        state.initialLoading = false;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })

      // DELETE ACCOUNT
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
