import React, { Suspense, useState, useRef, useEffect } from "react";
import TicketDialog from "./../components/ticket/ticketDialog";
import TicketUpdateDialog from "./../components/ticket/ticketUpdateDialog";
import TicketTable from "./../components/ticket/ticketTable";
import { TabView, TabPanel } from 'primereact/tabview';

import { sendRequestAtom } from "./../atoms";
import { useAtom } from "jotai";
import { ROLE_USER, ROLE_CUSTOMER_EXPERIENCE } from "./../lib/api";


export function ListTickets(): JSX.Element {
  const toast = useRef(null);
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [ticketsInRoute, setTicketsInRoute] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [, sendRequest] = useAtom(sendRequestAtom);
  const [categories, setCategories] = useState([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerPage, setCustomerPage] = useState(0);
  const [hasMoreCustomers, setHasMoreCustomers] = useState(true);
  const [loadingCustomers, setLoadingCustomers] = useState(false);
  const [channel, setChannel] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [filterValues, setFilterValues] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

type Customer = {
  id: number;
  fullname?: string;
  Customer_name?: string;
  user?: { id: number };
};


  const currentChannel = activeIndex === 0 ? "processed" : "minuza";

  useEffect(() => {
    getCategories()
    getUsers();
    getCustomers(currentChannel,0,"");
  
  }, [activeIndex]);


  const getTicketAccess = async (data?: any,channel?:any): Promise<void> => {
    let res
    if(channel === 'processed'){
         res =  await sendRequest({
          reqType: "get",
          url:  `tickets/${data.id}`,
          data
        });
      }
      if(channel === 'minuza'){
        res =  await sendRequest({
          reqType: "get",
          url:`minuza-tickets/${data.id}`,
          data
        });
      }
      setTicketsInRoute(res.data);
    };

    const getCategories = async (data?: any): Promise<void> => {
      const res = await sendRequest({
        reqType: "get",
        url: `ticket-categories`,
        data: {},
      });
      setCategories(res.data?.rows);
    };

  const getUsers = async(): Promise<void> => {
    try {
      // Fetch from /api/minuza-users (all users)
      let res
         res =  await sendRequest({
          reqType: "post",
          url: `access/get-all-users`,
          data: { page: 1, per_page: 20, roleId:Number(ROLE_CUSTOMER_EXPERIENCE),status:true},
        });
        setUsers(res?.data?.data as any);

    } catch (error) {
      console.error("Failed to fetch or merge users", error);
    }
  };

  const getCustomers = async (channel: string,page?: number,search?: string): Promise<any> => {
      page = page ?? 0;
      search = search ?? "";
  if (loadingCustomers || !hasMoreCustomers) return;
    setLoadingCustomers(true);
    try {
      const perPage = 10;
      // Fetch from /api/minuza-users (all users)
      let res
      let allUsers: any[] = [];
      if(channel === 'processed'){
         res =  await sendRequest({
          reqType: "post",
          url: `access/get-all-users`,
          data: { page: 1, per_page: perPage, roleId:Number(ROLE_USER) },
        });
        allUsers = res.data?.data || [];[]

      }
      if(channel === 'minuza'){
        res =  await sendRequest({
          reqType: "get",
          url: `minuza-users/customers`,
          data: { page, limit: perPage,search},
        });
         allUsers = res.data?.rows || [];

      }

         const noMoreAll = allUsers.length < perPage;
        if (noMoreAll) {
          setHasMoreCustomers(false);
        }

        // Only update full list if not called from AutoComplete
        if (!search) {
          setCustomers((prev) => [...prev, ...allUsers]);
          setCustomerPage((prev) => prev + 1);
        }

        return { data: allUsers }; 
    } catch (error) {
      console.error("Failed to fetch or merge users", error);
    }finally {
      setLoadingCustomers(false);
    }
  };

  const handleOpenDetails = (route: any,channel:any) => {
    getTicketAccess({
      id: route.data.id,
    },channel);
    setSelectedTicket(route.data);
    setChannel(channel);
    setShowModal(true);
  };

  const handleOpenUpdate = (route: any,channel:any) => {
    getTicketAccess({
      id: route.data.id,
    },channel);
    setSelectedTicket(route.data);
    setChannel(channel);
    setShowUpdateModal(true);
  };

  return (
    <div
      className="p-1"
      style={{
        background: "#fff",
        borderRadius: "8px",
        minHeight: "80vh",
      }}
    >
      {/* Force tab layout to behave correctly */}
      <style>
        {`
          .p-tabview-nav {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: nowrap;
          }
          .p-tabview .p-tabview-nav {
             border: none !important;
          }

          .p-tabview .p-tabview-nav li {
            margin-right: 0.5rem;
            list-style: none !important;
          }
          .p-tabview .p-tabview-nav li a {
            padding: 0.75rem 1.25rem;
            border-radius: 6px 6px 0 0;
            background-color: #e5e7eb;
            color: #374151;
            font-weight: 500;
            transition: background-color 0.2s ease-in-out;
          }

          .p-tabview .p-tabview-nav li.p-highlight a {
            background-color: #056434; /* active tab color */
            color: white;
          }
          .p-tabview .p-tabview-ink-bar {
            width: 0px !important;
            display: none !important; /* Optional if you want to fully hide */
          }

          .p-tabview .p-tabview-nav li a {
            padding: 0.75rem 1.5rem;
          }

          .p-tabview .p-tabview-panels {
            padding-top: 1rem;
          }
            
        `}
      </style>

      <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
        <TabPanel header="Tickets">
          <TicketTable
            tickets={tickets}
            users={users}
            categories={categories}
            customers={customers}
            getCustomers={getCustomers}
            customerPage={customerPage}
            hasMoreCustomers={hasMoreCustomers}
            onOpenDetails={handleOpenDetails}
            onOpenUpdate={handleOpenUpdate}
            loadingCustomers={loadingCustomers}
            channel="processed"
            filterValues={filterValues}
            setFilterValues={setFilterValues}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage} 
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        </TabPanel>

        <TabPanel header="Minuza Tickets">
          <TicketTable
            tickets={ticketsInRoute}
            users={users}
            categories={categories}
            customers={customers}
            getCustomers={getCustomers}
            customerPage={customerPage}
            hasMoreCustomers={hasMoreCustomers}
            onOpenDetails={handleOpenDetails}
            onOpenUpdate={handleOpenUpdate}
            loadingCustomers={loadingCustomers}
            channel="minuza"
            filterValues={filterValues}
            setFilterValues={setFilterValues}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        </TabPanel>
      </TabView>

      <TicketDialog
        visible={showModal}
        onHide={() => setShowModal(false)}
        ticket={selectedTicket}
        users={users}
        categories={categories}
        ticketsInRoute={ticketsInRoute}
        customers={customers}
        channel={channel}
      />

      <TicketUpdateDialog
        visible={showUpdateModal}
        onHide={() => setShowUpdateModal(false)}
        ticket={selectedTicket}
        users={users}
        categories={categories}
        customers={customers}
        ticketsInRoute={ticketsInRoute}
        channel={channel}
      />
    </div>
  );
}
