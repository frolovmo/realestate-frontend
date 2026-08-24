'use client';

import React from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import * as pdfjsLib from "pdfjs-dist";
import '@react-pdf-viewer/core/lib/styles/index.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

type Props = {
    url: string;
};

const PdfPreview: React.FC<Props> = ({ url }) => {
    const fileName = url.split('/').pop() || 'Download PDF';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                textDecoration: 'underline',
                color: '#0066cc', // Typical link blue
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px' // space between icon and text
            }}
        >
            <i className="pi pi-file-pdf" style={{ fontSize: '1rem', color: 'red' }}></i> {/* PrimeReact file icon */}
            {fileName}
        </a>
    </div>
    );
};

export default PdfPreview;
