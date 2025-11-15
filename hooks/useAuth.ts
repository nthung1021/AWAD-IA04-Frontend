import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { setAccessToken, setRefreshTokenLocal, clearTokens, getRefreshToken } from '@/lib/auth';

export function useRegister() {
  const qc = useQueryClient();
  return useMutation<
    { message: string },
    { field?: string; message: string },
    { name: string; email: string; password: string }
  >({
    mutationFn: async (payload: { name: string; email: string; password: string }) => {
      const res = await api.post('/users/register', payload);
      return res.data; // { message }
    }
    ,
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ['currentUser'] }); // refetch protected user endpoint
    },
  });
}

export function useLogin() {
  const qc = useQueryClient();
  return useMutation<
    { accessToken: string; refreshToken: string; user: any },
    Error,
    { email: string; password: string }
  >({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const res = await api.post('/users/login', credentials);
      return res.data; // { accessToken, refreshToken, user }
    },
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      setRefreshTokenLocal(data.refreshToken);
      qc.invalidateQueries({ queryKey: ['currentUser'] }); // refetch protected user endpoint
    },
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return useMutation<boolean, Error, void>({
    mutationFn: async () => {
      // call protected logout endpoint
      await api.post('/users/logout');
      return true;
    },
    onSuccess: () => {
      clearTokens();
      qc.clear();
      // client side redirect handled by component
    },
    onError: () => {
      // still clear tokens on server failure
      clearTokens();
    },
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const r = await api.get('/users/me');
      return r.data;
    },
    retry: false,
    enabled: !!getRefreshToken(), // only try if we have a refresh token (optional)
  });
}
