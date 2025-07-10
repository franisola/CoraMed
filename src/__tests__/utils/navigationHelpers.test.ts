import { navigateToNestedScreen } from '@utils/navigationHelpers';

// Mock de navigation
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  setOptions: jest.fn(),
  dispatch: jest.fn(),
} as any;

describe('navigationHelpers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('navigateToNestedScreen', () => {
    it('should navigate to nested screen with 3 levels (tab -> stack -> screen)', () => {
      const params = { userId: 123 };
      
      navigateToNestedScreen(
        mockNavigation,
        'ProfileTab',
        'ProfileStack',
        'ProfileScreen',
        params
      );

      expect(mockNavigation.navigate).toHaveBeenCalledWith('ProfileTab', {
        screen: 'ProfileStack',
        params: {
          screen: 'ProfileScreen',
          params: params,
        },
      });
    });

    it('should navigate to nested screen with 4 levels (tab -> stack -> nestedStack -> screen)', () => {
      const params = { appointmentId: 456 };
      
      navigateToNestedScreen(
        mockNavigation,
        'HomeTab',
        'AppointmentsStack',
        'BookStack',
        'BookScreen',
        params
      );

      expect(mockNavigation.navigate).toHaveBeenCalledWith('HomeTab', {
        screen: 'AppointmentsStack',
        params: {
          screen: 'BookStack',
          params: {
            screen: 'BookScreen',
            params: params,
          },
        },
      });
    });

    it('should navigate without params', () => {
      navigateToNestedScreen(
        mockNavigation,
        'HomeTab',
        'HomeStack',
        'HomeScreen'
      );

      expect(mockNavigation.navigate).toHaveBeenCalledWith('HomeTab', {
        screen: 'HomeStack',
        params: {
          screen: 'HomeScreen',
          params: undefined,
        },
      });
    });

    it('should handle empty params object', () => {
      navigateToNestedScreen(
        mockNavigation,
        'ProfileTab',
        'ProfileStack',
        'ProfileScreen',
        {}
      );

      expect(mockNavigation.navigate).toHaveBeenCalledWith('ProfileTab', {
        screen: 'ProfileStack',
        params: {
          screen: 'ProfileScreen',
          params: {},
        },
      });
    });
  });
});
