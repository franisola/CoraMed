import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchSpecialties,
  fetchProfessionalsBySpecialty,
  fetchProfessionalById,
  fetchAvailableSchedules,
} from '@api/professional';

// INTERFAZ: Profesional
export interface Professional {
  _id: string;
  nombre: string;
  apellido: string;
  especialidad: string;
  dias_laborales: string[];
  horarios_laborales: {
    inicio: string;
    fin: string;
  };
}

interface ProfessionalState {
  specialties: string[];
  selectedSpecialty: string; // NUEVO
  professionals: Professional[];
  selectedProfessional: Professional | null;
  schedules: string[];
  loading: boolean;
  error: string | null;
}

const initialState: ProfessionalState = {
  specialties: [],
  selectedSpecialty: '', // NUEVO
  professionals: [],
  selectedProfessional: null,
  schedules: [],
  loading: false,
  error: null,
};

// THUNKS
export const getSpecialties = createAsyncThunk('professionals/getSpecialties', async () => {
  return await fetchSpecialties();
});

export const getProfessionalsBySpecialty = createAsyncThunk(
  'professionals/getBySpecialty',
  async (specialty: string) => {
    return await fetchProfessionalsBySpecialty(specialty);
  }
);

export const getProfessionalById = createAsyncThunk(
  'professionals/getById',
  async (id: string) => {
    return await fetchProfessionalById(id);
  }
);

export const getAvailableSchedules = createAsyncThunk(
  'professionals/getSchedules',
  async ({ id, date }: { id: string; date: string }) => {
    return await fetchAvailableSchedules(id, date);
  }
);

// SLICE
const professionalSlice = createSlice({
  name: 'professionals',
  initialState,
  reducers: {
    clearSelectedProfessional: (state) => {
      state.selectedProfessional = null;
      state.schedules = [];
    },
    setSelectedSpecialty: (state, action) => {
      state.selectedSpecialty = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSpecialties.fulfilled, (state, action) => {
        state.specialties = action.payload;
      })
      .addCase(getProfessionalsBySpecialty.fulfilled, (state, action) => {
        state.professionals = action.payload;
      })
      .addCase(getProfessionalById.fulfilled, (state, action) => {
        state.selectedProfessional = action.payload;
      })
      .addCase(getAvailableSchedules.fulfilled, (state, action) => {
        state.schedules = action.payload;
      })
      .addMatcher(
        (action) => action.type.startsWith('professionals/') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('professionals/') && action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('professionals/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Error desconocido';
        }
      );
  },
});

export const { clearSelectedProfessional, setSelectedSpecialty } = professionalSlice.actions;
export default professionalSlice.reducer;