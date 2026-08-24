import { DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from "primereact/button";
import { ProtectedComponent } from "@uno/utils";



const Header = ({ layout, onChangeLayout ,onOpenCreate, channel}:any) => (
  <div>
     <div className="flex flex-wrap align-items-center justify-content-between gap-2 p-4">
        <span className="text-xl py-2 border-gray-300 "> Customer Raised Tickets</span>
      </div>
    {channel === 'processed' && (
      <ProtectedComponent path="/api/tickets/create" method="POST" fallback={null}>
        <div className="card flex pl-5">
          <Button label="New" icon="pi pi-plus" severity="warning" onClick={() => onOpenCreate()} />
        </div>
      </ProtectedComponent>
    )}

      <ProtectedComponent path="/api/tickets" method="GET" fallback={null}>
      <div className="flex justify-content-end">
        
          <DataViewLayoutOptions layout={layout} onChange={(e) => onChangeLayout(e.value)} />
      </div>
      </ProtectedComponent>

  </div>  
);
export default Header;
