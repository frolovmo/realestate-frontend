"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { atom, types } from "@uno/utils";
import { Toast } from "primereact/toast";
import { useAtom } from "jotai";
import { Dialog } from 'primereact/dialog';

import useBundles from '../hooks/useBundles';
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Message } from 'primereact/message'

const { sendRequestAtom } = atom;

export function ListApplictaions(): JSX.Element {
  const { bundles, loading } = useBundles();
  const [, sendRequest] = useAtom(sendRequestAtom);
  const toast = useRef<Toast>(null);
  const [allForms, setAllForms] = useState<any>([]);
  const [ modalIsOpen, setModalIsOpen ] = useState<boolean>(false);
  const showError = (error: string) => {
    if (toast && toast.current) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error,
        life: 3000,
      });
    }
  };

  useEffect(() => {
    fetchAllGroups();
  }, [])

  const fetchAllGroups = async () => {
    const res = await sendRequest({
      reqType: "post",
      url: "forms/all",
      data: {
        // limit: 100
      },
    });
    const reversedData = res.data.rows.reverse();
    setAllForms(reversedData);
  };

  const actionBodyTemplate = () => (
    <div className="flex gap-2">
      <Button icon="pi pi-eye" className="button-rounded p-button-info p-button-sm" outlined onClick={() => { setModalIsOpen(true)}}/>
    </div>
  );
  const statusBodyTemplate = (rowData: any) => {
    return (
      <div className="flex align-items-center">
        <div
          className={`w-3rem h-3rem border-circle flex align-items-center justify-content-center ${rowData.isActive ? "bg-green-50" : "bg-red-50"
            }`}
        >
          <i
            className={`text-xl ${rowData.isActive
                ? "pi pi-check-circle text-green-500"
                : "pi pi-times-circle text-red-500"
              }`}
          ></i>
        </div>
      </div>
    )
  }
  const renderHeader1 = () => {
    return (
      <div className="flex justify-content-between">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            // value={globalFilterValue1}
            // onChange={onGlobalFilterChange1}
            placeholder="Search Application"
          />
        </span>
        <Link
          className="p-button"
          style={{ textDecoration: 'none' }}
          href="/uno-admin/product/applications/create"
        >
          Create Application
        </Link>
      </div>
    );
  };

  const header1 = renderHeader1();
  return (
    <div>
      <div className="col-12">
        <h2>All Application Forms</h2>

        <DataTable
          // loading={loading}
          // filters={filters1}
          loading={loading}
          size="large"
          header={header1}
          tableStyle={{ width: '100%' }}
          filterDisplay="menu"
          value={allForms}
          paginator
          rows={10}
        >
          <Column field="title" header="Form Name"></Column>
          <Column field="description" header="Description"></Column>
          <Column field="bundleName" header="Assigned Bundle"></Column>
          <Column field="isActive" header="Active" body={statusBodyTemplate}></Column>
          <Column header="Action" body={actionBodyTemplate}></Column>
        </DataTable>
      </div>
      <Dialog
        header="Application Form"
        visible={modalIsOpen}
        style={{ width: '50vw' }}
        onHide={() => setModalIsOpen(false)}>
          <Button icon ={`pi pi-pencil`}/>
          <div className="card flex justify-content-center mt-2">
            <Message text ="Hang tight! We’re building something awesome here.😉" className='w-full'/>
          </div>
        </Dialog>
    </div>
  )
}

export default ListApplictaions;