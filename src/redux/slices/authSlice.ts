import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser as loginUserAPI,
  registerUser as registerUserAPI,
  recoverPassword as recoverPasswordAPI,
  resetPassword as resetPasswordAPI,
  getCurrentUser as getCurrentUserAPI,
  logoutUser as logoutUserAPI,
  deleteAccount as deleteAccountAPI,
  verifyCode as verifyCodeAPI,
} from "@api/auth";

import { updateUser } from "./userSlice";

import { setToken, clearToken } from "@api/index";

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
      const token = res.token;
      if (token) {
        await setToken(token);
      }

      const userRes = await getCurrentUserAPI();
      if (userRes.isAuthenticated) {
        return userRes.user;
      } else {
        return null;
      }
    } catch (err: any) {
      const backendError = err.response?.data?.message || "Error del servidor";
      return rejectWithValue({ error: backendError });
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData: any, { rejectWithValue }) => {
    try {
      const res = await registerUserAPI(formData);
      const token = res.token;
      if (token) {
        await setToken(token);
      }
      const userRes = await getCurrentUserAPI();
      if (userRes.isAuthenticated) {
        return userRes.user;
      } else {
        return null;
      }
    } catch (err: any) {
      const backendError = err.response?.data?.message || "Error al registrar";
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
      const backendError =
        err.response?.data?.message || "Error al enviar email";
      return rejectWithValue({ error: backendError });
    }
  }
);

export const verifyCode = createAsyncThunk(
  "auth/verifyCode",
  async (
    { email, code }: { email: string; code: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await verifyCodeAPI(email, code);
      return res;
    } catch (err: any) {
      // Manejo flexible de mensaje de error
      const backendError =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Error al verificar el código";
      return rejectWithValue({ error: backendError });
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await resetPasswordAPI(email, password);
      return res;
    } catch (err: any) {
      const backendError =
        err.response?.data?.message || "Error al cambiar contraseña";
      return rejectWithValue({ error: backendError });
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { dispatch }) => {
    const res = await getCurrentUserAPI();

    if (res.isAuthenticated) {
      return res.user;
    } else {
      // await dispatch(logoutUser());
      return null; // No disparás ningún error acá
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await logoutUserAPI();
  await clearToken();
});

export const deleteAccount = createAsyncThunk(
  "auth/deleteAccount",
  async (_, { rejectWithValue }) => {
    try {
      const res = await deleteAccountAPI();
      await clearToken();
      return res;
    } catch (err: any) {
      const backendError =
        err.response?.data?.message || "No se pudo eliminar la cuenta";
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
        state.user = action.payload; // action.payload ya es el user
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.error || action.error?.message || "Error desconocido";
      })
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // action.payload ya es el user
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

      // VERIFY CODE
      .addCase(verifyCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyCode.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Error desconocido";
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
        state.user = action.payload;
        state.initialLoading = false;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.user = null;
        state.initialLoading = false;
        state.error = action.payload?.error ?? null;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.error = null;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state) => {
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
      })

      //EDIT PROFILE
      .addCase(updateUser.fulfilled, (state, action) => {
        if (state.user && action.payload?.user) {
          state.user = { ...state.user, ...action.payload.user };
        }
      });
  },
});

export default authSlice.reducer;
