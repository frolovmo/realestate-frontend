'use client'


import React, { useRef } from 'react'; 
import { useMountEffect } from 'primereact/hooks';
import { Messages } from 'primereact/messages';

export default function PermissionFallback() {
    const msgs = useRef<Messages>(null);

    useMountEffect(() => {
        msgs.current?.clear();
        msgs.current?.show({ id: '1', sticky: true, severity: 'warn', summary: 'Warning', detail: 'You do not have permission to access this page!', closable: false });
    });

    return (
        <div className=" flex">
            <Messages ref={msgs} className='w-full'/>
        </div>
    )
}
        