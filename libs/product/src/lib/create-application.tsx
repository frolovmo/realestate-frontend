"use client";
import React, { useEffect, useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { atom, types } from "@uno/utils";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputSwitch } from "primereact/inputswitch";
import { Fieldset } from "primereact/fieldset";
import { Checkbox } from "primereact/checkbox";
import { useAtom } from "jotai/react";
import { useRouter } from "next/navigation";
import { InputComponent } from "../../../ui/src/component/Input";

const { sendRequestAtom } = atom;

export function CreateApplication() {
  const router = useRouter();
  const [, sendRequest] = useAtom(sendRequestAtom);
  const toast = useRef<Toast>(null);

  const [formFields, setFormFields] = useState<any>([]);

  const [sectedInputId, setSelectedInputId] = useState<{
    [key: number]: string;
  }>({});
  const [selectinputValue, setSelectedinputValue] = useState<{
    [key: number]: string;
  }>({});
  const [fieldLabel, setFieldLabel] = useState<string>("");
  const [selectedFieldNames, setSelectedFieldNames] = useState<{
    [key: number]: string;
  }>({});

  const [selectedBundel, setSelectedBundel] = useState<number | null>(null);
  const [selectedBundeName, setSelectedBundelName] = useState<string>("");
  const [isBundelModalOpen, seIsBundelModalOpen] = useState<boolean>(false);
  const [selectGroupModal, setSelectGroupModal] = useState<boolean>(false);
  const [allBundles, setAllBundels] = useState<any>([]);
  const [allInputType, setAllInputType] = useState<any | null>([]);
  const [sendFormField, setSendFormField] = useState<any>([]);

  const [groupField, setGroup] = useState<any>([]);
  const [fieldOptions, setFieldOptions] = useState<{ [fieldId: number]: { label: string, value: string }[] }>({});

  const [enableDragCard, setEnableDragCard] = useState(false);
  const [addGroupField, setAddGroupField] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    getAllInputType();
  }, []);

  const showError = (error: string) => {
    if (toast && toast.current) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error,
        life: 3000,
      });
    }
  };

  useEffect(() => {
    setSendFormField(Object.values(groupField));
  }, [groupField]);

  const getAllBandles = async () => {
    const res = await sendRequest({
      reqType: "post",
      url: "products/bundles/all",
    });
    if (res && res.data) {
      setAllBundels(res.data.rows);
    } else {
      setAllBundels([]); // fallback to empty array to avoid undefined issues
      showError(res.message);
    }
  };

  const getAllInputType = async () => {
    const res = await sendRequest({
      reqType: "get",
      url: "forms/input/types",
    });
    if (Array.isArray(res.data)) {
      const formattedInputTypes = res.data.map((type: any) => ({
        name: type.label, // Displayed in dropdown
        value: type.type,
        id: type.id,
      }));

      setAllInputType(formattedInputTypes);

    } else {
      showError(res.message);
    }
  };
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleGroupField = (e: any) => {
    const { name, value } = e.target;
    setAddGroupField((prev: any) => ({
      ...prev,
      [name]: name === "priority" ? Number(value) : value,
    }));
  };

  const handleFieldInputChange = (e: any) => {
    const { name, value, type, checked } = e.target as any;
    const [index, field] = name.split("_");

    setGroup((prev: any) => {
      const existingGroup = prev[index] || {};

      return {
        ...prev,
        [index]: {
          ...existingGroup,
          [field]:
            type === "checkbox"
              ? checked
              : field === "priority"
                ? Number(value)
                : value,
        },
      };
    });
    
  };


  const onDragEnd = (result: any, index?: any) => {
    setFieldLabel("");
    if (!result.destination) return;
    const { source, destination } = result;
    // Check if the item was dropped into the "Form Builder" area

    if (
      source.droppableId === "allInputType" &&
      destination.droppableId === "formFields"
    ) {
      const draggedField = {
        ...allInputType[result.source.index],
        uid: `${Date.now()}-${Math.random()}` // unique identifier
      };
      setFormFields([...formFields, draggedField]);
    }
  };
  
  useEffect(() => {
    if (formFields.length > 0) {
      setSelectedInputId(formFields[formFields.length - 1].value);
      setSelectedinputValue(formFields[formFields.length - 1].value);
    }
  }, [formFields]);
  
  const handleRemoveItem = (index: number) => {
    
    setGroup((prevGroup: any) => {
      const groupArray = Array.isArray(prevGroup)
        ? prevGroup
        : Object.values(prevGroup);
      return groupArray.filter((_, i) => i !== index);
    });
    
    setFormFields((prevFields: any[]) => {
      const updated = prevFields.filter((_, i) => i !== index);
      const fieldId = prevFields[index].uid;
      setFieldOptions(prevOptions => {
        const { [fieldId]: _, ...rest } = prevOptions;
        return rest;
      });
    
      return updated;
    });
  };

  const submitFormFields = async () => {
    const finalPayload = {
      title: addGroupField.title,
      description: addGroupField.description,
      bundleId: selectedBundel,
      fields: sendFormField.map((field: any, index: number) => {
        const fieldId = formFields[index]?.uid
        const fieldType =formFields[index]?.value
        const shouldIncludeOptions = ['select', 'checkbox', 'radio'].includes(fieldType);
        
        return {
          ...field,
          label: field.label,
          name: field.name,
          type: fieldType,
          ...(shouldIncludeOptions && {
            options: fieldOptions[fieldId] || []
          })
        };
      })
    };

    const res = await sendRequest({
      reqType: "post",
      url: "forms",
      data: finalPayload,
    });

    if (res.statusCode < 400) {
      toast?.current?.show({
        severity: "success",
        summary: "Success",
        detail: `${res.message}`,
        life: 6000,
      });
      router.push("/uno-admin/product/applications/")
    } else {
      toast?.current?.show({
        severity: "error",
        summary: "denger",
        detail: `Error: ${res.message}`,
        life: 3000,
      });
    }
    await delay(2000);
    // }
  };

  const renderInput = (item: any, index: number) => {
    
    return (
      <div style={{ gap: "0.5rem", display: "flex", flexDirection: "column" }}>
        <h6>{item.name}</h6>
        <div
          className=""
          style={{
            gap: "0.7rem",
            display: "flex",
            justifyContent: "start",
            alignItems: 'center',
            marginLeft: "0.5rem",
          }}
        >
          <label htmlFor="name">Add Label: </label>
          <div className="gap-0 flex flex-column">
            <InputText
              name={index + "_label"}
              type="text"
              value={
                selectedFieldNames[index] ??
                sendFormField[index]?.label ??
                ""
              }
              onChange={handleFieldInputChange}
              placeholder="Label"
            />

          </div>
          <label htmlFor="name">Add Name: </label>
          <div className="gap-0 flex flex-column">
            <InputText
              name={index + "_name"}
              type="text"
              value={
                selectedFieldNames[index] ??
                sendFormField[index]?.name ??
                ""
              }
              onChange={handleFieldInputChange}
              placeholder="Name"
            />

          </div>

          <label htmlFor="name">Add placeholder: </label>
          <div className="gap-0 flex flex-column">
            <InputText
              name={index + "_placeholder"}
              type="text"
              value={
                selectedFieldNames[index] ??
                sendFormField[index]?.placeholder ??
                ""
              }
              onChange={handleFieldInputChange}
              placeholder="placeholder"
            />
          </div>
          <label htmlFor="required">required:</label>
          <InputSwitch
            name={index + "_isRequired"}
            checked={groupField[index]?.isRequired || false}
            onChange={(e) =>
              handleFieldInputChange({
                target: {
                  name: `${index}_isRequired`,
                  type: "checkbox",
                  checked: e.value ,
                },
              } as any)
            }
          />
          <Button
            icon="pi pi-trash"
            rounded
            severity="success"
            outlined
            aria-label="Bookmark"
            onClick={() => {
              handleRemoveItem(index);
            }}
          />
        </div>
      </div>
    );
  };

  const renderMultSelect = (item: any, index: number) => {
    const fieldId = item.uid;
    return (
      <div style={{ gap: "0.5rem", display: "flex", flexDirection: "column" }}>
        <h6>{item.name}</h6>
        <div
          style={{
            gap: "0.7rem",
            display: "flex",
            justifyContent: "start",
            marginLeft: "0.5rem",
          }}
        >
          <label htmlFor="name">Add Label: </label>
          <div className="gap-0 flex flex-column">
            <InputText
              name={index + "_label"}
              type="text"
              value={
                selectedFieldNames[index] ??
                sendFormField[index]?.label ??
                ""
              }
              onChange={handleFieldInputChange}
              placeholder="Label"
            />
          </div>
          <label htmlFor="name">Add Name: </label>
          <div className="gap-0 flex flex-column">
            <InputText
              name={index + "_name"}
              type="text"
              value={
                selectedFieldNames[index] ??
                sendFormField[index]?.name ??
                ""
              }
              onChange={handleFieldInputChange}
              placeholder="Name"
            />

          </div>
          <label htmlFor="name">Add placeholder: </label>
          <div className="gap-0 flex flex-column">
            <InputText
              name={index + "_placeholder"}
              type="text"
              value={
                selectedFieldNames[index] ??
                sendFormField[index]?.placeholder ??
                ""
              }
              onChange={handleFieldInputChange}
              placeholder="placeholder"
            />
          </div>
          <label htmlFor="required">required:</label>
          <InputSwitch
            name={index + "_isRequired"}
            checked={groupField[index]?.isRequired || false}
            onChange={(e) =>
              handleFieldInputChange({
                target: {
                  name: `${index}_isRequired`,
                  type: "checkbox",
                  checked: e.value,
                },
              } as any)
            }
          />
          <Button
            icon="pi pi-trash"
            rounded
            severity="success"
            outlined
            aria-label="Bookmark"
            onClick={() => {
              handleRemoveItem(index);
            }}
          />
        </div>
        <div style={{ marginLeft: "3rem", marginTop: "1rem" }}>
          <h6>Options</h6>
          {(fieldOptions[fieldId] || []).map((option, optIdx) => (
            <div key={optIdx} className="flex gap-2 mb-2">
              <InputText
                placeholder="Option Label"
                value={option.label}
                onChange={(e) => {
                  const newOptions = [...(fieldOptions[fieldId] || [])];
                  newOptions[optIdx].label = e.target.value;
                  setFieldOptions({ ...fieldOptions, [fieldId]: newOptions });
                }}
              />
              <InputText
                placeholder="Option Value"
                value={option.value}
                onChange={(e) => {
                  const newOptions = [...(fieldOptions[fieldId] || [])];
                  newOptions[optIdx].value = e.target.value;
                  setFieldOptions({ ...fieldOptions, [fieldId]: newOptions });
                }}
              />
            </div>
          ))}
          <Button
            icon="pi pi-plus"
            label="Add Option"
            text
            onClick={() => {
              const existing = fieldOptions[fieldId] || [];
              const newOptions = [...existing, { label: "", value: "" }];
              setFieldOptions({ ...fieldOptions, [fieldId]: newOptions });
            }}
          />
        </div>
      </div>
    );
  };

  const renderDragSpace = () => {
    return (
      <Droppable droppableId="formFields">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              flex: 1,
              minHeight: "100px",
              background: "#e8f5e9",
              padding: "1.6rem",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <h4 className="flex" style={{ gap: "1rem" }}>
              <i
                className="pi pi-align-justify"
                style={{
                  fontSize: "2rem",
                  color: "#198754",
                  fontWeight: "bold",
                }}
              ></i>
              {addGroupField.title}
            </h4>
            {formFields.length === 0 && (
              <p>Drag fields here to build the form.</p>
            )}
            {formFields.map((field: any, index: any) => (
              <Draggable
                key={`${field.id}-${index}`}
                draggableId={`${field.id}-${index}`}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      padding: "10px",
                      marginBottom: "10px",
                      background: "white",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      ...provided.draggableProps.style,
                    }}
                  >
                    {!["select", "radio", "checkbox"].includes(field.value)
                      ? renderInput(field, index)
                      : renderMultSelect(field, index)}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  };

  const renderFormReview = () => {
    return (
      <div className="">
        <Fieldset legend={`${addGroupField.title}`}>
          {sendFormField.map((field: any, index: any) => {
            const correspondingFormField = formFields[index];

            if (!correspondingFormField || !correspondingFormField.value) {
              return null;
            }
            const { uid, value: type } = correspondingFormField;
            const shouldHaveOptions = ['select', 'checkbox', 'radio'].includes(type);
            const fieldOptionList = shouldHaveOptions ? fieldOptions[uid] || [] : [];
            return (
              <InputComponent
                key={index}
                label={field.label}
                placeholder={field.placeholder}
                fieldType={type} // Correctly mapped input type
                isMandatory={field.isRequired}
                options={fieldOptionList.map(option => ({ name: option.label, priority: undefined }))}
              />
            );
          })}
        </Fieldset>
      </div>
    );
  };

  return (
    <div>
      <Toast ref={toast} />
      <div className="col-12 m-0 w-full px-0">
        <div className="card p-4 w-full">
          <h3 className="my-3 px-4">Create Application Form</h3>
          <DragDropContext onDragEnd={onDragEnd}>
            <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
              {/* Left Area - Available Fields */}
              <Droppable droppableId="allInputType" isDropDisabled={true}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      width: "200px",
                      minHeight: "300px",
                      background: "#f0f0f0",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                    }}
                  >
                    <h4>Available Fields</h4>
                    {allInputType.map((field: any, index: any) => (
                      <Draggable
                        key={field.id}
                        draggableId={String(field.id)}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              display: "flex",
                              padding: "10px",
                              marginBottom: "10px",
                              background: "white",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              justifyContent: "center",
                              // textAlign: "center",
                              ...provided.draggableProps.style,
                              gap: "1rem",
                            }}
                          >
                            {field.name}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              {/* Right Area - Form Builder */}

              {enableDragCard ? (
                renderDragSpace()
              ) : (
                <div>
                  <div
                    className="col-15 md:col-12 px-0 font-bold"
                    style={{ gap: "1rem", display: "flex", alignContent: "center" }}
                  >
                    <label htmlFor="title">Form Title:</label>
                    <InputText
                      type="text"
                      name="title"
                      className="w-70"
                      placeholder="Enter form title"
                      value={groupField.title}
                      onChange={handleGroupField}
                    />
                    <label htmlFor="description">Description:</label>
                    <InputText
                      name="description"
                      type="text"
                      value={groupField.description}
                      onChange={handleGroupField}
                      placeholder="Description"
                    />
                    <Button
                      label="Continue"
                      className="ml-4"
                      disabled={!addGroupField.title || !addGroupField.description}
                      onClick={() => {
                        setEnableDragCard(true);
                      }}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      height: "16rem",
                      // background: "#e8f5e9",
                      padding: "1.6rem",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "2rem",
                      marginTop: "2rem",
                    }}
                  >
                    Kindly create a form title before proceeding. 😊
                  </div>
                </div>
              )}
            </div>
          </DragDropContext>
          {formFields.length !== 0 && (
            <Button
              label="Create Form"
              className="w-2"
              onClick={() => setSelectGroupModal(true)}
            />
          )}
          {/* Modal Part  */}

          <Dialog
            header="Select the bundle to be assigned to this group?"
            visible={isBundelModalOpen}
            style={{ width: "50vw" }}
            onHide={() => {
              seIsBundelModalOpen(false);
            }}
          >
            <div className="flex align-items-center gap-5 ">
              <label htmlFor="name">Select Bundle </label>
              <Dropdown
                value={selectedBundeName}
                onChange={(e) => {
                  setSelectedBundel(e.value.id)
                  setSelectedBundelName(e.value.name)
                }}
                options={allBundles}
                optionLabel="name"
                editable
                placeholder="Select a Product"
                className="w-full md:w-14rem"
              />
              <Button
                label="Create"
                className="w-2"
                severity="success"
                disabled={!selectedBundel}
                onClick={() => {
                  submitFormFields();
                  seIsBundelModalOpen(false);
                }}
              />
            </div>

          </Dialog>

          <Dialog
            header="Are sure you want to create this form!"
            visible={selectGroupModal}
            style={{ width: "50vw" }}
            onHide={() => {
              if (!selectGroupModal) return;
              setSelectGroupModal(false);
            }}
          >
            {renderFormReview()}
            <div style={{ gap: "2rem", display: "flex", marginTop: "0.5rem" }}>
              <Button
                label="Continue"
                className="w-2"
                severity="success"
                onClick={() => {
                  setSelectGroupModal(false);
                  seIsBundelModalOpen(true);
                  getAllBandles();
                }}
              />
              <Button
                label="Cancel"
                className="w-2"
                severity="danger"
                onClick={() => {
                  setSelectGroupModal(false);
                }}
              />
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
