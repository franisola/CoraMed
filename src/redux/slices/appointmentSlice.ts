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
  pastAppointments: Appointment[];
  upcomingAppointments: Appointment[];
  loading: boolean;
  error: string | null;
}

const initialState: AppointmentState = {
  appointment: null,
  pastAppointments: [],
  upcomingAppointments: [],
  loading: false,
  error: null,
};

export const createAppointment = createAsyncThunk(
  "appointment/create",
  async (
    payload: {
      paciente: string;
      profesional: string;
      especialidad: string;
      fecha: string;
      hora: string;
      motivo_consulta: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await API.post("/appointments", payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Error al crear turno"
      );
    }
  }
);

export const getNextAppointment = createAsyncThunk(
  "appointment/next",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/appointments/next");
      return res.data.appointment;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "No hay turnos próximos"
      );
    }
  }
);

export const getAppointmentById = createAsyncThunk(
  "appointment/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await API.get(`/appointments/${id}`);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Error al obtener el turno"
      );
    }
  }
);

export const getAllAppointments = createAsyncThunk(
  "appointment/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/appointments");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Error al obtener los turnos"
      );
    }
  }
);

export const updateAppointmentStatus = createAsyncThunk(
  "appointment/updateStatus",
  async (
    {
      id,
      estado,
    }: { id: string; estado: "Agendado" | "Cancelado" | "Completado" },
    { rejectWithValue }
  ) => {
    try {
      const res = await API.patch(`/appointments/${id}/status`, { estado });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Error al actualizar el estado del turno"
      );
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
      })

      .addCase(getAppointmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAppointmentById.fulfilled, (state, action) => {
        state.loading = false;
        state.appointment = action.payload;
      })
      .addCase(getAppointmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(getAllAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.pastAppointments = action.payload.anteriores; // Almacena los turnos pasados
        state.upcomingAppointments = action.payload.proximos; // Almacena los turnos futuros
      })
      .addCase(getAllAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateAppointmentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.appointment = action.payload;
      })
      .addCase(updateAppointmentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;
