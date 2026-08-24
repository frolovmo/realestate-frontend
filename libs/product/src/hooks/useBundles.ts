import { useEffect, useState } from 'react';
import useCache from './useCache';
import { api } from '../utils';
import { Bundle } from '../types';

const useBundles = () => {
  const { getCache, setCache } = useCache();
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (getCache('bundles')) {
      setBundles(JSON.parse(getCache('bundles')));
    } else {
      getBundles();
    }
  }, []);

  const getBundles = () => {
    setLoading(true);
    api
      .post('/products/bundles/all', { limit: 100, orderType: 'desc' })
      .then((res) => {
        setBundles(res.data?.data?.rows);
        // setTotalRecords(res.data?.pageMeta?.totalPages);
        setCache('bundles', JSON.stringify(res.data?.data?.rows));
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  return {
    loading,
    bundles,
    getBundles,
    error,
  };
};

export default useBundles;
