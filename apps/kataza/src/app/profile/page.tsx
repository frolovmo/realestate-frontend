"use client";
import { DashboardLayout as Dashboard } from "@uno/layout";
import { useAtom } from "jotai";
import { Avatar } from "primereact/avatar";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { useCallback, useEffect, useState } from "react";
// import { responseAtom, sendRequestAtom } from '@/src/atoms';
import { atom } from "@uno/utils";
import { Button } from "primereact/button";
import { Skeleton } from "primereact/skeleton";
import { Tag } from "primereact/tag";
import { Badge } from "primereact/badge";
const { responseAtom, sendRequestAtom } = atom;

// Define a TypeScript interface for customer data
interface Customer {
  firstName: string;
  lastName: string;
  occupation: string;
  employer: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  address: string;
}

const ProfileCreate = (): JSX.Element => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [, sendRequest] = useAtom(sendRequestAtom);
  const [response] = useAtom(responseAtom);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("personal");

  const getUserProfile = useCallback(async (): Promise<void> => {
    setLoading(true);
    const userId = localStorage.getItem("userId");
    if (userId) {
      await sendRequest({
        reqType: "get",
        url: `profile/individual/${userId}`,
      });
    }
    setLoading(false);
  }, [sendRequest]);

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  useEffect(() => {
    if (response?.data) {
      const { firstName, lastName } = response.data;
      localStorage.setItem("user", `${firstName} ${lastName}`);
      setCustomer(response.data);
    }
  }, [response]);

  const getMaritalStatusColor = (status: string | undefined) => {
    if (!status) return "info";
    switch (status.toLowerCase()) {
      case "married":
        return "success";
      case "single":
        return "info";
      case "divorced":
        return "warning";
      case "widowed":
        return "danger";
      default:
        return "info";
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Not provided";
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  const ProfileField = ({
    label,
    value,
    icon,
    type = "text",
  }: {
    label: string;
    value: string | undefined;
    icon?: string;
    type?: "text" | "email" | "phone" | "date" | "tag";
  }) => {
    const iconClass = icon ? `pi ${icon} mr-2 text-primary` : "";

    const displayValue = value || "Not provided";
    let valueElement;

    switch (type) {
      case "email":
        valueElement = value ? (
          <a href={`mailto:${value}`} className="text-primary hover:underline">
            {value}
          </a>
        ) : (
          "Not provided"
        );
        break;
      case "phone":
        valueElement = value ? (
          <a href={`tel:${value}`} className="text-primary hover:underline">
            {value}
          </a>
        ) : (
          "Not provided"
        );
        break;
      case "date":
        valueElement = formatDate(value);
        break;
      case "tag":
        valueElement = value ? (
          <Tag value={value} severity={getMaritalStatusColor(value)} />
        ) : (
          "Not provided"
        );
        break;
      default:
        valueElement = displayValue;
    }

    return (
      <div className="mb-4 p-3 border-round transition-colors transition-duration-150 hover:bg-gray-50">
        <div className="flex align-items-center mb-1">
          {icon && <i className={iconClass}></i>}
          <p className="text-sm text-gray-500 m-0">{label}</p>
        </div>
        <div className="text-base font-medium">{valueElement}</div>
      </div>
    );
  };

  const ProfileSkeleton = () => (
    <div className="w-full">
      <div className="flex flex-column md:flex-row gap-4 mb-4">
        <Skeleton shape="circle" size="5rem" className="mb-2" />
        <div className="flex-1">
          <Skeleton width="75%" height="2rem" className="mb-2" />
          <Skeleton width="50%" height="1.5rem" className="mb-2" />
        </div>
      </div>
      <Divider />
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="mb-3">
          <Skeleton width="30%" height="1rem" className="mb-2" />
          <Skeleton width="70%" height="1.5rem" />
        </div>
      ))}
    </div>
  );

  const TabButton = ({
    id,
    label,
    active,
    icon,
    count,
  }: {
    id: string;
    label: string;
    active: boolean;
    icon: string;
    count?: number;
  }) => (
    <div
      className={`
        tab-button
        cursor-pointer
        flex align-items-center
        px-4 py-3
        border-bottom-2
        transition-all transition-duration-200
        ${
          active ? "border-primary" : "border-transparent hover:border-gray-300"
        }
      `}
      onClick={() => setActiveTab(id)}
      style={{
        position: "relative",
      }}
    >
      <div
        className={`
          mr-2 
          flex align-items-center justify-content-center
          border-circle
          ${active ? "bg-primary text-white" : "bg-gray-100 text-gray-600"}
        `}
        style={{
          width: "36px",
          height: "36px",
          transition: "all 0.2s",
        }}
      >
        <i className={`pi ${icon}`} style={{ fontSize: "1rem" }}></i>
      </div>

      <div className="flex flex-column">
        <span className={`font-medium ${active ? "text-900" : "text-700"}`}>
          {label}
        </span>
        {count !== undefined && (
          <span className="text-xs text-500 mt-1">{count} items</span>
        )}
      </div>

      {active && (
        <div
          className="absolute bottom-0 left-0 w-full"
          style={{
            height: "2px",
            background: "var(--primary-color)",
            boxShadow: "0 0 6px var(--primary-color)",
          }}
        />
      )}
    </div>
  );

  return (
      <div className="p-4 md:p-6">
        <div className="flex justify-content-between align-items-center mb-4">
          <h1 className="text-2xl font-bold m-0">My Profile</h1>
          {!loading && customer && (
            <Button
              label="Edit Profile"
              icon="pi pi-pencil"
              className="p-button-outlined"
            />
          )}
        </div>

        {loading || !customer ? (
          <Card className="shadow-md">
            <ProfileSkeleton />
          </Card>
        ) : (
          <>
            <Card className="shadow-md mb-4 overflow-hidden">
              <div className="relative">
                {/* Profile header with background */}
                <div
                  className="absolute top-0 left-0 w-full h-32 bg-primary opacity-10"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-lighten) 100%)",
                  }}
                ></div>

                <div className="relative pt-4 px-4">
                  <div className="flex flex-column md:flex-row items-center md:items-start gap-4 mb-4">
                    <Avatar
                      icon="pi pi-user"
                      size="xlarge"
                      style={{
                        backgroundColor: "#2196F3",
                        color: "#ffffff",
                        width: "6rem",
                        height: "6rem",
                        border: "4px solid white",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                      }}
                      shape="circle"
                    />
                    <div className="text-center md:text-left">
                      <h2 className="text-2xl font-bold m-0">{`${customer.firstName} ${customer.lastName}`}</h2>
                      <div className="flex align-items-center justify-content-center md:justify-content-start mt-2 gap-2">
                        <Tag
                          value={customer.occupation}
                          icon="pi pi-briefcase"
                          severity="info"
                        />
                        {customer.employer && (
                          <Tag
                            value={customer.employer}
                            icon="pi pi-building"
                            severity="secondary"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Divider />

              <div className="px-4 pb-4">
                <div className="surface-card border-round-lg shadow-2 mb-4">
                  <div className="flex overflow-x-auto">
                    <TabButton
                      id="personal"
                      label="Personal Information"
                      active={activeTab === "personal"}
                      icon="pi-user"
                      count={4}
                    />
                    <TabButton
                      id="professional"
                      label="Professional"
                      active={activeTab === "professional"}
                      icon="pi-briefcase"
                      count={3}
                    />
                    <TabButton
                      id="contact"
                      label="Contact Details"
                      active={activeTab === "contact"}
                      icon="pi-envelope"
                      count={3}
                    />
                  </div>

                  <div className="p-4">
                    {activeTab === "personal" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ProfileField
                          label="Full Name"
                          value={`${customer.firstName} ${customer.lastName}`}
                          icon="pi-user"
                        />
                        <ProfileField
                          label="Date of Birth"
                          value={customer.dateOfBirth}
                          icon="pi-calendar"
                          type="date"
                        />
                        <ProfileField
                          label="Gender"
                          value={customer.gender}
                          icon="pi-user"
                        />
                        <ProfileField
                          label="Marital Status"
                          value={customer.maritalStatus}
                          icon="pi-heart"
                          type="tag"
                        />
                      </div>
                    )}

                    {activeTab === "professional" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ProfileField
                          label="Occupation"
                          value={customer.occupation}
                          icon="pi-briefcase"
                        />
                        <ProfileField
                          label="Employer"
                          value={customer.employer}
                          icon="pi-building"
                        />
                        <ProfileField
                          label="Address"
                          value={customer.address}
                          icon="pi-map-marker"
                        />
                      </div>
                    )}

                    {activeTab === "contact" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ProfileField
                          label="Email"
                          value={customer.email}
                          icon="pi-envelope"
                          type="email"
                        />
                        <ProfileField
                          label="Phone Number"
                          value={customer.phoneNumber}
                          icon="pi-phone"
                          type="phone"
                        />
                        <ProfileField
                          label="Address"
                          value={customer.address}
                          icon="pi-map-marker"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* <Card className="shadow-md">
              <div className="flex justify-content-between align-items-center mb-3">
                <h3 className="text-xl font-semibold m-0">
                  Profile Completion
                </h3>
                <Badge value="80%" severity="success" />
              </div>
              <p className="text-gray-600 mb-3">
                Complete your profile to unlock all features
              </p>
              <div className="bg-gray-100 h-2 w-full border-round overflow-hidden">
                <div
                  className="bg-primary h-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
            </Card> */}
          </>
        )}
      </div>
  );
};

export default ProfileCreate;
