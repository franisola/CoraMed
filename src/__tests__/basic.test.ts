describe('Coramed App Tests', () => {
  it('should run basic test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should test basic string operations', () => {
    const appName = 'Coramed';
    expect(appName).toBe('Coramed');
    expect(appName.toLowerCase()).toBe('coramed');
  });
});
