import React from 'react';
import { Dialog } from 'primereact/dialog';
import TicketCreateForm from './ticketCreateForm';
import { basePath } from '../../lib/api';

function TicketCreateDialog({ visible, onHide, categories ,customers,users}:any) {
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
                        <h5 style={{ margin: 0 }}>Create Ticket</h5>
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
            <TicketCreateForm users={users} onHide={onHide} categories={categories} customers={customers} />
        </Dialog>
    );
}

export default TicketCreateDialog;
