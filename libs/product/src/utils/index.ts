import axios from 'axios';
import { createDecipheriv } from 'crypto';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${
      typeof window !== 'undefined' && localStorage.getItem('token')
    }`,
    'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_HOST_ORIGIN,
  },
});

export const setAuthToken = (token: string) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const getAuthToken = () => {
  return api.defaults.headers.common['Authorization'];
};

export const isAuthenticated = () => {
  return getAuthToken() !== null;
};

export const getUser = async () => {
  const response = await api.get('/user');
  return response.data;
};

export const decrypt = (hash: string) => {
  const algorithm = process.env.NEXT_PUBLIC_ENCRYPTION_ALGORITHM as string;
  const encKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY as string;
  const key = Buffer.from(encKey);

  const parts = hash.split(':');

  const iv = Buffer.from(parts[0], 'hex');
  const encryptedText = parts[1];

  const decipher = createDecipheriv(algorithm, key, iv);

  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return JSON.parse(decrypted).encrypt;
};
