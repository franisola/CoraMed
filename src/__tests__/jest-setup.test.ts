describe('Jest Setup Verification', () => {
  it('should run basic math operations', () => {
    expect(2 + 2).toBe(4);
    expect(5 * 3).toBe(15);
  });

  it('should handle strings correctly', () => {
    const appName = 'Coramed';
    expect(appName).toMatch(/Coramed/);
    expect(appName.length).toBe(7);
  });

  it('should handle arrays', () => {
    const testArray = [1, 2, 3];
    expect(testArray).toHaveLength(3);
    expect(testArray).toContain(2);
  });

  it('should handle objects', () => {
    const testObject = { name: 'Test', id: 1 };
    expect(testObject).toHaveProperty('name');
    expect(testObject.name).toBe('Test');
  });

  it('should handle promises', async () => {
    const promiseTest = Promise.resolve('success');
    await expect(promiseTest).resolves.toBe('success');
  });
});
