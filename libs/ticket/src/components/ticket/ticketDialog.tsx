import React from 'react';
import { Dialog } from 'primereact/dialog';
import { TicketDetails } from './ticketDetails';
import { basePath } from '../../lib/api';

function TicketDialog({ visible, onHide, ticket, products, users, categories, customers, ticketsInRoute, channel }:any) {
    const normalizeStatus = (statusStr: string | undefined): number | null => {
        if (!statusStr) return null;
        switch (statusStr) {
            case 'Pending':
            return 1;
            case 'Completed':
            return 2;
            case 'Assigned':
            return 3;
            default:
            return null;
        }
    };
    const statusBodyTemplate = () => {
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

        const createdAtDate = new Date(ticketsInRoute?.createdAt);
        const status = Number(ticketsInRoute?.status ?? normalizeStatus(ticketsInRoute?.ticketStatus));

        const isOverdue = status !== 2 && createdAtDate < threeDaysAgo;
        return isOverdue;
    };
    const isOverdue = statusBodyTemplate(); 
    return (
        <Dialog
            header={
                <div
                style={{
                    backgroundColor: isOverdue ? 'rgb(195, 65, 65)' : '#8bc341',
                    padding: '10px',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                }}
                >
                <div
                    onClick={() => window.location.assign(`${basePath}/ticket`)}
                    style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '12px',
                    cursor: 'pointer',
                    }}
                >
                    <span style={{ marginRight: '5px' }}>←</span>
                    <span>Back to Ticket List</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', margin: '20px' }}>
                    <i className="pi pi-ticket" style={{ fontSize: '32px', marginRight: '20px' }}></i>
                    <h5 style={{ margin: 0, fontSize: '32px', color: 'white' }}>Tickets Info</h5>
                </div>
                </div>
            }
            visible={visible}
            style={{ width: '50vw' }}
            onHide={onHide}
            className='w-full sm:w-6'
            >
            <style>
                {`
                .p-dialog .p-dialog-header {
                    background-color: ${isOverdue ? 'rgb(195, 65, 65)' : '#8bc341'} !important;
                    padding: 10px;
                    color: white;
                }
                `}
            </style>

            <TicketDetails ticketsInRoute={ticketsInRoute} users={users} categories={categories} customers={customers} channel={channel}/>
        </Dialog>
    );
}

export default TicketDialog;
