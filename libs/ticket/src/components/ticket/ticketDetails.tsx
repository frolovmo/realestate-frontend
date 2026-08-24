
import React from 'react';
import { Avatar } from 'primereact/avatar';
import { useAtom } from "jotai";
import PriorityTag from './priorityTags';
import StatusTag from './statusTag';
import { Badge } from 'primereact/badge';
import { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputTextarea } from 'primereact/inputtextarea';
import { sendRequestAtom } from './../../atoms';
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import dynamic from 'next/dynamic';



const PdfPreview = dynamic(() => import('./PdfPreview'), {
    ssr: false,
});


  interface TabItem {
    label: string;
    ariaLabel: string;
    badge:number
  }


export function TicketDetails({ ticketsInRoute ,users, categories,customers,assignments,channel}:any) {
    const [activeTab, setActiveTab] = useState("Comments");
    const [comment, setComment] = useState<string>("");
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(false); // Track loading state
    const [ticketData, setTicketData] = useState<any>(null); // Handle initial undefined state
    const [imageSrc, setImageSrc] = useState('');
    const [creator, setCreator] = useState<any>(null);
    const [role, setRole] = useState('');
    const [resolvedUsers, setResolvedUsers] = useState<Record<string, any>>({});


    const [, sendRequest] = useAtom(sendRequestAtom);
    const toast = useRef<Toast>(null);

    const fetchTicketData = async (ticketsInRoute: any) => {
        try {
            setLoading(true); // Show loading state while fetching
           let res;
           if (channel === 'processed') {
               res = await sendRequest({
                reqType: "get",
                url: `tickets/${ticketsInRoute?.id}`,
                data: {},   
              });
           }
            if (channel === 'minuza') {
               res = await sendRequest({
                reqType: "get",
                url: `minuza-tickets/${ticketsInRoute?.id}`,
                data: {},   
              });
           }

          if (res.statusCode === 200) {
            setTicketData(res.data); // Only update if the fetched ticket is the current one
          }
        } catch (error) {
            setLoading(false);  
            console.error("Error fetching ticket data:", error);
        }finally {
            setLoading(false); // Hide loading state
        }
    };

    const tabs: TabItem[] = [
        { label: "Comments", ariaLabel: "Comments", badge: ticketsInRoute?.comments?.length},
        { label: "Activities", ariaLabel: "Activities", badge: ticketsInRoute?.assignments?.length },
        { label: "Attachments", ariaLabel: "Attachments", badge: ticketsInRoute?.attachment 
                                                                ? Array.isArray(ticketsInRoute.attachment)
                                                                ? ticketsInRoute.attachment.length
                                                                : 1: 0},
    ];
 const statusBodyTemplate = () => {  
    return (
      <div>
        <div className="flex items-center space-x-2">
          <StatusTag status={ticketsInRoute?.ticketStatus === "Pending"
              ? 1
              : ticketsInRoute?.ticketStatus === "Completed"
              ? 2
              : ticketsInRoute?.ticketStatus === "Assigned"
              ? 3 :ticketsInRoute?.status} />
        </div>
      </div>
    );
  };

  function renderAttachment(item: any, index: number, channel: string) {
    const mimeTypeMap: Record<string, string> = {
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        gif: 'image/gif',
        webp: 'image/webp',
        pdf: 'application/pdf',
        mp4: 'video/mp4',
        webm: 'video/webm',
        ogg: 'video/ogg',
    };

        function bufferToUrl(bufferObj: { type: string; data: number[] }, mimeType: string): string {
            const byteArray = new Uint8Array(bufferObj.data);
            const blob = new Blob([byteArray], { type: mimeType });
            return URL.createObjectURL(blob);
        }

        let url = "";
        let fileExtension = "";
        let mimeType = "application/octet-stream";

        if (channel === "minuza") {
            if (item?.type === "Buffer" && Array.isArray(item.data)) {
            const extension = item.extension || 'png';
            mimeType = mimeTypeMap[extension] || mimeType;
            url = bufferToUrl(item, mimeType);
            fileExtension = extension;
            }
        } else if (channel === "processed") {
            url = typeof item === "object" ? item[0] : item;
            fileExtension = url?.split('.').pop()?.toLowerCase() || '';
        }

        const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension || '');
        const isVideo = ['mp4', 'webm', 'ogg'].includes(fileExtension || '');
        const isPDF = fileExtension === 'pdf';

        return (
            <div key={index} style={{ display: "inline-block", margin: "10px", textAlign: "center" }}>
            <a href={url} target="_blank" rel="noopener noreferrer">
                {isImage ? (
                <img
                    src={url}
                    alt={`attachment-${index}`}
                    style={{ width: "100px", height: "100px", objectFit: "cover", marginBottom: "5px" }}
                />
                ) : isVideo ? (
                <video width="100" height="100" controls style={{ display: "block", marginBottom: "5px" }}>
                    <source src={url} type={`video/${fileExtension}`} />
                    Your browser does not support the video tag.
                </video>
                ) : isPDF ? (
                <PdfPreview url={url} />
                ) : (
                <div style={{
                    width: "100px",
                    height: "100px",
                    border: "1px solid #ccc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "5px",
                    fontSize: "12px"
                }}>
                    <span>Unknown File</span>
                </div>
                )}
            </a>
            </div>
        );
    }

    
    const priorityBodyTemplate = (priority: any) => {
    return(
        <PriorityTag
            priority={priority}
        />
    )
    };

    const formatName = (fullname: string) => {
    if (!fullname) return "";
    
    const nameParts = fullname.trim().split(" ");
    
      return fullname;
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
      function createInitials(name: string): string {
        if (!name) return '';
        // If it's an email, extract the part before "@"
        const isEmail = name && name.includes('@');
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
        if (!user) return <span className="text-black-500">Not yet assigned</span>;
        const hasRole = user.RolesAssignments?.some((assignment: any) => assignment.roleId !== 3);

        return (
            <div className="flex items-center space-x-2">
            <Avatar size="large" shape="circle" label={createInitials(user.fullname || user.email|| "")} />
            <span className="text-lg p-2 text-black-500"> {user.fullname || user.email}</span>
          </div>
        )
    };


    const resolveUser = async (userId: string | number, fallbackUser?: any) => {
        if (!userId) return;

        if (resolvedUsers[userId]) return;

        const res = await sendRequest({
            reqType: "get",
            url: `profile/individual/${userId}`,
        });
        const userData = res?.data;
        const finalUser = userData ?? fallbackUser;

        if (finalUser) {
            setResolvedUsers((prev) => ({
                ...prev,
                [userId]: finalUser,
            }));
        }
    };

    useEffect(() => {
        if (!ticketsInRoute) return;
        const assignerId = ticketsInRoute.assignments?.[0]?.assignerId;
        const createdBy = ticketsInRoute.createdBy;
        const fallbackCreator = ticketsInRoute.creator?.beneficiary;

        const commentUserIds: string[] = ticketsInRoute.comments
        ?.map((comment:any) => comment?.createdBy)
        .filter((id:any): id is string => Boolean(id)) || [];

        const uniqueUserIds = new Set<string>([assignerId, createdBy, ...commentUserIds]);

        uniqueUserIds.forEach((userId) => {
            if (!userId) return;
            if (userId === createdBy) {
                resolveUser(userId, fallbackCreator);
            } else {
                resolveUser(userId);
            }
        });
    }, [ticketsInRoute]);


    const checkCustomer = (customerId: any) => {
        const user = resolvedUsers[customerId];

        if (!user) return "Unknown user";

        const name = (user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : null)|| user.Customer_name || user.email || "Unknown";
        return (
            <div className="flex items-center space-x-2">
            <Avatar
                size="large"
                shape="circle"
                label={createInitials(name)}
                className="p-3"
            />
            <span className="text-lg p-2 text-black-700">{formatName(name)}</span>
            </div>
        );
    };
    

    const CommentUser = ({ userId }: { userId: string }) => {
        const user = users?.find((u: any) => u.id === userId);

        if (user) {
            return (
            <div className="flex items-center space-x-2">
                <Avatar size="large" shape="circle" label={createInitials((user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : null)||user.fullname || user.email || "")} />
                <span className="text-lg p-2 text-black-500">{(user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : null)||user.fullname || user.email}</span>
            </div>
            );
        }

        return <CommentCustomer customerId={userId} />;
    };

    const CommentCustomer = ({ customerId }: { customerId: string }) => {
        const creator = resolvedUsers[customerId];

        if (!creator) return <span className="text-black-500">Unknown user</span>;

        return (
            <div className="flex items-center space-x-2">
                <Avatar
                    size="large"
                    shape="circle"
                    label={createInitials((creator.firstName && creator.lastName ? `${creator.firstName} ${creator.lastName}` : null)||creator.fullname || creator.Customer_name || "")}
                    className="p-3"
                />
                <span className="text-lg p-2 text-black-700">
                    {formatName((creator.firstName && creator.lastName ? `${creator.firstName} ${creator.lastName}` : null)|| creator.fullname) || creator.Customer_name}
                </span>
            </div>
        );
    };

    function formatDaysAgo(dateString:any) {
        const currentDate:any = new Date();
        const pastDate:any = new Date(dateString);
        
        const diffTime = currentDate - pastDate;  // Time difference in milliseconds
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));  // Convert to days
        
        if (diffDays === 0) {
            const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
            const diffMinutes = Math.floor(diffTime / (1000 * 60));
            
            if (diffHours > 0) return `${diffHours} hour(s) ago`;
            if (diffMinutes > 0) return `${diffMinutes} minute(s) ago`;
            return `Just now`;
        }
        
        return `${diffDays} day(s) ago`;
    }


    const  formatDate = (date: any) => {
        if (!date) return "Invalid Date";
          const parsedDate = typeof date === "string" ? new Date(date) : date;
      
        if (isNaN(parsedDate.getTime())) {
          return "Invalid Date";
        }
      
        return parsedDate.toLocaleString();
    }
      
    const nodes = ticketsInRoute?.assignments?.map((assignment:any) => {
        const customer = ticketsInRoute?.creator?.beneficiary?.Customer_name;
        return {
          id: assignment.id,
          activity: assignment.comment ?? assignment?.category?.name,
          initiator: customer ? customer: checkUserById(ticketsInRoute?.createdBy),
          date: formatDate(assignment.createdAt),
          status: statusBodyTemplate(),
        };
      });

      const updateTicket = async (data: any): Promise<void> => {
        const updatedTicket = {
          comment: comment ? comment :  '',
        };     
        
        try {
          let res;  
          if (channel === 'processed') {
           res = await sendRequest({
                reqType: "patch",
                url: `tickets/update/${ticketsInRoute.id}`,
                data: {id: ticketsInRoute.id, ...updatedTicket} ,
            });
          }
          if (channel === 'minuza') {
                res = await sendRequest({
                reqType: "patch",
                url: `minuza-tickets/update/${ticketsInRoute.id}`,
                data: {id: ticketsInRoute.id, ...updatedTicket} ,
            });
          }
  
        if (res.statusCode == 200) {
            await fetchTicketData(ticketsInRoute); 

              toast?.current?.show({
                  severity: "success",
                  summary: "Success",
                  detail: "Comment sent",
                  life: 3000,
                });
                setComment(""); // Clear the comment input
          }
        } catch (error) {
          console.error("Error updating ticket:", error);
          alert("Failed to update the ticket.");
        }
  
      }; 

    
    return (
        
        <div>
            <Toast ref={toast} />
            <div className="flex flex-wrap align-items-center justify-content-between pb-4 pt-2">
                <span className="text-2xl text-900 font-bold "> Ticket Info</span>
                <div className="ticket-detail flex items-center space-x-2" style={{ fontSize: "1.5rem" }}>
                   <strong style={{ color: "#8bc341", fontWeight: "bold", fontSize: "1.5rem" }}>Status:</strong>
                    <span>{statusBodyTemplate() || "No status"}</span>
                </div>                
            </div>
            <div  className="flex flex-column bg-blue-50 p-0 ">
                <div className="ticket-detail p-2">
                    <div className="text-xl text-gray-700" style={{ display: "block" }}>Customer:</div> 
                    <div className="text-black-700">{checkCustomer(ticketsInRoute?.createdBy)}</div>

                </div>
                <div className="ticket-detail p-2">
                    <div className="text-xl text-gray-700" style={{ display: "block" }}>Ticket subject:</div> 
                    <div className="text-xl text-black-900">{subjectMapping[ticketsInRoute?.subject] || ticketsInRoute?.subject} </div>
                </div>
                <div className="ticket-detail p-2">
                    <div className="text-xl text-gray-700" style={{ display: "block" }}>Ticket description:</div> 
                    <div className="text-xl text-black-700">{ticketsInRoute?.description || ticketsInRoute?.ticket}</div>
                </div>
                <div className="ticket-detail p-2">
                    <div className="text-xl text-gray-700" style={{ display: "block" }}>Date created:</div> 
                    <div className="text-xl text-black-700">{new Date(ticketsInRoute?.createdAt).toLocaleString() }</div>
                </div>

                <div className="ticket-detail p-2">
                    <div className="text-xl text-gray-700" style={{ display: "block" }}>Priority:</div> 
                    <div className="text-xl text-black-700">{ticketsInRoute?.priority ? priorityBodyTemplate(ticketsInRoute?.priority) : ticketsInRoute?.assignments?.[0]?.priority}</div>
                </div>

                <div className="ticket-detail p-2">
                    <div className="text-xl text-gray-700" style={{ display: "block" }}>Category:</div> 
                    <div className="text-xl text-black-700">{productMapping[ticketsInRoute?.productId]} <Badge className="mt-1" value={ticketsInRoute?.source === 0 || ticketsInRoute?.source == null || channel ==="minuza" ? "web" : "mobile"} ></Badge></div>
                </div>

                <div className="ticket-detail p-2">
                    <div className="text-xl text-gray-700" style={{ display: "block" }}>Assignee:</div> 
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>{checkUserById(ticketsInRoute?.assigneeId)} 
                    </div>
                </div>

                <div className="ticket-detail p-2">
                    <div className="text-xl text-gray-700" style={{ display: "block" }}>Initiator:</div> 
                    <div className="text-black-700">{checkCustomer(ticketsInRoute?.assignments?.[0]?.assignerId ?? ticketsInRoute?.createdBy)}</div>

                </div>
            </div>
            <div className="card py-2 px-0 border-green-700 justify-content-end">
                <div className="p-tabmenu p-component" data-pc-name="tabmenu" data-pc-section="root">
                    <ul className="p-tabmenu-nav flex justify-start md:justify-center space-x-6 pb-2 list-none" role="menubar" data-pc-section="menu">
                        {tabs.map((tab, index) => (
                            <li
                                key={index}
                                className={`p-tabmenuitem text-xl text-gray-700 ${
                                activeTab === tab.label ? "p-highlight" : ""
                                }`}
                                role="presentation"
                                data-p-highlight={activeTab === tab.label}
                                data-p-disabled="false"
                                data-pc-section="menuitem"
                            >
                                <a
                                role="menuitem"
                                aria-label={tab.ariaLabel}
                                tabIndex={activeTab === tab.label ? 0 : -1}
                                className="p-menuitem-link cursor-pointer"
                                style={{fontWeight:"100"}}
                                data-pc-section="action"
                                onClick={() => setActiveTab(tab.label)}
                                >
                                <span className="p-menuitem-text p-1" data-pc-section="label">
                                    {tab.label}
                                </span>
                                
                                <Badge value={tab.badge} ></Badge>
                                <span
                                    role="presentation"
                                    aria-hidden="true"
                                    className="p-ink"
                                    data-pc-name="ripple"
                                    data-pc-section="root"
                                    style={{
                                    height: `${100 - index * 10}px`,
                                    width: `${100 - index * 10}px`,
                                    }}
                                ></span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div  className="flex flex-column bg-blue-50 p-0 ">
            {loading ? (
            <div className="flex justify-center items-center h-32">
                <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem', color: '#007bff' }}></i>
                <span className="ml-2 text-lg font-semibold"></span>
            </div>
            ) : (
            <>
            <div>
            {activeTab === "Comments" && (
                    <div>

                        {(ticketData?.comments?.length > 0 || ticketsInRoute?.comments?.length > 0) ? (ticketData?.comments?.length > 0 ? ticketData.comments : ticketsInRoute.comments).map((comment: any, index: any) => (
                            <div key={index} style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "10px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <div className="text-xl">
                                        <div className="font-bold flex items-center gap-2">
                                            <CommentUser userId={comment.createdBy} />
                                            <span style={{ fontSize: "13px", marginTop:"13px",marginLeft:"10px", fontWeight: "normal", color: "#6b7280" }}>
                                                {formatDaysAgo(comment.createdAt) || "No date provided"}
                                            </span>
                                        </div>
                                        <div style={{ marginLeft:"50px", fontSize: "15px", lineHeight: "1.5" }}>
                                            {comment.comment || "No comment provided"}
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) :  (
                            <p>No comments available</p>
                        )}
                            <div className="p-4 border rounded-lg shadow-md w-96">
                                {/* File Upload Section */}


                                {/* Comment Section */}
                                <div>
                                    <label className="block font-bold mb-2">Add a Comment</label>
                                    <InputTextarea
                                    className="w-full p-2 border rounded-md"
                                    rows={3}
                                    placeholder="Write your comment here..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    />
                                    <div className="button-row">
                                    <Button type="submit" onClick={updateTicket} label="Send" loading={loading} className="btn-submit p-2"/>
                                    </div> 
                                </div>
                            </div>
                    </div>
                    
                )}

                {activeTab === "Activities" && (
                    <div>
                        <div className="flex flex-column p-2 mb-3">
                            <DataTable value={nodes} tableStyle={{ minWidth: "65rem" }} rows={5} rowsPerPageOptions={[5]} >
                                <Column field="activity" header={<span style={{ fontSize: '15px', fontWeight: 'bold' }}>Activity</span>}></Column>
                                <Column field="initiator" header={<span style={{ fontSize: '15px', fontWeight: 'bold' }}>Initiator</span>}></Column>
                                <Column field="status" header={<span style={{ fontSize: '15px', fontWeight: 'bold' }}>Status</span>} body={statusBodyTemplate()}></Column>
                                <Column field="date" header={<span style={{ fontSize: '15px', fontWeight: 'bold' }}>Date</span>}></Column>
                            </DataTable>
                        </div>
                    </div>
                )}

 

            {activeTab === "Attachments" && (
                    ticketsInRoute?.attachment ? (
                        Array.isArray(ticketsInRoute.attachment) ? (
                        ticketsInRoute.attachment.length > 0 ? (
                            ticketsInRoute.attachment.map((item: any, index: number) => {
                            return renderAttachment(item, index, channel);
                            })
                        ) : (
                            <p style={{ color: 'gray', fontStyle: 'italic' }}>No attachments available</p>
                        )
                        ) : (
                        <div style={{ display: "inline-block", margin: "10px", textAlign: "center" }}>
                            {renderAttachment(ticketsInRoute.attachment, 0, channel)}
                        </div>
                        )
                    ) : (
                        <p style={{ color: 'gray', fontStyle: 'italic' }}>No attachment available</p>
                    )
            )}
            </div>
            <style>
                {`
                    .p-tabmenu-nav {
                    border: none !important; /* Remove any borders */
                    }
                   
                `}
            </style>
                 </>
                )}  
        </div> 
    
        
    </div>
    
    );
}

export default TicketDetails;
