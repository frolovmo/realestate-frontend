import { Button } from "primereact/button";
import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from "primereact/toast";
import { InputTextarea } from 'primereact/inputtextarea';

import { sendRequestAtom } from './../../atoms';


interface Ticket {
    id: number;
    createdBy: number;
    assigneeId: number;
    subject: string;
    description: string | null;
    ticket: string | null;
    attachment: string | null;
    isCompleted: boolean;
    isClosed: boolean;
    createdAt: string;
    updatedAt: string;
    status: string | null;
    priority: string | null;
    ticketId: string;
    productId: string;
    attachmentName: string;
    dateAssigned: string | null;
    dateCompleted: string | null;
    timeDifference: string;
  }

export function TicketUpdateForm({ticketsInRoute ,products ,users, categories,onHide,customers,channel}:any) {
  const [checked, setChecked] = useState<boolean>();
  const [isClosed, setIsClosed] = useState<boolean>();
  const [selectedStatus, setSelectedStatus] = useState();
  const [selectedPriority, setSelectedPriority] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [createdBy, setSelectedCreatedBy] = useState();
  const [attachmentName, setAttachmentName] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [comment, setComment] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [createdByName, setCreatedByName] = useState("Loading...");
  const [resolvedUsers, setResolvedUsers] = useState<Record<string, any>>({});
  


  const [ticket, setTicket] = useState<Ticket | null>(null);

    const toast = useRef<Toast>(null);
    const [, sendRequest] = useAtom(sendRequestAtom);

    useEffect(() => {
      if (ticketsInRoute) {
        setTicket(ticketsInRoute);
        setSelectedUser(ticketsInRoute.assigneeId);
        setSelectedCreatedBy(ticketsInRoute?.createdBy);
        setSelectedStatus(ticketsInRoute?.status ?? (ticketsInRoute?.ticketStatus === "Pending"
          ? 1
          : ticketsInRoute?.ticketStatus === "Completed"
          ? 2
          : ticketsInRoute?.ticketStatus === "Assigned"
          ? 3
          : ''));
        setSelectedPriority(ticketsInRoute.priority ?? (ticketsInRoute?.assignments?.[0]?.priority === "Low"
          ? 1
          : ticketsInRoute?.assignments?.[0]?.priority === "Medium"
          ? 2
          : ticketsInRoute?.assignments?.[0]?.priority === "High"
          ? 3
          : ''));
        setChecked(ticketsInRoute.isCompleted);
        setIsClosed(ticketsInRoute.isClosed);
        setSelectedProduct(ticketsInRoute.productId || 1);
        setSelectedCategory(ticketsInRoute.category?.id);
        setSelectedSubject(ticketsInRoute.subject)
      }

    }, [ticketsInRoute]);

    const handleProductChange = (e:any) => {
      const selectedProductValue = e.value;
      setSelectedProduct(selectedProductValue);
      setSelectedSubject(null);
    };

    const subjectOptions = categories
                        .filter((category:any) => category.parentCategoryId !== null)
                        .map((category:any) => ({
                        label: category.name,
                        value: category.id
    }));

    const checkSubProductById = (subjectId: any) => {
        if (!subjectId) {
          return "subject not found";
        }
        const parsedId = parseInt(subjectId, 10);

        if (isNaN(parsedId) || parsedId.toString() !== subjectId.toString()) {
          // Return the raw value if not a clean integer
          return subjectId;
        }     
        const subject = subjectOptions.find((p:any) => p.value === parsedId);

        return subject ? `${subject.label}` : "Product not found";
  
    };

    const statuses = [
        { label: "Open", value: 1 },
        { label: "Closed", value: 2 },
        { label: "In Progress", value: 3 },
    ];
     const priorities =[
        { label: "Low", value: 1 },
        { label: "Medium", value: 2 },
        { label: "High", value: 3 },
        { label: "Critical", value: 4 },
     ]
     const productOptions = categories
                    .filter((category:any) => category.parentCategoryId === null)
                    .map((category:any) => ({
                      label: category.name,
                      value: category.id
                    }));


    const getChangedFields = (payload:any) => {
        const changedFields: Partial<Ticket> = {};
    
         for (const key in payload) {
            const newValue = payload[key as keyof Ticket]; // New value from payload
            const oldValue = ticketsInRoute[key as keyof Ticket]; // Old value from ticketsInRoute
        
            if (newValue !== oldValue && newValue !== "" && newValue !== null && newValue !== undefined) {
                changedFields[key as keyof Ticket] = newValue;
            }
          }
    
        return changedFields;
      };
      const resolveUser = async (userId: string | number) => {
        if (!userId) return;

        // If user already exists in resolvedUsers, don't fetch again
        if (resolvedUsers[userId]) return;

        const res = await sendRequest({
            reqType: "get",
            url: `profile/individual/${userId}`,
        });

        const fallbackUser = res?.data;
        const localUser = ticketsInRoute?.creator?.beneficiary?.Customer_name
            ? ticketsInRoute.creator.beneficiary
            : fallbackUser;

        setResolvedUsers((prev) => ({
            ...prev,
            [userId]: localUser,
        }));
      };

      useEffect(() => {
        const assignerId = ticketsInRoute?.assignments?.[0]?.assignerId;
        const createdBy = ticketsInRoute?.createdBy;

        if (assignerId) resolveUser(assignerId);
        if (createdBy) resolveUser(createdBy);
      }, [ticketsInRoute]);

    const checkCustomer = (customerId: any) => {
        const user = resolvedUsers[customerId];

        if (!user) return "Unknown user";
        const name = (user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : null) || user.Customer_name || user.email || "Unknown";
        return name
    };

   const user = users?.find((user:any) => user.id === selectedUser);

    const updateTicket = async (e: React.FormEvent): Promise<void> => {
      e.preventDefault();

      const updatedTicket = {
        id: ticketsInRoute.id,
        assigneeId: selectedUser,
        productId: selectedProduct,
        subject: selectedSubject || '',
        description:ticketsInRoute.description || '',
        attachment: uploadedFile || '',
        attachmentName: attachmentName || '',
        status: selectedStatus,
        priority: selectedPriority,
        isCompleted: checked,
        isClosed: isClosed,
        updatedAt: new Date().toISOString(),
        dateAssigned: ticketsInRoute.dateAssigned,
        dateCompleted: ticketsInRoute.dateCompleted,
        timeDifference: ticketsInRoute.timeDifference,
        comment: comment ? comment :  '',
        category: selectedCategory ? selectedCategory : '',
      };
      const changedFields = getChangedFields(updatedTicket);
      const updatedFields = {
        ...changedFields,
        ...(changedFields.assigneeId && {
          assigneeId: {
            userId: selectedUser,
            fullname: user.fullname,
            email: user.email
          }
        })
      };      
      
      try {

        let res;  
          if (channel === 'processed') {
              res = await sendRequest({
                    reqType: "patch",
                    url: `tickets/update/${ticketsInRoute.id}`,
                    data: {id: ticketsInRoute.id, ...updatedFields} ,
                  });
          }
          if (channel === 'minuza') {
            res = await sendRequest({
                      reqType: "patch",
                      url: `minuza-tickets/update/${ticketsInRoute.id}`,
                      data: {id: ticketsInRoute.id, ...updatedFields} ,
                    });
          }

      if (res.statusCode == 200) {
        e.preventDefault();

            toast?.current?.show({
                severity: "success",
                summary: "Success",
                detail: "Ticket has been updated successfully",
                life: 3000000,
              });
              onHide(); 
        }
      } catch (error) {
        console.error("Error updating ticket:", error);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Error updating the ticket",
          life: 3000,
        }); 
      }

    };
  
    return (
      <div>
      <Toast ref={toast} />
        <form onSubmit={updateTicket} className="ticket-update-form pt-3">
            <div className="form-grid">
                <div className="label-column">
                <div className="text-xl text-black-700">Created By:</div>
                </div>
                <div className="input-column">
                <InputText
                disabled
                    id="createdBy"
                    placeholder="Created by"
                    value={checkCustomer(ticketsInRoute?.createdBy)}
                    className=" w-full md:w-18rem p-valid text-xl"
                />
                </div>

                <div className="label-column">
                <div className="text-xl text-black-700">Assignee:</div>
                </div>
                <div className="input-column">
                  <Dropdown
                      filter
                      value={selectedUser}
                      onChange={(e) => setSelectedUser(e.value)}
                      options={users?.map((user:any) => ({
                        label: user.fullname ?? user.email, // Display name in the dropdown
                        value: user.id,   // Unique identifier
                      }))}
                      optionLabel="label"   // The property to display
                      placeholder="Select assignee"
                      className="w-full md:w-18rem"
                      checkmark={true}
                      highlightOnSelect={false}
                  />
                </div>
                <div className="label-column">
                <div className="text-xl text-black-700">Product:</div>
                </div>
                <div className="input-column">
                  <Dropdown
                    disabled
                    value={selectedProduct}
                    onChange={handleProductChange}
                    options={productOptions}
                    optionLabel="label"   // The property to display
                    placeholder="Select Product"
                    className="w-full md:w-18rem"
                    checkmark={true}
                    highlightOnSelect={false}
                  />
                  
                </div>
                <div className="label-column">
                <div className="text-xl text-black-700">Subject:</div>
                </div>
                <div className="input-column">
                  <InputText disabled id="subject" placeholder="Add subject" value={checkSubProductById(ticket?.subject)} className="w-full md:w-[40rem] h-12 text-lg" />
                </div>

                <div className="label-column">
                <div className="text-xl text-black-700">Description:</div>
                </div>
                <div className="input-column">
                <InputTextarea
                disabled
                    id="description"
                    placeholder="Description"
                    value={ticket?.description ?? ticket?.ticket ?? ""}
                    rows={6}
                    className="p-valid w-full md:w-[30rem]"
                />
                </div>
                
                <div className="label-column">
                <div className="text-xl text-black-700">Status:</div>
                </div>
                <div className="input-column">
                <Dropdown
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.value)}
                    options={statuses}
                    optionLabel="label"
                    placeholder="Select status"
                    className="w-full md:w-14rem"
                    checkmark={true}
                    highlightOnSelect={false}
                />
                </div>

                <div className="label-column">
                <div className="text-xl text-black-700">Priority:</div>
                </div>
                <div className="input-column">
                <Dropdown
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.value)}
                    options={priorities}
                    optionLabel="label"
                    placeholder="Select priority"
                    className="w-full md:w-14rem"
                    checkmark={true}
                    highlightOnSelect={false}
                />
                </div>
                <div className="label-column">
                <div className="text-xl text-black-700">Comment:</div>
                </div>
                <div className="input-column">
                  <InputTextarea
                    id="comment"
                    placeholder="Enter your comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="comment-input"
                  />
                </div>

                <div className="button-row">
                <Button type="submit" label="Update Ticket" severity="warning" className="btn-submit p-2"/>
                    
                </div> 
            </div>
            <style>
                {` 
                    .comment-input {
                      width: 100%;
                      padding: 0.5rem;
                      font-size: 1rem;
                      border: 1px solid #ccc;
                      border-radius: 5px;
                    }
                    .ticket-update-form .form-grid {
                    display: grid;
                    grid-template-columns: 1fr 2fr; /* Two columns: labels (1fr) and inputs (2fr) */
                    gap: 1rem; /* Space between rows and columns */
                    align-items: center; /* Vertically align labels and inputs */
                    }

                    .label-column {
                    text-align: right; /* Align labels to the right */
                    padding-right: 1rem; /* Add some spacing to the right of the label */
                    }

                    .input-column {
                    text-align: left; /* Align inputs to the left */
                    }

                    .button-row {
                    grid-column: span 2; /* Make the button span both columns */
                    text-align: center; /* Center-align the button */
                    margin-top: 1rem; /* Add spacing above the button */
                    }
                    
                `}
            </style>
        </form>
      </div>
    );
}
export default TicketUpdateForm;
