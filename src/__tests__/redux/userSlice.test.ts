import { configureStore } from '@reduxjs/toolkit';
import userSlice, { updateUser } from '@/redux/slices/userSlice';

// Mock de la API
jest.mock('@/api/user', () => ({
  updateUserAPI: jest.fn(),
}));

import { updateUserAPI } from '@/api/user';

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      user: userSlice,
    },
    preloadedState: {
      user: {
        updateLoading: false,
        updateError: null,
        ...initialState,
      },
    },
  });
};

describe('userSlice', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
    jest.clearAllMocks();
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = store.getState().user;
      expect(state).toEqual({
        updateLoading: false,
        updateError: null,
      });
    });
  });

  describe('updateUser async thunk', () => {
    it('should handle updateUser.pending', () => {
      store.dispatch(updateUser.pending('', {} as any));
      
      const state = store.getState().user;
      expect(state.updateLoading).toBe(true);
      expect(state.updateError).toBe(null);
    });

    it('should handle updateUser.fulfilled', async () => {
      const mockUserData = {
        nombreCompleto: 'John Doe Updated',
        email: 'john.updated@example.com',
      };

      (updateUserAPI as jest.Mock).mockResolvedValue(mockUserData);

      const resultAction = await store.dispatch(updateUser(mockUserData));
      
      expect(resultAction.type).toBe('user/updateUser/fulfilled');
      
      const state = store.getState().user;
      expect(state.updateLoading).toBe(false);
      expect(state.updateError).toBe(null);
    });

    it('should handle updateUser.rejected', async () => {
      const errorMessage = 'Failed to update user';
      (updateUserAPI as jest.Mock).mockRejectedValue({
        response: {
          data: {
            message: errorMessage,
          },
        },
      });

      const resultAction = await store.dispatch(updateUser({}));
      
      expect(resultAction.type).toBe('user/updateUser/rejected');
      expect(resultAction.payload).toBe(errorMessage);
      
      const state = store.getState().user;
      expect(state.updateLoading).toBe(false);
      expect(state.updateError).toBe(errorMessage);
    });

    it('should handle updateUser.rejected with default error message', async () => {
      (updateUserAPI as jest.Mock).mockRejectedValue(new Error('Network error'));

      const resultAction = await store.dispatch(updateUser({}));
      
      expect(resultAction.type).toBe('user/updateUser/rejected');
      expect(resultAction.payload).toBe('No se pudo actualizar el perfil');
      
      const state = store.getState().user;
      expect(state.updateLoading).toBe(false);
      expect(state.updateError).toBe('No se pudo actualizar el perfil');
    });
  });

  describe('selectors', () => {
    it('should select user update status', () => {
      const mockState = {
        user: {
          updateLoading: true,
          updateError: 'Test error',
        },
      };

      const { selectUserUpdateStatus } = require('@/redux/slices/userSlice');
      const result = selectUserUpdateStatus(mockState);
      
      expect(result).toEqual(mockState.user);
    });
  });
});
