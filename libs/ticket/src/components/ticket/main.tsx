import { useEffect,useState,useRef } from "react";
import TicketStats  from "./ticketStats";
import TreeTableComponent from "./table";
import TicketCard from "./ticketCard";
import Header  from "./header";
import { Paginator } from "primereact/paginator";
import { useAtom } from 'jotai';
import { DataView } from 'primereact/dataview';
import TicketCreateDialog from './ticketCreateDialog';

import { sendRequestAtom } from './../../atoms';


interface TicketData {
  status: number;
  createdAt: string;
}
interface TicketNode {
  key: string;
  data: TicketData;
  children: any[];
} 

const TableComponent = ({ users,categories, customers, getCustomers,customerPage,hasMoreCustomers,columns ,loadingCustomers, channel,filterValues,setFilterValues,currentPage,setCurrentPage,rowsPerPage,setRowsPerPage}:any) => {
    const isPaginationRef = useRef(false);  
    const [tickets, setTickets] = useState([]);
    const [stats, setStats] =  useState<any>({});
    const [layout, setLayout] = useState<"list" | "grid">("list");
    const [filterDatas, setFilterDatas] = useState<any>({});
    const [, sendRequest] = useAtom(sendRequestAtom);
    const [showCreateModal, setShowCreateModal] = useState(false);


    const gridItem = () => {
      return (
          <TicketCard
              tickets={tickets}
              categories={categories}
              users={users}
              setTickets={setTickets} 
              channel={channel}
              customers={customers}

          />
        );      
    };
    const itemTemplate = (node:any, products:any, users:any, layout:any ) => {
        if (!node) {
            return;
        }
        if (layout === 'list') return listItem();
  
        else if (layout === 'grid') return gridItem();
    };
  
    const listTemplate = (tickets:any, layout:any) => {
       if (layout === 'grid') return <div className="grid grid-nogutter p-3 bg-blue">{ itemTemplate(tickets,categories,users,layout)}</div>;
       else if (layout === 'list') return <div className="grid grid-nogutter">{ itemTemplate(tickets, categories,users,layout)}</div>
    
    };
    const onPageChange = (e: any) => {
        isPaginationRef.current = true;
        const limit = e.rows;
        const page = e.page;
        setCurrentPage(page);
        setRowsPerPage(limit);
        getAllTickets({ limit, page});
      };
      const onFilterPageChange = (e: any) => {
        isPaginationRef.current = true;
        const limit = e.rows;
        const page = e.page;
        setCurrentPage(page);
        setRowsPerPage(limit);
        const serializedFilterValues = JSON.stringify(filterValues);
        getAllTickets({ limit, page ,serializedFilterValues});

      };


    useEffect(() => {
        if (!showCreateModal) {
          const isEmpty = !filterValues || Object.keys(filterValues).length === 0;
          const serializedFilterValues = isEmpty ? null : JSON.stringify(filterValues);

          if (isPaginationRef.current) {
            isPaginationRef.current = false;
            getAllTickets({ limit: rowsPerPage, page: currentPage, serializedFilterValues });
          } else {
            getAllTickets({ limit: rowsPerPage, page: currentPage, serializedFilterValues });
          }
        }
    }, [showCreateModal, currentPage, rowsPerPage, filterValues]);
    
      const getAllTickets = async (data: any): Promise<void> => {
        const getUrl = () => {
          if (channel === "processed") return "tickets";
          if (channel === "minuza") return "minuza-tickets";
          return null;
        };
        const url = getUrl();
        if (!url) return;
        const res =  await sendRequest({
          reqType: "get",
          url,
          data
        });
         
        setFilterDatas(res.data)
        setStats(res.data.stats)

        const pageData = res.data?.rows?.map((item: any, index: number) => ({
          key: String(index),             
          data: {
            id: item.id,
            createdBy: item.createdBy,
            assigneeId: item.assigneeId,
            productId: item.productId ? item.productId : 1,
            subject: item.subject || "Unknown",
            description:item.description,
            isCompleted: item.isCompleted,
            isClosed: item.isClosed,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            status: item.ticketStatus
            ? item.ticketStatus === "Pending"
              ? 1
              : item.ticketStatus === "Completed"
              ? 2
              : item.ticketStatus === "Assigned"
              ? 3
              : item.status ?? null
            : item.status ?? null,              
            priority: item.priority,
            ticketId: item.ticketId || null,
            attachmentName: item.attachmentName,
            dateAssigned: item.dateAssigned,
            dateCompleted: item.dateCompleted,
            timeDifference: item.timeDifference,
            assignments: item.assignments?.length ? item.assignments : [{ assignerId: null }],
            creator: item.creator ?? null,
            source:item.source
          },          
          children: [],                      
        }));
    
        setTickets(pageData);
      };

    const handleOpenCreate = () => {
        setShowCreateModal(true);
    };
    
    const handleFilterChange = async (e: { value: Date[] | Date | null }, field: string) => {
      let newFilterValues;

        if (field === "all") {
          newFilterValues = e.value;
        } else if (field === "createdAt") {
          const selectedRange = e.value;
      
          if (
            Array.isArray(selectedRange) &&
            selectedRange.length === 2 &&
            selectedRange[0] &&
            selectedRange[1]
          ) {
            const start = new Date(selectedRange[0]);
            start.setHours(0, 0, 0, 0);

            const end = new Date(selectedRange[1]);
            end.setHours(23, 59, 59, 999);
            const adjustedRange = [start, end];         

            newFilterValues = {
              ...filterValues,
              createdAt: adjustedRange,

            };
          } else {
          setFilterValues({
              ...filterValues,
              createdAt: selectedRange,

            });
            return;
          }
        } else {
          newFilterValues = {
            ...filterValues,
            [field]: e.value,
          };
        }
    
        setFilterValues(newFilterValues);
    
        // If all filters are empty, send null instead of '{}'
        const isEmptyFilters = !Object.values(newFilterValues).some((val) => val);
        const serializedFilterValues = isEmptyFilters ? null : JSON.stringify(newFilterValues);

    await getAllTickets({ currentPage, rowsPerPage, serializedFilterValues });
  };


    const listItem = () => {
        return(
            <TreeTableComponent
                tickets={tickets}
                categories={categories}
                users={users}
                customers={customers}
                getCustomers={(channel, page = 0, search = "") => getCustomers(channel, page, search)}
                customerPage={customerPage}
                hasMoreCustomers={hasMoreCustomers}
                columns={columns}
                handleFilterChange={handleFilterChange}
                filterValues={filterValues}  
                loadingCustomers={loadingCustomers}   
                channel={channel} 
                setFilterValues={setFilterValues}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        )
    }

    return (
        <div className="w-full">
            <div className="bg-blue-50 p-3">
                <div className="flex flex-column p-3">
                    <div className="text-xl text-900 font-bold">
                            Ticket Overview
                    </div>
                </div>
                <TicketStats 
                    openTickets={ stats?.open }  
                    inProgressTickets={stats?.inProgress}  
                    closedTickets={ stats?.closed }  
                    overdueTickets={ stats?.overdue} 
                    totalTickets={filterDatas?.pageMeta?.totalCount} 
                   />
                <Header layout={layout} onChangeLayout={setLayout} onOpenCreate={handleOpenCreate} channel={channel}/>
                <TicketCreateDialog
                    visible={showCreateModal}
                    onHide={() => setShowCreateModal(false)}
                    categories={categories}
                    customers={customers}
                    users={users}
                />
            </div>
            <div className="w-full bg-red-200">
                {tickets?.length > 0 ? (
                    <DataView value={tickets} listTemplate={listTemplate} layout={layout} />
                ) : (
                  <div className="bg-green-200 w-full">
                    <TreeTableComponent
                        tickets={tickets}
                        categories={categories}
                        users={users}
                        customers={customers}
                        getCustomers={(channel, page = 0, search = "") => getCustomers(channel, page, search)}
                        customerPage={customerPage}
                        hasMoreCustomers={hasMoreCustomers}
                        columns={columns}
                        handleFilterChange={handleFilterChange}
                        filterValues={filterValues}
                        loadingCustomers={loadingCustomers}
                        channel={channel}
                        setFilterValues={setFilterValues}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                     />
                  </div>
                )}
            </div>
            <div className="bg-white shadow-md rounded-lg items-center justify-start pl-10 w-full">
              <div className="flex-col items-center justify-center text-center">
                <span className="text-gray-700">
                  {filterDatas?.pageMeta?.totalCount && filterDatas.pageMeta.totalCount > 0 ? (
                    <>
                      Showing {(currentPage * rowsPerPage) + 1} to{" "}
                      {Math.min((currentPage + 1) * rowsPerPage, filterDatas.pageMeta.totalCount)} of{" "}
                      {filterDatas.pageMeta.totalCount} entries
                    </>
                  ) : (
                    "0 entries"
                  )}
                </span>
                <Paginator
                  totalRecords={filterDatas?.pageMeta?.totalCount}
                  first={currentPage * rowsPerPage}
                  rows={rowsPerPage}
                  rowsPerPageOptions={[10, 20, 50]}
                  onPageChange={filterValues && Object.keys(filterValues).length > 0 ? onFilterPageChange : onPageChange}
                />
              </div>
            </div>
        </div>

    );

};

export default TableComponent;
