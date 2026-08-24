import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';

import useBundles from '../hooks/useBundles';

export function ListBundles(): JSX.Element {
  const { bundles, loading } = useBundles();
  const defaultFilters = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  };
  const [globalFilterValue1, setGlobalFilterValue1] = useState('');
  const [filters1, setFilters1] = useState(defaultFilters);

  const onGlobalFilterChange1 = (e: any) => {
    const value = e.target.value;
    const _filters1 = { ...filters1 };
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
            placeholder="Search Bundle"
          />
        </span>
        <Link
          className="p-button"
          style={{ textDecoration: 'none' }}
          href="/uno-admin/product/bundles/create"
        >
          Create Bundle
        </Link>
      </div>
    );
  };

  const header1 = renderHeader1();

  return (
    <div>
      <div className="col-12">
        <h1 className="font-bold text-3xl py-2">All Bundles</h1>
        <DataTable
          loading={loading}
          filters={filters1}
          size="large"
          header={header1}
          tableStyle={{ width: '100%' }}
          filterDisplay="menu"
          value={bundles || []}
          paginator
          rows={10}
        >
          <Column field="name" header="Name"></Column>
          <Column field="description" header="Description"></Column>
          <Column field="tag" header="Tag"></Column>
          <Column field="ceilingAmount" header="Amount"></Column>
          {/* <Column field="project" header="Project"></Column> */}
        </DataTable>
      </div>
    </div>
  );
}
