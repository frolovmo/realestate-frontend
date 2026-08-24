const mockRequest = async <T>(data: T, ms = 1000): Promise<T> => {
  return await new Promise((resolve) => setTimeout(() => resolve(data), ms));
};

export default mockRequest;
