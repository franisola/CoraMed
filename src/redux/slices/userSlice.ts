import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateUserAPI, UpdateUserPayload } from "@api/user";

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data: UpdateUserPayload, { rejectWithValue }) => {
    try {
      const res = await updateUserAPI(data); // devuelve el usuario actualizado
      return res;
    } catch (err: any) {
      const error =
        err.response?.data?.message || "No se pudo actualizar el perfil";
      return rejectWithValue(error);
    }
  }
);

interface UserState {
  updateLoading: boolean;
  updateError: string | null;
}

const initialState: UserState = {
  updateLoading: false,
  updateError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.updateLoading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload as string;
      });
  },
});

export const selectUserUpdateStatus = (state: any) => state.user;

export default userSlice.reducer;
