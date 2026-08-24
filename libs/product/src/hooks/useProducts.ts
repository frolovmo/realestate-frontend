import { useEffect, useState } from 'react';
import useCache from './useCache';
import { api } from '../utils';
import { Product } from '../types';
import { set } from 'react-hook-form';

const useProducts = () => {
  const { getCache, setCache } = useCache();
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [, setError] = useState();

  useEffect(() => {
    if (getCache('products')) {
      setProducts(JSON.parse(getCache('products')));
    } else {
      getProducts();
    }
  }, []);

  const getProducts = () => {
    setLoading(true);
    api
      .post('/products/all', { limit: 100, orderType: 'desc' })
      .then((res) => {
        setProducts(res.data?.data?.rows);
        setAllProducts(res.data?.data);
        setCache('products', JSON.stringify(res.data?.data?.rows));
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  const createProduct = (product: Product) => {
    setLoading(true);
    api
      .post('/products', product)
      .then(() => {
        setProducts([...products]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  return {
    loading,
    allProducts,
    products,
    getProducts,
    createProduct,
  };
};

export default useProducts;
