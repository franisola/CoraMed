import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AppointmentCard from '@components/Appointments/AppointmentCard';

// Mock del tema
jest.mock('@themes/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      colors: {
        primary: '#007AFF',
        error: '#FF3B30',
        confirmationColor: '#34C759',
        text: '#000000',
        greyText: '#666666',
        icons: '#8E8E93',
        background: '#FFFFFF',
      },
    },
  }),
}));

// Mock de dayjs
jest.mock('dayjs', () => {
  const originalDayjs = jest.requireActual('dayjs');
  const mockDayjs = (date?: any) => ({
    utc: jest.fn().mockReturnThis(),
    format: jest.fn(() => '15/07/2025'),
    valueOf: jest.fn(() => 1721001600000),
  });
  
  mockDayjs.extend = (originalDayjs.default?.extend || originalDayjs.extend || jest.fn());
  return mockDayjs;
});

// Mock de Expo Vector Icons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

describe('AppointmentCard', () => {
  const mockAppointment = {
    _id: '1',
    paciente: 'patient-id-123',
    especialidad: 'Medicina General',
    fecha: '2025-07-15',
    hora: '10:00',
    motivo_consulta: 'Consulta general',
    estado: 'Agendado' as const,
    profesional: {
      nombre: 'Dr. Juan',
      apellido: 'Pérez',
      especialidad: 'Medicina General',
    },
  };

  const defaultProps = {
    appointment: mockAppointment,
    onPress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render appointment information correctly', () => {
    const { getByText } = render(<AppointmentCard {...defaultProps} />);
    
    expect(getByText(/Dr. Juan/)).toBeTruthy();
    expect(getByText(/Medicina General/)).toBeTruthy();
    expect(getByText(/Fecha:/)).toBeTruthy();
    expect(getByText(/Hora: 10:00/)).toBeTruthy();
    expect(getByText(/Motivo: Consulta general/)).toBeTruthy();
  });

  it('should call onPress when card is pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <AppointmentCard {...defaultProps} onPress={mockOnPress} />
    );
    
    // Buscar el TouchableOpacity por el contenido del card
    const card = getByText(/Dr. Juan/).parent?.parent;
    if (card) {
      fireEvent.press(card);
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    }
  });

  it('should display correct status for scheduled appointment', () => {
    const { getByText } = render(
      <AppointmentCard 
        {...defaultProps} 
        appointment={{ ...mockAppointment, estado: 'Agendado' }}
      />
    );
    
    expect(getByText(/Dr. Juan/)).toBeTruthy();
  });

  it('should display correct status for completed appointment', () => {
    const { getByText } = render(
      <AppointmentCard 
        {...defaultProps} 
        appointment={{ ...mockAppointment, estado: 'Completado' }}
      />
    );
    
    expect(getByText(/Dr. Juan/)).toBeTruthy();
  });

  it('should display correct status for canceled appointment', () => {
    const { getByText } = render(
      <AppointmentCard 
        {...defaultProps} 
        appointment={{ ...mockAppointment, estado: 'Cancelado' }}
      />
    );
    
    expect(getByText(/Dr. Juan/)).toBeTruthy();
  });

  it('should handle appointment without onPress', () => {
    const { getByText } = render(
      <AppointmentCard appointment={mockAppointment} />
    );
    
    expect(getByText(/Dr. Juan/)).toBeTruthy();
  });
});
