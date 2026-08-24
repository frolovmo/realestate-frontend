import { useEffect, useState } from 'react';
import { api } from '../utils';

const useProductMapping = (bundleId?: number) => {
  const [productMapping, setProductMapping] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllProductMapping();
  }, []);

  const getAllProductMapping = () => {
    setLoading(true);
    api
      .post('/products/mapping/all', {
        limit: 100,
        orderType: "DESC"
      })
      .then((res) => {
        setProductMapping(res.data?.data?.rows);
        setLoading(false);
      })
      .catch((err) => {
        console.error('🚀 ~ api.get ~ err:', err);
        setLoading(false);
      });
  };

  const getProductMapping = (id: number) => {
    setLoading(true);
    api
      .post('/products/mapping/bundles/fetch', {
        bundleId: id || bundleId,
        limit: 100,
      })
      .then((res) => {
        setProductMapping(res.data?.data?.rows);
        setLoading(false);
      })
      .catch((err) => {
        console.error('🚀 ~ api.get ~ err:', err);
        setLoading(false);
      });
  };

  return {
    loading,
    productMapping,
    getProductMapping,
    getAllProductMapping,
  };
};

export default useProductMapping;
