import Image from "next/image";

import { Column } from "primereact/column";

import React, { useEffect, useRef, useState } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { Toast } from "primereact/toast";
import { atom, PermissionHOC } from '@uno/utils';
import { IdentificationType } from '@kataza/src/constants';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { approvalStatus } from "@kataza/src/constants";

import { useAtom } from 'jotai';
import { Avatar } from "primereact/avatar";
const { sendRequestAtom } = atom;

const stats = [
  {
    title: "Total Customers",
    value: "20,000",
    change: "+8.5%",
    trend: "Up from yesterday",
    color: "bg-purple-100 text-purple-600",
    image: "userIcon.png",
    trendColor: "text-green-500",
  },
  {
    title: "Total Loan Applications",
    value: "120",
    change: "+1.3%",
    trend: "Up from past week",
    color: "bg-yellow-100 text-yellow-600",
    image: "BoxIcon.png",
    trendColor: "text-green-500",
  },
  {
    title: "Loan Amount Disbursed",
    value: "RWF 189,000,000",
    change: "-4.3%",
    trend: "Down from yesterday",
    color: "bg-green-100 text-green-600",
    image: "Line.png",
    trendColor: "text-red-500",
  },
  {
    title: "Pending Applications",
    value: "32",
    change: "+1.8%",
    trend: "Up from yesterday",
    color: "bg-red-100 text-red-600",
    image: "Refresh.png",
    trendColor: "text-green-500",
  },
];

export default function Dashboard() {
  const router = useRouter();

  const [, sendRequest] = useAtom(sendRequestAtom);
  const toast = useRef<Toast>(null);
  const [allApplication, setAllApplication] = useState<any>();

  useEffect(() => {
    getAllApplication()
  }, [])

  const showError = (message: string, title = "Error") => {
    toast.current?.show({
      severity: "error",
      summary: title,
      detail: message,
      life: 5000,
    });
  };
  const getAllApplication = async () => {
    try {
      const res = await sendRequest({
        reqType: "post",
        url: "application/all",
        data: {
          limit: 10,
          orderType:"desc"
        }
      })
      if (res.data) {
        const reversedData = res.data.rows
        const recentFive = reversedData.slice(0, 5);
        setAllApplication(recentFive)
      }

    } catch (error) {
      showError("Oops something went wrong!!")
    }
  }
  
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
          if (rowData?.applicationIdentifier) {
            router.push(`applicationDetails?id=${rowData.applicationIdentifier}`);
          }
        }}
      />
    </div>
  );

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // If dropped outside a droppable area, do nothing
    if (!destination) return;

    const sourceList: any[] = []
    const destinationList: any[] = [];

    // Remove item from source and add to destination
    const [movedItem] = sourceList.splice(source.index, 1);
    destinationList.splice(destination.index, 0, movedItem);
  };

  const renderCard = (item: any, index: number) => {
    const date = item.createdAt;
    
    const formatted = new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    return (
      <div
        key={item.applicationId}
        className="flex flex-column bg-white p-2 mt-3 border-round cursor-pointer"
        onClick={() => {
          if (item?.applicationIdentifier) {
            router.push(`applicationDetails?id=${item.applicationIdentifier}`);
          }
        }}>
        <div className="flex flex-row justify-content-between">
          <div className="font-bold">
            {item.applicant.fullName}
          </div>
          <div
            style={{
              backgroundColor: item.status === approvalStatus.pending
                ? 'orange'
                : item.status === approvalStatus.approved
                  ? "green"
                  : 'red'
            }} className="border-round-2xl w-1rem h-1rem"></div>
        </div>
        <div className="text-sm">
          Kataza
        </div>
        <div className="flex flex-row justify-content-between">
          <div className="flex align-items-center w-10rem h-2rem text-sm text-gray-500 font-semibold">
            <i className={"pi pi-calendar-minus"} style={{ marginRight: "0.5rem" }}></i>
            {formatted}
          </div>
          <div className="flex justify-content-center align-items-center border-round w-2rem h-2rem">
            <Avatar icon="pi pi-user" style={{ backgroundColor: '#00D26A', color: '#ffffff' }} shape="circle" />
          </div>
        </div>
        <div className="w-full h-1 mt-2 border-round" style={{
          height: "4px",
          background: "linear-gradient(to right, #00ff00, #006400)" // gradient from light green to dark green
        }}>
        </div>
      </div>
    )
  }

  const renderColumn = (status: string, title: string) => {
    const columnItems = Array.isArray(allApplication)
      ? allApplication.filter((item) => {
        if (!item.status) return false;
        return item.status.toLowerCase() === status.toLowerCase();
      })
      : [];
    return (
      <Droppable droppableId={status}>
        {(provided) => (
          <div
            className="col bg-gray-200 p-4 rounded-lg  border-1 border-white"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className="font-bold border-bottom-2 py-2 border-white flex align-items-center justify-content-between">
              {title}
            </div>
            {columnItems.length > 0 ? (
              columnItems.map((item: any, index: any) => renderCard(item, index))
            ) : (
              <div className="text-center text-gray-500 mt-4">
                No applications in this status.
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  };
  return (
    <div className="flex flex-column">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 justify-content-between">
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{ width: "20rem", borderRadius: '0.8rem' }}
            className="shadow-md bg-white p-4  flex flex-column gap-1"
          >
            <div className="flex items-center gap-3 justify-content-between">
              <span className="text-gray-600 font-bold">{stat.title}</span>
              <div className={`p-2 rounded-full text-xl `}>
                <Image
                  src={`/${stat.image}`}
                  alt="logo"
                  width={50}
                  height={50}
                />
              </div>
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className={`text-sm flex items-center ${stat.trendColor}`}>
              <span className="mr-1">{stat.change}</span>
              <span>{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-column p-3">
        <div className="flex justify-content-between border-bottom-2 py-2 border-gray-300">
          <span className="text-2xl font-bold ">Loan Pipeline</span>
          <span className="text-lg font-bold cursor-pointer text-green-900"
            onClick={() => {
              router.push('/kataza/applications');
            }}>View all</span>
        </div>
      </div>
      <DragDropContext
        onDragEnd={onDragEnd} >
        <div
          className="grid p-2 "
          style={{
            display: 'flex',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '1rem',
            justifyContent: 'space-around',
          }}
        >
          {renderColumn('PENDING', 'Pending')}
          {renderColumn('APPROVED', 'Approved')}
          {renderColumn('REJECTED', 'Rejected')}
        </div>
      </DragDropContext>
      <div className="flex flex-column p-3">
        <div className="text-2xl font-bold border-bottom-2 py-2 border-gray-300">
          Recent Loan Applications
        </div>
      </div>

      <div className="flex flex-column p-3 mb-5">
        <DataTable
          value={allApplication}
          tableStyle={{ minWidth: "73.2rem" }}
          // key={allApplication.applicantId}
          // paginator rows={5}
          key="applicantId"
          rowsPerPageOptions={[5]} >
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
              rowData.applicant?.identificationType === IdentificationType.nid || rowData.applicant?.identificationType === IdentificationType.passport
                ? 'Personal'
                : rowData.applicant?.identificationType === IdentificationType.tin
                  ? 'Company'
                  : 'N/A'
            }
          ></Column>
          <Column field="status" header="STATUS" body={statusBodyTemplate}></Column>
          <Column field="campaignstart" header="Action" body={(rowData: any) => actionBodyTemplate(rowData)}></Column>
        </DataTable>
      </div>
    </div>

  );
}
