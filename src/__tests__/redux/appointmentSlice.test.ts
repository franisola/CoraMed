import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer, { 
  getNextAppointment,
  getAllAppointments,
  clearAppointment,
  type Appointment 
} from '@/redux/slices/appointmentSlice';

// Mock de las APIs
jest.mock('@/api/appointment', () => ({
  getNextAppointment: jest.fn(),
  getAllAppointments: jest.fn(),
}));

describe('appointmentSlice', () => {
  let store: any;

  const mockAppointment: Appointment = {
    _id: '1',
    paciente: 'patient-id-123',
    especialidad: 'Medicina General',
    fecha: '2025-07-15',
    hora: '10:00',
    motivo_consulta: 'Consulta general',
    estado: 'Agendado',
    profesional: {
      nombre: 'Dr. Juan',
      apellido: 'Pérez',
      especialidad: 'Medicina General',
    },
  };

  beforeEach(() => {
    store = configureStore({
      reducer: {
        appointment: appointmentReducer,
      },
    });
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = store.getState().appointment;
      expect(state).toEqual({
        appointment: null,
        pastAppointments: [],
        upcomingAppointments: [],
        loading: false,
        error: null,
      });
    });
  });

  describe('getNextAppointment async thunk', () => {
    it('should handle getNextAppointment.pending', () => {
      const action = { type: getNextAppointment.pending.type };
      const state = appointmentReducer(undefined, action);
      
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should handle getNextAppointment.fulfilled', () => {
      const action = { 
        type: getNextAppointment.fulfilled.type, 
        payload: mockAppointment 
      };
      const state = appointmentReducer(undefined, action);
      
      expect(state.loading).toBe(false);
      expect(state.appointment).toEqual(mockAppointment);
      expect(state.error).toBe(null);
    });

    it('should handle getNextAppointment.rejected', () => {
      const mockError = 'No appointments found';
      const action = { 
        type: getNextAppointment.rejected.type, 
        payload: mockError 
      };
      const state = appointmentReducer(undefined, action);
      
      expect(state.loading).toBe(false);
      expect(state.error).toBe(mockError);
      expect(state.appointment).toBe(null);
    });
  });

  describe('getAllAppointments async thunk', () => {
    it('should handle getAllAppointments.pending', () => {
      const action = { type: getAllAppointments.pending.type };
      const state = appointmentReducer(undefined, action);
      
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should handle getAllAppointments.fulfilled', () => {
      const mockAppointments = [
        { ...mockAppointment, _id: '2', estado: 'Completado' as const },
        { ...mockAppointment, _id: '3', estado: 'Cancelado' as const },
      ];
      
      const action = { 
        type: getAllAppointments.fulfilled.type, 
        payload: { anteriores: mockAppointments, proximos: [] }
      };
      const state = appointmentReducer(undefined, action);
      
      expect(state.loading).toBe(false);
      expect(state.pastAppointments).toEqual(mockAppointments);
      expect(state.upcomingAppointments).toEqual([]);
      expect(state.error).toBe(null);
    });

    it('should handle getAllAppointments.rejected', () => {
      const mockError = 'Failed to fetch appointments';
      const action = { 
        type: getAllAppointments.rejected.type, 
        payload: mockError 
      };
      const state = appointmentReducer(undefined, action);
      
      expect(state.loading).toBe(false);
      expect(state.error).toBe(mockError);
    });
  });

  describe('clearAppointment action', () => {
    it('should clear the current appointment', () => {
      // Primero establecer una cita
      const initialAction = { 
        type: getNextAppointment.fulfilled.type, 
        payload: mockAppointment 
      };
      let state = appointmentReducer(undefined, initialAction);
      expect(state.appointment).toEqual(mockAppointment);
      
      // Luego limpiar la cita
      const clearAction = clearAppointment();
      state = appointmentReducer(state, clearAction);
      
      expect(state.appointment).toBe(null);
    });
  });
});
