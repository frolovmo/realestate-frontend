import { TreeTable } from 'primereact/treetable';
import { Column } from "primereact/column";
import { Dropdown } from 'primereact/dropdown';
import { getFilterOptions } from '../../utils/filter';
import React, { useState,useEffect } from 'react';
import PriorityTag from "./priorityTags";
import StatusTag from "./statusTag";
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { Nullable } from "primereact/ts-helpers";
import { AutoComplete,AutoCompleteCompleteEvent,AutoCompleteChangeEvent } from "primereact/autocomplete";
import { sendRequestAtom } from './../../atoms';
import { useAtom } from "jotai";


type Customer = {
  id: number;
  fullname?: string;
  Customer_name?: string;
  user?: { id: number };
};

interface TreeTableProps {
    tickets: any;
    columns: any;
    categories: any;
    users: any;
    customers: any;
    getCustomers: (System_data: string,page?: number, search?: string) => Promise<void>;
    customerPage: number;
    hasMoreCustomers: boolean;
    handleFilterChange: (e: any, field: string) => Promise<void>;
    filterValues: any;
    loadingCustomers: boolean;
    channel: string;
    setFilterValues:any;
    currentPage: number;
    setCurrentPage: any;
}

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

const normalizePriority = (priority: string | undefined)  => {
  if (!priority) return null;
  switch (priority) {
    case  "Low":
      return 1
    case "Medium":
      return 2
    case "High":
      return 3
    case "Critical":
      return 4
  }
};
  const statusBodyTemplate = (rowData: any) => {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const createdAtDate = new Date(rowData.data.createdAt);
    const status = Number(rowData.data.status ?? normalizeStatus(rowData.data.ticketStatus));

    const isOverdue = status !== 2 && createdAtDate < threeDaysAgo;
  
    return (
      <div>
        <div className="flex items-center space-x-2">
          <StatusTag status={rowData.data.status} />
          {isOverdue && (
                <Badge value="overdue" severity="warning"></Badge>
              )}            
        </div>
      </div>
    );
  };  

  const priorityBodyTemplate = (rowData: any) => {
    const priority = rowData.data?.priority;

    // Fallback: check assignments array for the first non-null priority
    const fallbackPriority = rowData.data?.assignments ?.slice() .reverse()?.find(
      (assignment: any) => assignment.priority !== null && assignment.priority !== undefined
    )?.priority;

    return priority ? (
      <PriorityTag priority={priority} />
    ) : fallbackPriority ? <PriorityTag priority={normalizePriority(fallbackPriority)} /> 
     : (
      'Not set'
    );
  };
 

  const  formatDate = (rowData: any) => {
    if (!rowData?.data?.createdAt) return "Invalid Date";
      const parsedDate = typeof rowData.data.createdAt === "string" ? new Date(rowData.data.createdAt) : rowData.data.createdAt;
  
    if (isNaN(parsedDate.getTime())) {
      return "Invalid Date";
    }
  
    return parsedDate.toLocaleString();
  }

interface CustomerSuggestion {
  label: string;
  value: string;
}


