import React from 'react';
import { Dialog } from 'primereact/dialog';
import TicketUpdateForm from './ticketUpdateForm';
import { basePath } from '../../lib/api';

function TicketUpdateDialog({ visible, onHide, ticket, products, users, categories, customers, ticketsInRoute ,channel }:any) {
    return (
        <Dialog
            header={
                <div>
                    <div onClick={() => window.location.assign(`${basePath}/ticket`)} style={{ display: 'flex', alignItems: 'center', fontSize: '12px', cursor: 'pointer' }}>
                        <span style={{ marginRight: '5px' }}>←</span>
                        <span>Back to Ticket List</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', margin: '20px' }}>
                        <i className="pi pi-ticket" style={{ fontSize: '32px', marginRight: '20px' }}></i>
                        <h5 style={{ margin: 0 ,fontSize: '32px',color: 'white'}}>Assign Ticket</h5>
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
                    .p-dialog-header {
                        background-color: #8bc341 !important;
                        padding: 10px;
                        color: white;
                    }
                `}
            </style>
            <TicketUpdateForm ticketsInRoute={ticketsInRoute} products={products} users={users} categories={categories} onHide={onHide} customers={customers} channel={channel}/>
        </Dialog>
    );
}

export default TicketUpdateDialog;
