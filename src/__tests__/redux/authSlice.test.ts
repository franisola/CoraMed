import { configureStore } from '@reduxjs/toolkit';
import authSlice, { loginUser, logoutUser } from '@slices/authSlice';

// Mock store para testing
const createTestStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
    },
  });
};

describe('authSlice', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
  });

  it('should handle initial state', () => {
    const state = store.getState().auth;
    expect(state.user).toBe(null);
    expect(state.loading).toBe(false);
    expect(state.initialLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle loginUser.pending', () => {
    store.dispatch(loginUser.pending('', { email: 'test@test.com', password: 'password' }));
    
    const state = store.getState().auth;
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle loginUser.fulfilled', () => {
    const userData = { id: '1', name: 'Test User', email: 'test@test.com' };
    
    store.dispatch(loginUser.fulfilled(userData, '', { email: 'test@test.com', password: 'password' }));
    
    const state = store.getState().auth;
    expect(state.loading).toBe(false);
    expect(state.user).toEqual(userData);
  });

  it('should handle loginUser.rejected', () => {
    const errorMessage = 'Invalid credentials';
    
    store.dispatch(loginUser.rejected(null, '', { email: 'test@test.com', password: 'password' }, { error: errorMessage }));
    
    const state = store.getState().auth;
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('should handle logoutUser.fulfilled', () => {
    // First set a user
    const userData = { id: '1', name: 'Test User', email: 'test@test.com' };
    store.dispatch(loginUser.fulfilled(userData, '', { email: 'test@test.com', password: 'password' }));
    
    // Then logout
    store.dispatch(logoutUser.fulfilled(undefined, '', undefined));
    
    const state = store.getState().auth;
    expect(state.user).toBe(null);
    expect(state.error).toBe(null);
    expect(state.loading).toBe(false);
  });
});
