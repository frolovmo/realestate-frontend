import React, { useState, useRef ,useEffect} from 'react';
import { Avatar } from 'primereact/avatar';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useAtom } from "jotai";
import { Toast } from "primereact/toast";
import { statusMap } from '../../utils/filter';
import { sendRequestAtom } from './../../atoms';
import { Badge } from 'primereact/badge';


interface TicketNode {
  key: string;
  data: {
    status: number;
    createdAt: string;
    [key: string]: any; // Allow additional properties if needed
  };
  children: any[];
}

const TicketCard = ({ tickets, categories, users, setTickets, channel,customers}: any ) => {

    const [, sendRequest] = useAtom(sendRequestAtom); // Hook inside the component
    const toast = useRef<Toast>(null);
  
    const updateTicket = async (data: any ,status:any) => {
      const updatedTicket = { status: status };
  
      try {
        const res = await sendRequest({
          reqType: "patch",
          url: `tickets/update/${data}`,
          data: { id: data, ...updatedTicket },
        });

        if (res.statusCode === 200) {
          toast?.current?.show({
            severity: "success",
            summary: "Success",
            detail: "Ticket has been updated successfully",
          });

          const updatedtickets = tickets.map((node: any) => 
            node.data.id === data ? { ...node, data: { ...node.data, ...updatedTicket } } : node
          );
          setTickets(updatedtickets);
        }
      } catch (error) {
        console.error("Error updating ticket:", error);
        alert("Failed to update the ticket.");
      }
    };
    const normalizeStatus = (statusStr: string | undefined): number | null => {
      if (!statusStr) return null;
      const normalized = statusStr.toLowerCase();
      switch (normalized) {
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

    const subjectOptions = categories
                            .filter((category:any) => category.parentCategoryId !== null)
                            .map((category:any) => ({
                            label: category.name,
                            value: category.id
    }));

    const subjectMapping = subjectOptions.reduce((acc:any, { label, value }:any) => {
        acc[value] = label;
        return acc;
      }, {});

  const [ticketStatus, setTicketStatus] = useState<Record<string, TicketNode[]>>({
    open: tickets.filter((node: any) => node.data.status === 1 || normalizeStatus(node.data.ticketStatus) === 1),
    inProgress: [],
    closed: [],
    overdue: [],
  });

  useEffect(() => {
    const computeTickets = () => {

      return {
        open: tickets.filter((node: any) => node.data.status === 1 || normalizeStatus(node.data.ticketStatus) === 1),
        inProgress: tickets.filter((node: any) => node.data.status === 3 || normalizeStatus(node.data.ticketStatus) === 3),
        closed: tickets.filter((node: any) => node.data.status === 2 || normalizeStatus(node.data.ticketStatus) === 2),
        overdue: tickets.filter((node: any) => {
          const currentDate = new Date();
          const createdAtDate = new Date(node.data.createdAt);
        
          const diffInMilliseconds = currentDate.getTime() - createdAtDate.getTime();
          const diffInDays = Math.floor(diffInMilliseconds / (1000 * 3600 * 24));
          return (
            (node.data.status !== 2 && normalizeStatus(node.data.ticketStatus) !== 2 )&& diffInDays > 3 // Compare with the threshold date
          );
        }),
      };
    };

    setTicketStatus(computeTickets());
  }, [tickets]);

    function createInitials(name: string) {
      if (!name) return '';
      
      // If it's an email, extract the part before "@"
      const isEmail = name.includes('@');
      const cleanName = isEmail ? name.split('@')[0] : name;
    
      // If it's an email and there's no dot in the local part, return only the first letter
      if (isEmail && !cleanName.includes('.')) {
        return cleanName[0].toUpperCase();
      }
    
      // Otherwise split by space or dot
      const parts = cleanName.split(/[\s.]+/).filter(part => part.length > 0);
    
      if (parts.length === 0) return '';
      if (parts.length === 1) return parts[0][0].toUpperCase();
    
      const first = parts[0][0] || '';
      const last = parts[parts.length - 1][0] || '';
    
      return `${first.toUpperCase()}${last.toUpperCase()}`;
    }

    const checkUserById = (userId: any) => {
      const user = users?.find((u:any) => u.id === userId);
      if (!user) return <Avatar icon="pi pi-user" size="large" shape="circle" />

      return (
          <div className="flex items-center space-x-2">
          <Avatar size="large" shape="circle" label={createInitials(user.fullname || user.email ||"")} />
        </div>
      )
    };

    const checkCustomer = (rowData: any) => {
      const customerId = rowData?.data?.createdBy;
      const localUser = rowData?.data?.creator || customers?.find((u: any) => u.id === customerId);
      const [fetchedUser, setFetchedUser] = React.useState<any>(null);

      React.useEffect(() => {
        const fetchMissingUser = async () => {
          if (!localUser && customerId) {
            try {
              const response = await sendRequest({
                reqType: "get",
                url: `profile/individual/${customerId}`,
              });
              setFetchedUser(response.data);
            } catch (error) {
              console.error("Failed to fetch missing user", error);
            }
          }
        };
    
        fetchMissingUser();
      }, [customerId, localUser]);
    
      const creator = localUser || fetchedUser;
      if (!creator) return <span className="text-black-500">Unknown user</span>;
  
    };


  // Handles drag event
  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // If dropped outside a droppable area, do nothing
    if (!destination || destination.droppableId ==="overdue" || destination.droppableId === source.droppableId) return;

    const sourceList: any[] = [...ticketStatus[source.droppableId]];
    const destinationList:any[] = [...ticketStatus[destination.droppableId]];

    // Remove item from source and add to destination
    const [movedItem] = sourceList.splice(source.index, 1);
    destinationList.splice(destination.index, 0, movedItem);
    updateTicket(movedItem.data.id , statusMap(destination.droppableId))

    setTicketStatus((prev) => ({
      ...prev,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destinationList,
    }));

  };

  const productOptions = categories
                .filter((category:any) => category.parentCategoryId === null)
                .map((category:any) => ({
                  label: category.name,
                  value: category.id
                }));

  const productMapping = productOptions.reduce((acc:any, { label, value }:any) => {
    acc[value] = label;
    return acc;
  }, {});

  const truncateDescription = (description:any, wordLimit = 100) => {
    if (!description) return ''; // Return an empty string if no description
  
    const words = description.split(' '); // Split the description into words
    const truncatedText = words.slice(0, wordLimit).join(' '); // Limit to first 'wordLimit' words
  
    // Add '...' if the description has more than 'wordLimit' words
    return words.length > wordLimit ? `${truncatedText}...` : truncatedText;
  };

  const renderTicket = (ticket: any, index: number, columnId: string) => (
    
    <Draggable key={`${ticket.data.id}-${columnId}`}  draggableId={`${ticket.data.id}-${columnId}`} index={index}>
      {(provided) => (
        <div
          className="card cursor-pointer"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            padding: '1rem',
            marginTop: '1rem',
            marginBottom: '1rem',
            borderLeft: columnId === 'open'
                        ? '5px solid #FFD403'
                        : columnId === 'closed'
                        ? '5px solid #548C1C' // Tailwind cyan-400
                        : columnId === 'inProgress'
                        ? '5px solid #8EC100' // Tailwind orange-400
                        : '5px solid #f87171', 
          }}
        >
          <div className="p-0">
            <div className="flex flex-wrap align-items-center justify-content-between gap-2 p-2">
              <div className="align-items-center">
                <span className="font-bold">{subjectMapping[ticket.data.subject] || ticket.data.subject}</span>
                <p>{truncateDescription(ticket.data.description, 30)}</p>
                <div>
                {ticket?.data?.productId && productMapping[ticket?.data?.productId]? (
                  <Badge
                    value={productMapping[ticket?.data?.productId]}
                  >
                  </Badge>
                ) : null} 
                   <Badge className="m-1" value={ticket?.data?.source === 0 || ticket?.data?.source == null || channel ==="minuza"?"web" : "mobile"} ></Badge>
                

                </div>
              </div>
            </div>
            <div className="flex align-items-center justify-content-between mt-3">

            {checkUserById(ticket.data.assigneeId)}
              <p>{new Date(ticket.data.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );

  const renderColumn = (columnId: string, title: string) => (

    <Droppable droppableId={columnId}>
      {(provided) => (

        <div
          className="col"
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            backgroundColor: '#F5F9FF',
            padding: '1rem',
            borderRadius: '0.5rem',
            minHeight: '300px',
          }}
        >
          <div className="font-bold border-bottom-2 py-2 border-gray-300 flex align-items-center justify-content-between">
            {title}
            <p className="text-xl font-bold text-gray-700 cursor-pointer">+</p>

          </div>
          {ticketStatus[columnId].map((ticket: any, index: number) =>
            renderTicket(ticket, index,  columnId)
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );

  return (
    <div className='w-full'>
        <DragDropContext onDragEnd={onDragEnd}>
        <div
            className="grid p-2 "
            style={{
              display: 'flex',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '1rem',
              
              justifyContent:'space-around',
            }}
        >
            {renderColumn('open', 'Open')}
            {renderColumn('inProgress', 'In Progress')}
            {renderColumn('closed', 'Closed')}
            {renderColumn('overdue', 'Overdue')}
        </div>
        </DragDropContext>
        <Toast ref={toast} />
    </div>
  );
};

export default TicketCard;
