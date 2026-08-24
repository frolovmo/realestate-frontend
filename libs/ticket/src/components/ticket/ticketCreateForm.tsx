import { Button } from "primereact/button";
import { useRef, useState } from "react";
import { useAtom } from "jotai";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import axios from "axios";
import { FILE_STORAGE_API } from "../../lib/api";
import { AutoComplete,AutoCompleteCompleteEvent,AutoCompleteChangeEvent } from "primereact/autocomplete";


import { sendRequestAtom } from './../../atoms';

type Customer = {
  id: number;
  fullname?: string;
  Customer_name?: string;
  user?: { id: number };
};

interface CustomerSuggestion {
  label: string;
  value: string;
}

export function TicketCreateForm( {users, onHide, categories}:any ) {
   const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Stores actual files
   const [uploadedFileUrls, setUploadedFileUrls] = useState<string[]>([]); // Stores file URLs after upload
   const [selectedProduct, setSelectedProduct] = useState(null);
   const [selectedSubject, setSelectedSubject] = useState(null);
   const [selectedUser, setSelectedUser] = useState();
   const [selectedAssignee, setSelectedAssignee] = useState();
   const [selectedStatus, setSelectedStatus] = useState();
   const [selectedPriority, setSelectedPriority] = useState();
   const [subjectValue, setSubject] = useState<string>('');
   const [descriptionValue, setDescription] = useState<string>('');
   const [errors, setErrors] = useState<{ subject?: string; description?: string }>({});
   const subjectRef = useRef<HTMLInputElement | null>(null);
   const descriptionRef = useRef<HTMLInputElement | null>(null);
   const productRef = useRef<HTMLDivElement | null>(null);
    const toast = useRef<Toast>(null);
    const [, sendRequest] = useAtom(sendRequestAtom);
    const [items, setItems] = useState<CustomerSuggestion[]>([]);
    const [value, setValue] = useState<{ label: string; value: string } | null>(null);
    const [customers, setCustomers] = useState<Customer[]>([]); // State to store customers
    const [hasMoreCustomers, setHasMoreCustomers] = useState(true);
    const [loadingCustomers, setLoadingCustomers] = useState(false);

    const onSelect = (e: { files: File[] }) => {
      if (e.files && e.files.length > 0) {
        setSelectedFiles(e.files); // Store selected files in state
      }
    };

    const onClear = (e: any) => {
      setSelectedFiles((prevFiles) =>
        prevFiles.filter((file) => file !== e.file)
      ); 
    };

    const statuses = [
      { label: "Open", value: 1 },
      { label: "In Progress", value: 3 },
  ];
   const priorities =[
      { label: "Low", value: 1 },
      { label: "Medium", value: 2 },
      { label: "High", value: 3 },
      { label: "Critical", value: 4 },
   ]

     const getCustomers = async (page?: number,search?: string): Promise<any> => {
         page = page ?? 0;
         search = search ?? "";
     if (loadingCustomers || !hasMoreCustomers) return;
       setLoadingCustomers(true);
       try {
         const perPage = 10;
         // Fetch from /api/minuza-users (all users)
         let res
         let allUsers: any[] = [];
            res =  await sendRequest({
             reqType: "post",
             url: `access/get-all-users`,
             data: { page: 1, per_page: perPage, search},
           });
           allUsers = res.data?.data || [];[]
   
          setCustomers((prev) => [...prev, ...allUsers]);
   
          return { data: allUsers }; 
       } catch (error) {
         console.error("Failed to fetch or merge users", error);
       }finally {
         setLoadingCustomers(false);
       }
     };
   
     const search = async(event: AutoCompleteCompleteEvent) => {
       const beneficiaries = await getCustomers( 0, event.query);
       const suggestions:CustomerSuggestion[] = (beneficiaries?.data || []).map((user: any) => {
         const id = user.id || user.user?.id || user.user_id || user.National_ID;
         const label = user.fullname || user.Customer_name || "Unnamed Customer";
         return { label, value: String(id) };
       });
       setItems(suggestions);
     }
 
   const handleFileUpload = async () => {
    try {
        if (selectedFiles.length === 0) return;

        const MAX_TOTAL_SIZE = 10 * 1024 * 1024; // 10MB
        let totalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0);
    
        if (totalSize > MAX_TOTAL_SIZE) {
          toast.current?.show({
            severity: "error",
            summary: "Validation Error",
            detail: "Total file size should not exceed 10MB.",
            life: 3000,
          });
          return;
        }

        const url = `${FILE_STORAGE_API}/file-management/upload`;

        const formData = new FormData();
        selectedFiles.forEach((file) => formData.append("files", file));
        formData.append('path', "crm/tickets"); // Subject field
        const authHeader = "Basic " + btoa(`${process.env.NEXT_PUBLIC_BASIC_AUTH_USERNAME}:${process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD}`);
    
        const response = await axios.post(url, formData, {
          headers: { "Content-Type": "multipart/form-data" ,"Authorization": authHeader },
          
        });

    
        if (response.data?.urls && Array.isArray(response.data.urls)) {

          setUploadedFileUrls(response.data.urls); 
          setSelectedFiles([]); 

          return response.data.urls; 
        } else {
          throw new Error("File URLs not returned from server.");
        }
      } catch (error) {
        console.error("Error uploading files:", error);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Error uploading files. Please try again.",
          life: 3000,
        });
      }
    };

    
    const subjectOptionsMapping: Record<number, { label: string; value: string }[]> = {};

    categories.forEach((category:any) => {
      const parentId = category.parentCategoryId;
    
      if (parentId !== null) {
        if (!subjectOptionsMapping[parentId]) {
          subjectOptionsMapping[parentId] = [];
        }
    
        subjectOptionsMapping[parentId].push({
          label: category.name,
          value: category.name.toLowerCase() === "other" ? "other" : category.name
        });
      }
    });
    const handleProductChange = (e:any) => {
      const selectedProductValue = e.value;
      setSelectedProduct(selectedProductValue);
      setSelectedSubject(null);
    };
  
    const handleSubjectChange = (e:any) => {
      setSelectedSubject(e.value);

    };
  
    const createTicket = async (e: React.FormEvent) =>{
      e.preventDefault();
      const subject = (selectedSubject === "other"|| selectedProduct === 4 || selectedProduct === 7 || selectedProduct === 10) ? subjectValue : selectedSubject;      
      const description = descriptionValue;

      let newErrors: { subject?: string; description?: string } = {};
      let firstErrorField: HTMLElement | null = null;

      if (!subject) {
        newErrors.subject = "Subject is required";
        if (!firstErrorField && productRef.current) {
          firstErrorField = productRef.current;
        }
      }

      if (!description) {
        newErrors.description = "Description is required";
        if (!firstErrorField && descriptionRef.current) {
          firstErrorField = descriptionRef.current;
        }
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        
        if (firstErrorField) {
          firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
          firstErrorField.focus();
        }

        return;
      }

      const assigneeObject = users?.find((user: any) => user.id == selectedAssignee)
      const assignee = assigneeObject
      ? {
          userId: assigneeObject.id,
          fullname: assigneeObject.fullname,
          email: assigneeObject.email
        }
      : null;

      const formData = new FormData();
      formData.append('createdBy', selectedUser || '');
      formData.append('status', selectedStatus || '');
      formData.append('priority', selectedPriority || '');
      formData.append('subject', subject || ''); // Subject field
      formData.append('description', description || ''); // Description field
      formData.append('productId', selectedProduct || '');
      if (assignee) {
        formData.append('assigneeId', JSON.stringify(assignee));
      }  
      let uploadedUrls = [];

      if (selectedFiles.length > 0) { 
        uploadedUrls = await handleFileUpload();
      }

      if (uploadedUrls.length > 0) {
        formData.append("attachment", JSON.stringify(uploadedUrls)); // Append multiple file URLs
      }

      
      try {
        const res = await sendRequest({
          reqType: "post",
          url: `tickets/create`,
          data: formData ,

        });

        if (res.statusCode == 200) {
          e.preventDefault();

            toast.current?.show({
                severity: "success",
                summary: "Success",
                detail: "Ticket has been created successfully",
                life: 300000000,
              });
             onHide(); 
        }
        
      } catch (error) {
        console.error("Error updating ticket:", error);

        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Error creating a ticket",
          life: 3000,
        });      
      }
    };
    
    return (
      <div className="ticket-container">
        <Toast ref={toast} />

        <form onSubmit={createTicket} className="ticket-update-form pt-3">
              <h3 className="form-section-title">Ticket Info</h3>

              <div className="form-group">
              <label htmlFor="subject">Created for</label>
                <AutoComplete
                  value={value}
                  field="label"
                  suggestions={items}
                  completeMethod={search}
                  onChange={(e: AutoCompleteChangeEvent) => {
                    setValue(e.value);          // for search box internal value (optional)
                    setSelectedUser(e.value?.value ?? null); 
                  }}
                  placeholder="Search customer"
                  style={{ width: '125px' }}
                  autoHighlight
                  forceSelection
                />
              </div>    
              <div className="form-group" ref={productRef}>
                <label htmlFor="subject">Product</label>
                <Dropdown
                    value={selectedProduct}
                    onChange={handleProductChange}
                    options={categories?.filter((cat: any) => cat.parentCategoryId === null)
                      ?.map((cat: any) => ({
                      label: cat.name,  // Adjust if your category object has a different structure
                      value: cat.id,
                    }))}
                    optionLabel="label"   // The property to display
                    placeholder="Select Product"
                    className={`w-full md:w-14rem ${errors.subject ? 'p-invalid' : ''}`}  // Highlight if subject is missing
                  />              
                </div>


              <div className="form-group">
                
                {selectedProduct && (selectedProduct !== 7 && selectedProduct !== 10 && selectedProduct !== 4)  && subjectOptionsMapping[selectedProduct] ? (
                  <div>
                   <label htmlFor="subject" className="required-label">
                    Ticket subject <span className="text-red-500">*</span>
                  </label>                  
                  <Dropdown
                    value={selectedSubject}
                    onChange={handleSubjectChange}
                    options={categories?.filter((cat: any) => cat.parentCategoryId === selectedProduct)
                      ?.map((cat: any) => ({
                      label: cat.name,  // Adjust if your category object has a different structure
                      value: cat.id,
                    }))}                   
                    optionLabel="label"
                    placeholder="Select Subject"
                    className="w-full md:w-14rem"
                  />
                  </div>
                ) : null}
                {(selectedSubject === 'other' || selectedProduct === 7 || selectedProduct === 10 ||selectedProduct === 4) && (
                  <div>
                 <label className="mt-2 required-label" htmlFor="subject">
                  Other subject <span className="text-red-500">*</span>
                </label>                  
                    <InputText
                      id="subject"
                      ref={subjectRef}
                      value={subjectValue}
                      placeholder="Add subject"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubject(e.target.value)}
                      className="input-field mt-2"
                    />
                  </div>
                  
                 )}
                {errors.subject && <small className="text-red-500">{errors.subject}</small>}
              </div>

              <div className="form-group">
              <label htmlFor="description" className="required-label">
                Ticket description <span className="text-red-500">*</span>
              </label>                
                <InputText
                  id="description"
                  ref={descriptionRef}
                  value={descriptionValue}
                  placeholder="Add description"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                  className={`description-input ${errors.description ? 'p-invalid' : ''}`}
                />                
                {errors.description && <small className="text-red-500">{errors.description}</small>}

              </div>

              <div className="form-group">
              <label htmlFor="subject">Status</label>
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

                <div className="form-group">
                <label htmlFor="subject">Priority</label>
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
                <div className="form-group">
                <label htmlFor="subject">Assignee</label>
                <Dropdown
                      filter
                      value={selectedAssignee}
                      onChange={(e) => setSelectedAssignee(e.value)}
                      options={users
                        ?.map((user:any) => ({
                          label:  user.fullname 
                          ? `${user.fullname} (${user.phone || "No Phone"})` 
                          : user.email, // Display name in the dropdown
                        value: user.id,   // Unique identifier
                      }))}
                      optionLabel="label"   // The property to display
                      placeholder="Select assignee"
                      className="w-full md:w-18rem"
                      checkmark={true}
                      highlightOnSelect={false}
                  />
              </div>
              <div className="form-group">
              <label>
                Attachment <span className="optional-text">(Optional - 10MBs Max)</span>
              </label>
              <FileUpload
                mode="advanced"
                name="file"
                maxFileSize={10 * 1024 * 1024} // 10MB
                onSelect={onSelect}
                onRemove={(event) => {
                  onClear(event);
                }}                
                multiple
                customUpload
                chooseLabel="Choose"
              />
            </div>
                <div className="button-row">
                <Button type="submit" label="Create" severity="warning" className="btn-submit p-2"/>
                    
                </div>
            <style>
                {`  .ticket-container {
                      max-width: 600px;
                      margin: 0 auto;
                      font-family: Arial, sans-serif;
                      background: #fff;
                      padding: 2rem;
                      border-radius: 10px;
                    }
                    .form-group {
                      margin-bottom: 1.5rem;
                    }

                    .form-group label {
                      font-weight: bold;
                      display: block;
                      margin-bottom: 0.5rem;
                      color: #333;
                    }
                    .form-group {
                      margin-bottom: 1.5rem;
                    }

                    .form-group label {
                      font-weight: bold;
                      display: block;
                      margin-bottom: 0.5rem;
                      color: #333;
                    }

                    .description-input {
                      height: 100px;
                      width: 100%;

                    }

                    .optional-text {
                      font-size: 0.9rem;
                      color: #888;
                      font-weight: normal;
                    }

                    .button-container {
                      text-align: center;
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

                    /* Hide the default Upload and Cancel buttons */
                    .p-fileupload-buttonbar button.p-button {
                      display: none;
                    }

                    /* Ensure the Choose button stays visible */
                    .p-fileupload-buttonbar .p-fileupload-choose {
                      display: inline-block;
                    }
                `}
            </style>
        </form>
      </div>
    );
}
export default TicketCreateForm;
