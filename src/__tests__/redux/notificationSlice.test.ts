import { configureStore } from '@reduxjs/toolkit';
import notificationSlice, {
  fetchNotifications,
  markNotificationAsRead,
  deleteNotification,
  clearReadNotifications,
} from '@/redux/slices/notificationSlice';

// Mock de la API
jest.mock('@/api/notifications', () => ({
  fetchNotifications: jest.fn(),
  markNotificationAsRead: jest.fn(),
  deleteNotification: jest.fn(),
  clearReadNotifications: jest.fn(),
}));

import {
  fetchNotifications as fetchNotificationsAPI,
  markNotificationAsRead as markNotificationAsReadAPI,
  deleteNotification as deleteNotificationAPI,
  clearReadNotifications as clearReadNotificationsAPI,
} from '@/api/notifications';

const mockNotifications = [
  {
    _id: '1',
    title: 'Test Notification 1',
    body: 'This is a test notification',
    read: false,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    _id: '2',
    title: 'Test Notification 2',
    body: 'This is another test notification',
    read: true,
    createdAt: '2024-01-02T00:00:00Z',
  },
];

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      notifications: notificationSlice,
    },
    preloadedState: {
      notifications: {
        notifications: [],
        loading: false,
        error: null,
        ...initialState,
      },
    },
  });
};

describe('notificationSlice', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
    jest.clearAllMocks();
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = store.getState().notifications;
      expect(state).toEqual({
        notifications: [],
        loading: false,
        error: null,
      });
    });
  });

  describe('fetchNotifications', () => {
    it('should handle fetchNotifications.pending', () => {
      store.dispatch(fetchNotifications.pending('', undefined));
      
      const state = store.getState().notifications;
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should handle fetchNotifications.fulfilled', async () => {
      (fetchNotificationsAPI as jest.Mock).mockResolvedValue(mockNotifications);

      const resultAction = await store.dispatch(fetchNotifications());
      
      expect(resultAction.type).toBe('notifications/fetchAll/fulfilled');
      expect(resultAction.payload).toEqual(mockNotifications);
      
      const state = store.getState().notifications;
      expect(state.loading).toBe(false);
      expect(state.notifications).toEqual(mockNotifications);
    });

    it('should handle fetchNotifications.rejected', async () => {
      const errorMessage = 'Failed to fetch notifications';
      (fetchNotificationsAPI as jest.Mock).mockRejectedValue({
        response: {
          data: {
            message: errorMessage,
          },
        },
      });

      const resultAction = await store.dispatch(fetchNotifications());
      
      expect(resultAction.type).toBe('notifications/fetchAll/rejected');
      expect(resultAction.payload).toBe(errorMessage);
      
      const state = store.getState().notifications;
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('markNotificationAsRead', () => {
    it('should mark notification as read', async () => {
      // Setup store with notifications
      store = createTestStore({
        notifications: [...mockNotifications],
      });

      (markNotificationAsReadAPI as jest.Mock).mockResolvedValue({});

      const resultAction = await store.dispatch(markNotificationAsRead('1'));
      
      expect(resultAction.type).toBe('notifications/markAsRead/fulfilled');
      expect(resultAction.payload).toBe('1');
      
      const state = store.getState().notifications;
      const notification = state.notifications.find(n => n._id === '1');
      expect(notification?.read).toBe(true);
    });

    it('should handle markNotificationAsRead.rejected', async () => {
      const errorMessage = 'Failed to mark as read';
      (markNotificationAsReadAPI as jest.Mock).mockRejectedValue({
        response: {
          data: {
            message: errorMessage,
          },
        },
      });

      const resultAction = await store.dispatch(markNotificationAsRead('1'));
      
      expect(resultAction.type).toBe('notifications/markAsRead/rejected');
      expect(resultAction.payload).toBe(errorMessage);
    });
  });

  describe('deleteNotification', () => {
    it('should delete notification', async () => {
      // Setup store with notifications
      store = createTestStore({
        notifications: [...mockNotifications],
      });

      (deleteNotificationAPI as jest.Mock).mockResolvedValue({});

      const resultAction = await store.dispatch(deleteNotification('1'));
      
      expect(resultAction.type).toBe('notifications/delete/fulfilled');
      expect(resultAction.payload).toBe('1');
      
      const state = store.getState().notifications;
      expect(state.notifications).toHaveLength(1);
      expect(state.notifications.find(n => n._id === '1')).toBeUndefined();
    });

    it('should handle deleteNotification.rejected', async () => {
      const errorMessage = 'Failed to delete notification';
      (deleteNotificationAPI as jest.Mock).mockRejectedValue({
        response: {
          data: {
            message: errorMessage,
          },
        },
      });

      const resultAction = await store.dispatch(deleteNotification('1'));
      
      expect(resultAction.type).toBe('notifications/delete/rejected');
      expect(resultAction.payload).toBe(errorMessage);
    });
  });

  describe('clearReadNotifications', () => {
    it('should clear read notifications', async () => {
      // Setup store with notifications (one read, one unread)
      store = createTestStore({
        notifications: [...mockNotifications],
      });

      (clearReadNotificationsAPI as jest.Mock).mockResolvedValue({});

      const resultAction = await store.dispatch(clearReadNotifications());
      
      expect(resultAction.type).toBe('notifications/clearRead/fulfilled');
      
      const state = store.getState().notifications;
      expect(state.notifications).toHaveLength(1);
      expect(state.notifications[0]._id).toBe('1'); // Only unread notification remains
    });

    it('should handle clearReadNotifications.rejected', async () => {
      const errorMessage = 'Failed to clear notifications';
      (clearReadNotificationsAPI as jest.Mock).mockRejectedValue({
        response: {
          data: {
            message: errorMessage,
          },
        },
      });

      const resultAction = await store.dispatch(clearReadNotifications());
      
      expect(resultAction.type).toBe('notifications/clearRead/rejected');
      expect(resultAction.payload).toBe(errorMessage);
    });
  });
});
