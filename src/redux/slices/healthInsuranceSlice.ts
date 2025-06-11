import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getHealthInsurance,
  upsertHealthInsurance,
  deleteHealthInsurance,
  HealthInsurancePayload,
  HealthInsuranceResponse,
} from "@/api/healthInsurance";

interface HealthInsuranceState {
  data: HealthInsuranceResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: HealthInsuranceState = {
  data: null,
  loading: false,
  error: null,
};

// 🔄 GET
export const fetchHealthInsurance = createAsyncThunk(
  "healthInsurance/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getHealthInsurance(); // puede ser un objeto o null
      return data ?? null; // explícito: null es un estado válido
    } catch (err: any) {
      // Solo se rechaza si es realmente un error del servidor
      return rejectWithValue(
        err.response?.data?.message || "Error al obtener la obra social"
      );
    }
  }
);

// 💾 UPSERT (crear o actualizar)
export const saveHealthInsurance = createAsyncThunk(
  "healthInsurance/save",
  async (payload: HealthInsurancePayload, { rejectWithValue }) => {
    try {
      const response = await upsertHealthInsurance(payload);
      return response.healthInsurance;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Error al guardar la obra social"
      );
    }
  }
);

// ❌ DELETE
export const removeHealthInsurance = createAsyncThunk(
  "healthInsurance/delete",
  async (_, { rejectWithValue }) => {
    try {
      await deleteHealthInsurance();
      return null; // borramos la data del estado
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Error al eliminar la obra social"
      );
    }
  }
);

// 🧠 Slice
const healthInsuranceSlice = createSlice({
  name: "healthInsurance",
  initialState,
  reducers: {
    clearHealthInsurance: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchHealthInsurance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHealthInsurance.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchHealthInsurance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // SAVE
      .addCase(saveHealthInsurance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveHealthInsurance.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(saveHealthInsurance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // DELETE
      .addCase(removeHealthInsurance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeHealthInsurance.fulfilled, (state) => {
        state.loading = false;
        state.data = null;
      })
      .addCase(removeHealthInsurance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearHealthInsurance } = healthInsuranceSlice.actions;
export default healthInsuranceSlice.reducer;
