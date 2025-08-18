import { AppDispatch } from './index';
import { setProfile } from './profileSlice';
import { apiGet } from '../api/client';

export const fetchProfileIfToken = () => async (dispatch: AppDispatch) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    dispatch(setProfile(null));
    return;
  }

  try {
    const res = await apiGet('/profile');
    // normalize: many APIs return { data: { ... } }
    const user = res.data || res;
    dispatch(setProfile(user));
  } catch (err: any) {
    // if unauthorized or other error, clear tokens and profile
    if (err.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
    dispatch(setProfile(null));
  }
};
