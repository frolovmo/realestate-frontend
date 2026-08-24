'use client'

import React, { useEffect, useRef, useState } from 'react';
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { classNames } from "primereact/utils";
import { useRouter } from "next/navigation";
import { atom, PermissionHOC } from '@uno/utils';
import { Toast } from "primereact/toast";
import { IdentificationType } from '@kataza/src/constants';
import { useAtom } from 'jotai';
import { approvalStatus } from '@kataza/src/constants';

const { sendRequestAtom } = atom;

export default function Application() {
  const router = useRouter();
  const toast = useRef<Toast>(null);

  const [, sendRequest] = useAtom(sendRequestAtom);
  const [allApplication, setAllApplication] = useState<any>();
  const [totalRecords, setTotalRecords] = useState(0);
  const [lazyParams, setLazyParams] = useState({
    first: 0,
    rows: 10,
    page: 0
  });

  useEffect(() => {
    getAllApplication(lazyParams.page, lazyParams.rows)
  }, [])

  const showError = (message: string, title = "Error") => {
    toast.current?.show({
      severity: "error",
      summary: title,
      detail: message,
      life: 5000,
    });
  };
  const getAllApplication = async (page = 0, limit = 10) => {
    try {
      const res = await sendRequest({
        reqType: "post",
        url: "application/all",
        data: {
          limit,
          page,
          orderType:"desc"
        }
      })
      if (res.data) {
        setAllApplication(res.data.rows)
        setTotalRecords(res.data.pageMeta.totalCount)
      }
    } catch (error) {
      showError("Oops something went wrong!!")
    }
  }

  const onPageChange = (event: any) => {
    setLazyParams(event);
    const page = event.page;
    const limit = event.rows;
    getAllApplication(page, limit);
  };

  const getHeader = () => {
    return (
      <div className="flex flex-col sm:flex-row gap-2 justify-content-between items-center w-full">
        <p className='text-lg md:text-xl font-semibold'>Manage Application</p>
        <IconField iconPosition="right" className="w-full sm:w-auto">
          <InputText type="search" placeholder=" Search" className="w-full sm:w-60 md:w-80 p-2" />
        </IconField>
      </div>
    );
  };
  let header = getHeader();

  const statusBodyTemplate = (rowData: any) => {
    const statusClass = classNames({
      "bg-yellow-200 text-orange-900 border-round": rowData.status === approvalStatus.pending,
      "bg-green-200 text-green-900 border-round": rowData.status === approvalStatus.approved,
      "bg-red-200 text-red-900 border-round": rowData.status === approvalStatus.rejected,
    });

    return <div style={{ width: '7rem' }} className={`p-1 rounded flex justify-content-center ${statusClass}`}>{rowData.status}</div>;
  };

  const actionBodyTemplate = (rowData: any) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-eye"
        className="button-rounded p-button-info p-button-sm"
        outlined
        onClick={() => {
          console.log("rowData", rowData);
          if (rowData?.applicationIdentifier) {
            router.push(`applicationDetails?id=${rowData.applicationIdentifier}`);
            
          }
        }}
      />
    </div>
  );
  return (
    <div>
      <div
        className="flex flex-wrap justify-content-end items-center p-4 border border-gray-300 rounded-md gap-2 h-24  mb-2 w-full sm:gap-4 sm:p-5"
        style={{
          border: "1px solid #E3E8F0",
          borderRadius: "0.5rem",
          backgroundColor: '#F8FAFC',
        }}
      >
        <Button icon="pi pi-upload" label="Export" className="w-full sm:w-auto" />
      </div>
      {/* <div style={{
        display: 'flex',
        justifyContent: "space-around",
        alignItems: 'center',
        paddingRight: "20px",
        border: "1px solid #E3E8F0",
        borderRadius: "0.5rem",
        height: '3rem',
        backgroundColor: '#F8FAFC',
        marginBottom: "10px"

      }}>
        <div style={{
          display: 'flex',
          width: "12rem",
          height: "2rem",
          justifyContent: "space-around",
          alignItems: 'center',
        }}>
          Create Date
          <i className={"pi pi-chevron-down"} style={{ fontSize: '0.8rem' }}></i>
        </div>
        <div style={{
          display: 'flex',
          width: "12rem",
          height: "2rem",
          justifyContent: "space-around",
          alignItems: 'center',
        }}>
          Loan Type
          <i className={"pi pi-chevron-down"} style={{ fontSize: '0.8rem' }}></i>
        </div>
        <div style={{
          display: 'flex',
          width: "12rem",
          height: "2rem",
          justifyContent: "space-around",
          alignItems: 'center',
        }}>
          Status
          <i className={"pi pi-chevron-down"} style={{ fontSize: '0.8rem' }}></i>
        </div>
        <div style={{
          display: 'flex',
          width: "12rem",
          height: "2rem",
          gap: "10px",
          alignItems: 'center',
        }}>
          <i className={"pi pi-sliders-h"} style={{ fontSize: '1.3rem', color: "#348352" }}></i>
          Advanced Filters
        </div>
        <div style={{
          display: 'flex',
          width: "12rem",
          height: "2rem",
          justifyContent: "space-around",
          alignItems: 'center',
        }}>
          Clear All
          <i className={"pi pi-chevron-down"} style={{ fontSize: '0.8rem' }}></i>
        </div>
      </div> */}
      <div className=" w-full bg-blue-50">
        <DataTable
          value={allApplication}
          header={header}
          tableStyle={{
            minWidth: '50rem',
            borderRadius: '2rem'
          }}
          paginator 
          rows={lazyParams.rows}
          totalRecords={totalRecords}
          lazy
          first={lazyParams.first}
          onPage={onPageChange}
          key="applicationId"
        // onRowClick={handleRowClick}
        >

          <Column headerStyle={{ width: '3rem' }} ></Column>
          <Column field="applicant.fullName" header="Name" ></Column>
          <Column header="Loan Amount(RWF)"
            body={(rowData: any) =>
              Number(rowData.totalLoanAmount).toLocaleString('en-US')
            }
          ></Column>
          <Column header="Application Date " body={(rowData: any) => new Date(rowData.createdAt).toLocaleDateString()} ></Column>
          <Column header="Applicant Type"
            body={(rowData) =>
              rowData.applicationType
                ? rowData.applicationType
                :  'N/A'
            }
          ></Column>
          <Column field="status" header="STATUS" body={statusBodyTemplate}></Column>
          <Column field="campaignstart" header="Action" body={(rowData: any) => actionBodyTemplate(rowData)}></Column>
        </DataTable>
      </div>
    </div>
  )
}