export const TreeTableComponent : React.FC<TreeTableProps> = ({ tickets, columns, categories, users,
  handleFilterChange, filterValues, channel}) => {  
  const [dates, setDates] = useState<Nullable<(Date | null)[]>>(null);
  const [items, setItems] = useState<CustomerSuggestion[]>([]);
  const [value, setValue] = useState<{ label: string; value: string } | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]); // State to store customers
  const [hasMoreCustomers, setHasMoreCustomers] = useState(true);
  const [loadingCustomers, setLoadingCustomers] = useState(false);
  const [, sendRequest] = useAtom(sendRequestAtom);
      

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
          data: { page: 1, per_page: perPage, search},
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
       setCustomers((prev) => [...prev, ...allUsers]);

       return { data: allUsers }; 
    } catch (error) {
      console.error("Failed to fetch or merge users", error);
    }finally {
      setLoadingCustomers(false);
    }
  };

  const search = async(event: AutoCompleteCompleteEvent) => {
    const beneficiaries = await getCustomers(channel, 0, event.query);
    const suggestions:CustomerSuggestion[] = (beneficiaries?.data || []).map((user: any) => {
      const id = user.id || user.user?.id || user.user_id || user.National_ID;
      const label = user.fullname || user.Customer_name || "Unnamed Customer";
      return { label, value: String(id) };
    });
    setItems(suggestions);
  }

  const resetFilters = async() => {
    const newFilterValues = Object.fromEntries(
      Object.keys(filterValues).map((key) => [key, undefined])
    );
    await handleFilterChange({ value: newFilterValues }, "all");
    
  };
  useEffect(() => {
    getCustomers(channel,0,"");
    if (filterValues?.createdAt) {
      setDates(filterValues.createdAt);
    }
  }, [filterValues?.createdAt]); 

  const productOptions = categories
                ?.filter((category:any) => category.parentCategoryId === null)
                .map((category:any) => ({
                  label: category.name,
                  value: category.id
                }));

  const subjectOptions = categories
                ?.filter((category:any) => category.parentCategoryId !== null)
                .map((category:any) => ({
                  label: category.name,
                  value: category.id
                }));

  const checkProductById = (rowData: any) => {
        const productId = rowData?.data?.productId;
        if (!productId) {
          return "Product not found";
        }
        const product = productOptions.find((p:any) => p.value === productId);

        return product ? `${product.label}` : "Product not found";
  
    };

    const checkSubProductById = (rowData: any) => {
        const subjectId = rowData?.data?.subject;
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
    function createInitials(name: string): string {
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


      const checkUserById = (rowData: any) => {
        const userId = rowData?.data?.assigneeId;
        
        const user = users?.find((u:any) => u.id === userId);
        if (!user) return <span className="text-black-500">Not yet assigned</span>;

        return (
          <div className="flex items-center space-x-2">
          <Avatar size="large" shape="circle" label={createInitials(user.fullname || user.email || "")} className='p-3'/>
          <span className="text-lg p-2 text-black-700">{formatName(user.fullname) || user.email}</span>
        </div>
        )

      };


      const checkCustomer = (rowData: any) => {
        const customerId = rowData?.data?.createdBy;
        const customer = rowData?.data?.creator?.beneficiary;
        const localUser = customer || customers?.find((u: any) => u.id === customerId);
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
        return (
          <div>
            <div className="flex items-center space-x-2">
              <Avatar
                size="large"
                shape="circle"
                label={createInitials((creator.firstName && creator.lastName ? `${creator.firstName} ${creator.lastName}` : null)|| creator?.fullname || creator?.Customer_name || "")}
                className="p-3"
              />
              
              <span className="text-lg p-2 text-black-700">
                {(creator.firstName && creator.lastName ? `${creator.firstName} ${creator.lastName}` : null)||creator?.fullname || creator?.Customer_name}
                <div style={{ color: '#8EC100' }}>({creator?.identificationNumber || creator?.National_ID})</div>
              </span>
            </div>
            <Badge
              value={rowData?.data?.source === 0 || rowData?.data?.source == null || channel === "minuza"? "web" : "mobile"}
            />
            
        </div>
        
        )

      };


      const formatName = (fullname: string) => {
        if (!fullname) return "";
      
        const nameParts = fullname.trim().split(" ");
        const firstName = nameParts[0];
        const lastInitial = nameParts.length > 1 ? nameParts[1][0] + "." : "";
      
        return `${firstName} ${lastInitial}`.trim();
      };
    return (
    <div className="w-full overflow-auto">
    <TreeTable
        value={tickets}
        selectionMode="checkbox"
        tableStyle={{ minWidth: "50rem" }}
        className='w-full'
        scrollHeight='flex'
        
    >
        <Column selectionMode="multiple"  />
        {columns.map((col: any, key: number): any => {
          const body = col.value === "status"
          ? statusBodyTemplate
          : col.value === "priority"
          ? priorityBodyTemplate 
          : col.value === "createdAt"
          ? formatDate
          : col.value === "productId"
          ? checkProductById
          : col.value === "subject"
          ? checkSubProductById
          : col.value === "assigneeId"
          ? checkUserById
          : col.value === "createdBy" 
          ? checkCustomer
          : col.body;
          
          return(
            <Column
                key={key}
                field={col.value}
                header={<span className="text-xl font-bold">{col.title}</span>} 
                body={body}
                sortable
                filter={ col.value !== "subject"}
                className="w-full overflow-x-auto" // Hide on small screens
                filterElement={
                    col.value === "status" || col.value === "priority" ? (
                        <Dropdown
                          value={filterValues[col.value]}
                          options={getFilterOptions(col.value)}
                          onChange={(e) => handleFilterChange(e, col.value)}
                          placeholder={`${col.title.toLowerCase()}`}
                          className="p-column-filter w-full "
                          style={{border: "1px solid green",width:"150px"}}
                          showClear
                        />
                      ) : col.value === "productId" ? (
                        <Dropdown
                          value={filterValues[col.value]}
                          options={productOptions}
                          onChange={(e) => handleFilterChange(e, col.value)}
                          placeholder="product"
                          className="w-full "
                          style={{border: "1px solid green",width:"150px"}}
                          showClear
                        /> 
                      ) : col.value === "assigneeId" ? (
                        <Dropdown
                          value={filterValues[col.value]}
                          options={users
                            ?.map((user:any) => ({
                            label: user.fullname ?? user.email, 
                            value: user.id
                          }))}
                          onChange={(e) => handleFilterChange(e, col.value)}
                          placeholder="assignee"
                          className="p-column-filter w-full"
                          style={{border: "1px solid green",width:"150px"}}
                          showClear
                          filter
                        />
                      ) : col.value === "createdAt" ? (
                        <Calendar 
                            value={dates} 
                            onChange={(e) => {
                                setDates(e.value); 
                                if (Array.isArray(e.value) && e.value[0] && e.value[1]) {
                                handleFilterChange({ value: e.value }, "createdAt");
                                }
                              }
                            } 
                            showIcon 
                            dateFormat="yy-mm-dd" 
                            placeholder="date" 
                            selectionMode="range" 
                            readOnlyInput 
                            hideOnRangeSelection 
                        />
                      )  : col.value === "path" ? (
                        <Button icon="pi pi-refresh" className='p-button' rounded aria-label="Clear" onClick={resetFilters}/>
                      ): col.value === "createdBy" ? (
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <AutoComplete
                            value={value}
                            field="label"
                            suggestions={items}
                            completeMethod={search}
                            onChange={(e:AutoCompleteChangeEvent) => setValue(e.value)}
                            placeholder="Search customer"
                            style={{ width: '125px' }}
                            autoHighlight
                            forceSelection
                          />
                          <Button
                            icon="pi pi-search"
                            onClick={() => {
                              if (value) {
                                  handleFilterChange({ value: value.value }, 'createdBy'); // send just the ID
                                } else {
                                  handleFilterChange({ value: null }, 'createdBy'); // clear filter if empty
                              }
                            }}
                            className="p-button-sm"
                          />
                        </div>

                      ) : null
                }
            />
          )
        })}

    </TreeTable>
    </div>
    )
};
export default TreeTableComponent;
