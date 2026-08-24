import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Dropdown, DropdownProps } from 'primereact/dropdown';

import useBundles from '../hooks/useBundles';
import useProductMapping from '../hooks/useProductMapping';

export function ListProductMappings(): JSX.Element {
  const { bundles } = useBundles();
  const [selectedBundle, setSelectedBundle] = useState({ name: 'All', id: 0 });
  const [formattedProductMappings, setFormattedProductMappings] = useState<
    any[]
  >([]);
  const { getProductMapping, loading, productMapping, getAllProductMapping } =
    useProductMapping();

  useEffect(() => {
    if (selectedBundle) {
      if (selectedBundle.name === 'All') {
        getAllProductMapping();
      } else {
        getProductMapping(selectedBundle.id);
      }
    }
  }, [selectedBundle]);

  useEffect(() => {
    if (
      productMapping &&
      productMapping.length > 0 &&
      selectedBundle.name === 'All'
    ) {
      const result = productMapping.map((mapping: any) => {
        const { bundle, product } = mapping;
        return {
          ...product,
          bundle: bundle.name,
        };
      });
      setFormattedProductMappings(result);
    }
    if (
      productMapping &&
      productMapping.length > 0 &&
      selectedBundle.name !== 'All'
    ) {
      setFormattedProductMappings(
        productMapping.map((mapping: any) => ({
          ...mapping,
          bundle: selectedBundle.name,
        }))
      );
    }
  }, [productMapping]);

  const renderHeader1 = () => {
    return (
      <div className="flex justify-content-between">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText placeholder="Search Product Mapping" />
        </span>
        <Link
          className="p-button"
          style={{ textDecoration: 'none' }}
          href="/uno-admin/product/product-mapping/create"
        >
          Create Product Mapping
        </Link>
      </div>
    );
  };

  const header1 = renderHeader1();

  const selectedCountryTemplate = (option: any, props: any) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const countryOptionTemplate = (option: any) => {
    return (
      <div className="flex align-items-center">
        <div>{option.name}</div>
      </div>
    );
  };

  return (
    <>
      <div>
        <h1 className="py-4 text-4xl font-bold">All Products Mappings</h1>
        <div className="w-5 my-2">
          <label htmlFor="bundle" className="py-2">
            Select a Bundle
          </label>
          <br />
          <Dropdown
            value={selectedBundle}
            optionLabel="name"
            onChange={(e) => {
              setSelectedBundle(e.value);
            }}
            placeholder="Select a Bundle"
            options={[{ name: 'All', value: { name: 'All' } }, ...bundles]}
            className="w-full md:w-14rem"
            filter
            valueTemplate={selectedCountryTemplate}
            itemTemplate={countryOptionTemplate}
            defaultValue={'All'}
          />
        </div>
        {loading && <div>Loading...</div>}
        <DataTable
          loading={loading}
          size="large"
          header={header1}
          tableStyle={{ width: '100%' }}
          filterDisplay="menu"
          value={formattedProductMappings || []}
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
          <Column field="bundle" header="Bundle"></Column>
        </DataTable>
      </div>
    </>
  );
}
