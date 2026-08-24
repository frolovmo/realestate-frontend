type ParamType = string | number | null | undefined;

const createQueryParams = (params: Record<string, ParamType | ParamType[]>) => {
  const query = new URLSearchParams();

  const paramsEntities = Object.entries(params);

  paramsEntities.forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        query.append(`${key}[]`, item ? String(item) : "");
      });
    } else {
      query.append(key, value ? String(value) : "");
    }
  });

  return query.toString();
};

export default createQueryParams;
