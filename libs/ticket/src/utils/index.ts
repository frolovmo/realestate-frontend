import axios from 'axios';
import { createDecipheriv } from 'crypto';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${
      typeof window !== 'undefined' && localStorage.getItem('token')
    }`,
    //Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWNhdGlvbk51bWJlciI6IlBDNzgyNzI4MjgyIiwiaWRlbnRpZmljYXRpb25UeXBlIjoiUEFTU1BPUlQiLCJmdWxsbmFtZSI6bnVsbCwicGhvbmUiOiIrMjUwNzg4ODI5OTc4IiwiZW1haWwiOiJ5dmVzLmN5dXp1em9Ad2lyZWRpbi5ydyIsImF1dGVudGljYXRvclFyQ29kZSI6Im90cGF1dGg6Ly90b3RwL0JSRFBDTDp5dmVzLmN5dXp1em8lNDB3aXJlZGluLnJ3P3NlY3JldD1QRUNVRUUyVUZNREJFVUROJnBlcmlvZD0zMCZkaWdpdHM9NiZhbGdvcml0aG09U0hBMSZpc3N1ZXI9QlJEUENMIiwiYWNjb3VudFRva2VuIjoiNmNkNmYzOGEtZjg1OS00ZWU3LWE5YmQtNmVmMmMwZWUzYzhjIiwiaXNBY3RpdmUiOnRydWUsImlzRGVsZXRlZCI6ZmFsc2UsImlkIjo2LCJyb2xlcyI6W3siaWQiOjMsInByb2plY3RJZCI6bnVsbCwibmFtZSI6IlVzZXIifSx7ImlkIjoyLCJwcm9qZWN0SWQiOjIsIm5hbWUiOiJBZG1pbiJ9LHsiaWQiOjcsInByb2plY3RJZCI6MiwibmFtZSI6IkFnZW50In0seyJpZCI6NCwicHJvamVjdElkIjoyLCJuYW1lIjoiUmVwcmVzZW50YXRpdmUifSx7ImlkIjoxLCJwcm9qZWN0SWQiOjIsIm5hbWUiOiJTdXBlci1BZG1pbiJ9XSwiaWF0IjoxNzMzNDA1NjY2LCJleHAiOjE3MzQwMTA0NjZ9.7N7sQ3tmayPcLP7hzVqLXQRygwWKOTIxPRcfFgoa1kU`,
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
