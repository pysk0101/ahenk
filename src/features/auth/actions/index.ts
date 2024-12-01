import { ApiResponseHandler } from '@/src/lib/api-response-handler';
import { axiosInstance } from '@/src/utils';
import * as yup from 'yup';
import { loginSchema, registerSchema } from '../../users/validation';
import { ToastNotificationService } from '@/src/lib/services/notification-service';
import { CacheService } from '@/src/lib/services/cache-service';
import { AxiosResponse } from 'axios';

const userHandler = new ApiResponseHandler('Kullanıcı', {
  notificationService: new ToastNotificationService(),
  cacheService: new CacheService(),
  cacheConfig: {
    paths: ['/api/users'],
  },
  notificationConfig: {
    toastOptions: {
      duration: 4000,
    },
  },
});

export const login = async (
  values: yup.InferType<typeof loginSchema>
): Promise<boolean> => {
  try {
    const res: AxiosResponse = await axiosInstance.post('/login', values);
    return userHandler.handleResponse(res, 'giriş');
  } catch (error: any) {
    return userHandler.handleResponse(error, 'giriş');
  }
};

export const signup = async (
  values: yup.InferType<typeof registerSchema>
): Promise<boolean> => {
  try {
    const res: AxiosResponse = await axiosInstance.post('/signup', values);
    return userHandler.handleResponse(res, 'kayıt');
  } catch (error: any) {
    return userHandler.handleResponse(error, 'kayıt');
  }
};

export const logout = async (): Promise<boolean> => {
  try {
    const res: AxiosResponse = await axiosInstance.post('/logout');
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    return false;
  }
};