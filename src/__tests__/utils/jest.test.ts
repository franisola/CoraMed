import { describe, it, expect } from '@jest/globals';

// Test básico para verificar que Jest funciona
describe('Jest Configuration', () => {
  it('should work correctly', () => {
    expect(true).toBe(true);
  });

  it('should handle async operations', async () => {
    const asyncFunction = async () => {
      return Promise.resolve('success');
    };

    const result = await asyncFunction();
    expect(result).toBe('success');
  });

  it('should mock functions correctly', () => {
    const mockFn = jest.fn();
    mockFn('test');
    
    expect(mockFn).toHaveBeenCalledWith('test');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
