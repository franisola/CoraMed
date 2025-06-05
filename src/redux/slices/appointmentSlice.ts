import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/api";

export interface Appointment {
  _id: string;
  paciente: string;
  profesional: {
    nombre: string;
    apellido: string;
    especialidad: string;
  };
  fecha: string;
  hora: string;
  motivo_consulta: string;
  estado: string;
}

interface AppointmentState {
  appointment: Appointment | null;
  loading: boolean;
  error: string | null;
}

const initialState: AppointmentState = {
  appointment: null,
  loading: false,
  error: null,
};

// ✅ Thunk para crear turno
export const createAppointment = createAsyncThunk(
  "appointment/create",
  async (payload: {
    paciente: string;
    profesional: string;
    especialidad: string;
    fecha: string;
    hora: string;
    motivo_consulta: string;
  }, { rejectWithValue }) => {
    try {
      const res = await API.post("/appointments", payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Error al crear turno");
    }
  }
);

// ✅ Thunk para traer próximo turno
export const getNextAppointment = createAsyncThunk(
  "appointment/next",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/appointments/next");
      console.log(res.data);
      
      return res.data.appointment;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "No hay turnos próximos");
    }
  }
);

// 🔧 Slice
const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    clearAppointment: (state) => {
      state.appointment = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointment = action.payload;
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(getNextAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNextAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointment = action.payload;
      })
      .addCase(getNextAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;