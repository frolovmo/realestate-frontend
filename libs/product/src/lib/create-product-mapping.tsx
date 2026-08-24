import React, { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { PickList, PickListChangeEvent } from "primereact/picklist";
import { useRouter } from "next/navigation";
import { Skeleton } from "primereact/skeleton";
import { Toast } from "primereact/toast";
import { Tooltip } from "primereact/tooltip";

import { api } from "../utils";
import useProducts from "../hooks/useProducts";
import useBundles from "../hooks/useBundles";
import { Bundle, Product } from "../types";

export function CreateProductMapping(): JSX.Element {
  const toast = useRef<any>(null);
  const router = useRouter();
  const { products, loading: productLoading } = useProducts();
  const { bundles, loading: bundleLoading } = useBundles();
  const [source, setSource] = useState([]);
  const [target, setTarget] = useState([]);
  const [selectedBundle, setSelectedBundle] = useState<Bundle>();
  const [error, setError] = useState<any>();

  useEffect(() => {
    if (products.length > 0) {
      //@ts-expect-error adsfsdf
      setSource(products);
    }
  }, [products, bundles]);

  const itemTemplate = (item: Product) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3">
        <div className="flex-1 flex flex-column gap-2">
          <span className="font-bold">{item.name}</span>
          <div className="flex align-items-center gap-2">
            <span>{item.description}</span>
          </div>
        </div>
        <span className="font-bold text-900">
          {item.ceillingAmountPerYear} RWF
        </span>
      </div>
    );
  };

  const showError = (error: string) => {
    if (toast && toast.current) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error,
        life: 10000,
      });
    }
  };

  useEffect(() => {
    if (error) {
      showError(error?.response?.data?.message.toString() || "");
    }
  }, [error]);

  const onChange = (event: PickListChangeEvent): void => {
    setSource(event.source);
    setTarget(event.target);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedBundle || target.length === 0) {
      return;
    }

    const data = {
      bundleId: selectedBundle.id,
      products: target.map((product: Product) => {
        return {
          productId: product.id,
        };
      }),
    };

    api
      .post("/products/mapping", data)
      .then(() => {
        router.push("/uno-admin/product/product-mapping");
      })
      .catch((error) => {
        setError(error);
      });
  };

  if (productLoading || bundleLoading) {
    return (
      <div>
        <Skeleton className="mb-2"></Skeleton>
        <Skeleton width="10rem" className="mb-2"></Skeleton>
        <Skeleton width="5rem" className="mb-2"></Skeleton>
        <Skeleton height="2rem" className="mb-2"></Skeleton>
        <Skeleton width="10rem" height="4rem"></Skeleton>
      </div>
    );
  }

  return (
    <div>
      <Toast ref={toast} />
      <div className="col-12 m-2 w-full">
        <div className="card p-2 px-8">
          <h1 className="py-4 text-4xl font-bold">Create Product Mapping</h1>
          <form className="grid p-fluid" onSubmit={handleSubmit}>
            <div className="col-12 md:col-3">
              <label htmlFor="bundle" className="py-2">
                Select a Bundle
              </label>
              <Dropdown
                value={selectedBundle}
                optionLabel="name"
                onChange={(e) => setSelectedBundle(e.value)}
                placeholder="Select a Bundle"
                options={bundles}
                tooltip="Select a bundle to map products"
                tooltipOptions={{ position: "top", event: "both" }}
                filter
              />
            </div>
            <Tooltip target=".custom-picklist" />
            {selectedBundle && (
              <div className="col-12 md:col-12">
                <label htmlFor="products" className="my-5">
                  Select Products
                </label>
                <PickList
                  className="custom-picklist"
                  dataKey="id"
                  data-pr-tooltip="Select products to map"
                  data-pr-position="right"
                  source={source}
                  target={target}
                  onChange={onChange}
                  itemTemplate={itemTemplate}
                  filter
                  filterBy="name"
                  breakpoint="1280px"
                  sourceHeader="Available"
                  targetHeader="Selected"
                  sourceStyle={{ height: "24rem" }}
                  targetStyle={{ height: "24rem" }}
                  sourceFilterPlaceholder="Search by name"
                  targetFilterPlaceholder="Search by name"
                />
              </div>
            )}
            <div className="col-12">
              <Button
                label="Create"
                className="mt-3 w-3"
                disabled={!selectedBundle || target.length === 0}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
