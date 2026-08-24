import React from 'react';
import { useEffect,useState } from "react";
import { Button } from 'primereact/button';
import TableComponent from './main';
import { ProtectedComponent } from "@uno/utils";


function TicketTable({ tickets, products, users, categories, customers, getCustomers ,customerPage,
    hasMoreCustomers, onOpenDetails, onOpenUpdate,loadingCustomers, channel,filterValues,setFilterValues,currentPage,setCurrentPage,rowsPerPage,setRowsPerPage}:any) {

    const renderColAction = (rowData:any) => {
        return (
            <>
                <ProtectedComponent path="/api/tickets/:id" method="GET" fallback={null}>

                <Button
                    className="pi pi-eye"
                    link
                    onClick={() => onOpenDetails(rowData,channel)}
                />
                </ProtectedComponent>
                <ProtectedComponent path="/api/tickets/update/:id" method="PATCH" fallback={null}>

                <Button
                    className="pi pi-reply"
                    link
                    onClick={() => onOpenUpdate(rowData,channel)}
                />
                </ProtectedComponent>
            </>
        );
    };

    const columns = [
        { title: "Created For", value: "createdBy"},
        { title: "Title", value: "subject" },
        { title: "Status", value: "status" },
        { title: "Priority", value: "priority" },
        { title: "Assignee", value: "assigneeId" },
        { title: "Product", value: "productId" },
        { title: "Created At", value: "createdAt" },
        { title: "Action", value: "path", body: renderColAction },
    ];

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-3xl text-900 font-bold">Customer Raised Tickets</span>
            <Button icon="pi pi-refresh" rounded raised />
        </div>
    );

    return (
        <ProtectedComponent path="/api/tickets" method="GET" fallback={'You do not have permission to access this page'}>

        <div className="flex flex-column bg-blue-100">
            <TableComponent
                header={header}
                dataSource={tickets}
                products={products}
                users={users}
                categories={categories}
                customers={customers}
                getCustomers={getCustomers}
                customerPage={customerPage}
                hasMoreCustomers={hasMoreCustomers}
                columns={columns}
                loadingCustomers={loadingCustomers}
                channel={channel}
                filterValues={filterValues}
                setFilterValues={setFilterValues}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
            />
        </div>
        </ProtectedComponent>

    );
}

export default TicketTable;

  