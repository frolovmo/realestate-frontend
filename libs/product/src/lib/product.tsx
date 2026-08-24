import { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';
import Link from 'next/link';

import useProducts from '../hooks/useProducts';

export function ListProducts(): JSX.Element {
  const { products, allProducts, loading } = useProducts();
  const defaultFilters = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  };
  const [globalFilterValue1, setGlobalFilterValue1] = useState('');
  const [filters1, setFilters1] = useState(defaultFilters);
  
  const onGlobalFilterChange1 = (e: any) => {
    const value = e.target.value;
    const _filters1 = { ...filters1 };
    console.log('filters1', _filters1);
    _filters1['global'].value = value;

    setFilters1(_filters1);
    setGlobalFilterValue1(value);
  };

  const initFilters1 = () => {
    setFilters1(defaultFilters);
    setGlobalFilterValue1('');
  };

  useEffect(() => {
    initFilters1();
  }, []);
  
  const renderHeader1 = () => {
    return (
      <div className="flex justify-content-between">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue1}
            onChange={onGlobalFilterChange1}
            placeholder="Search Product"
          />
        </span>
        <Link
          className="p-button"
          style={{ textDecoration: 'none' }}
          href="/uno-admin/product/products/create"
        >
          Create Product
        </Link>
      </div>
    );
  };

  const header1 = renderHeader1();

  return (
    <>
      <div>
        <div className="col-12">
          <h1>All Products</h1>
          <DataTable
            loading={loading}
            filters={filters1}
            size="large"
            header={header1}
            tableStyle={{ width: '100%' }}
            filterDisplay="menu"
            value={products}
            rowsPerPageOptions={[10, 25, 50, 100]}
            paginator
            rows={10}
          >
            <Column field="name" header="Name"></Column>
            <Column field="description" header="Description"></Column>
            <Column
              field="disbursementFrequency"
              header="Disbursement Frequency"
            ></Column>
            <Column
              field="disbursementFrequencyLimit"
              header="Disbursement Frequency Limit"
            ></Column>
            <Column field="ceilingAmount" header="Ceiling Amount"></Column>
            <Column field="currency" header="Currency"></Column>
            <Column field="interestRate" header="Interest Rate"></Column>
            <Column field="grantPercentage" header="Grant Percentage"></Column>
            <Column field="type" header="Type"></Column>
          </DataTable>
        </div>
      </div>
    </>
  );
}

export default ListProducts;
