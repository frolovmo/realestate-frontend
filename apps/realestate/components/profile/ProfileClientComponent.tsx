"use client";

import { useState } from "react";

import HeadingBar from "../headingBar/headingBar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function ProfileClientComponent({ user }: { user: any }) {
  // const [profilePic, setProfilePic] = useState(user?.profileImage || null);

  // const handleChangePicture = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (!file) return;
  //   const imageUrl = URL.createObjectURL(file);
  //   setProfilePic(imageUrl);
  // };

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [formValues, setFormValues] = useState({
    firstName: user?.firstname || "",
    lastName: user?.lastname || "",
    phone: user?.phone || "",
  });

  const fullName =
    `${formValues.firstName} ${formValues.lastName}`.trim() ||
    user?.fullName ||
    "User";

  const updateField = (field: keyof typeof formValues, value: string) => {
    setFormValues((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const saveProfile = async () => {
    setMessage("");

    const response = await fetch("/api/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      setMessage(data?.message || "Unable to update profile");
      return;
    }

    setMessage("Profile updated");
    setIsEditing(false);
    window.location.reload();
  };

  return (
    <main className="w-full h-full">
      <HeadingBar heading="Profile" />
      <div className="min-h-screen rounded-b-3xl border bg-background p-4">
        <div className="surface-panel flex w-full flex-col justify-between gap-6 px-4 py-5 text-secondary lg:flex-row lg:justify-evenly">
          <div className="flex flex-row lg:flex-col gap-3 lg:gap-6 items-center lg:items-start">
            <button className="rounded-lg bg-primary px-8 py-3 text-base font-medium text-secondary">
              My profile
            </button>
            <button className="rounded-lg bg-primaryneutral px-8 py-3 text-base font-medium text-secondary lg:hidden">
              Security
            </button>
          </div>

          <div className="hidden lg:block w-full lg:w-[2px] bg-[#D9D9D9] my-4 lg:my-0"></div>

          <div className="flex flex-col w-full lg:w-[70%] gap-6 px-2 lg:px-0">
            <h1 className="font-poppins text-lg font-semibold underline decoration-primary decoration-4 underline-offset-4">
              My Profile
            </h1>

            {/* Top Profile Section */}
            <div className="p-3 rounded-md border border-[#D9D9D9] flex flex-col gap-4 lg:flex-row items-center justify-between">
              <div className="flex flex-row gap-2 items-center">
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-primaryneutral text-secondary ring-2 ring-primary">
                  {user?.profileImage ? (
                    <img src={user?.profileImage} alt="Profile" className="rounded-full w-full h-full object-cover" />
                  ) : (
                    <span className="text-lg">{fullName[0]}</span>
                  )}
                </div>
                <div className="font-poppins">
                  <div className="font-semibold text-sm text-black">{fullName}</div>
                  <div className="text-[#707070] text-sm">{user?.roleName}</div>
                  <div className="text-[#B5B5B5] text-sm">{user?.address?.district} , {user?.address?.country}</div>
                </div>
              </div>
              {/* <label htmlFor="uploadProfilePic" className="cursor-pointer w-full lg:w-52">
                <Button asChild variant="secondary" className="w-full">
                  <span>Change Picture</span>
                </Button>
                <input id="uploadProfilePic" type="file" className="hidden" onChange={handleChangePicture} />
              </label> */}
            </div>

            <h1 className="mt-4 font-poppins text-lg font-semibold underline decoration-primary decoration-4 underline-offset-4">
              Personal Info
            </h1>
            <div className="p-4 rounded-md border border-[#D9D9D9] flex flex-col gap-y-6">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-[70%]">
                  {isEditing ? (
                    <>
                      <EditableField
                        label="First Name"
                        value={formValues.firstName}
                        onChange={(value) => updateField("firstName", value)}
                      />
                      <EditableField
                        label="Surname"
                        value={formValues.lastName}
                        onChange={(value) => updateField("lastName", value)}
                      />
                      <EditableField
                        label="Phone number"
                        value={formValues.phone}
                        onChange={(value) => updateField("phone", value)}
                      />
                    </>
                  ) : (
                    <>
                      <InfoField label="First Name" value={formValues.firstName} />
                      <InfoField label="Surname" value={formValues.lastName} />
                      <InfoField label="Phone number" value={formValues.phone} />
                    </>
                  )}
                  <InfoField label="Email" value={user?.email} />
                </div>
                <div className="flex w-full flex-col gap-2 sm:w-40 lg:w-52">
                  {isEditing ? (
                    <>
                      <Button type="button" variant="default" onClick={saveProfile}>
                        Save
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => {
                          setIsEditing(false);
                          setMessage("");
                        }}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setIsEditing(true)}
                    >
                      Update
                    </Button>
                  )}
                  {message && (
                    <p className={message === "Profile updated" ? "text-xs text-green-600" : "text-xs text-red-600"}>
                      {message}
                    </p>
                  )}
                </div>
              </div>
              {/* <div>
                <h1 className="text-gray">Bio</h1>
                <p className="text-sm text-[#707070] mt-2">
                  A dedicated property developer based in Kigali, Rwanda, specializing in creating modern,
                  sustainable residential and commercial spaces. With a deep understanding of the local market
                  and a commitment to quality, I strive to deliver innovative properties that meet the growing
                  demands of Kigali's urban landscape. My projects emphasize eco-friendly construction, smart
                  technology, and exceptional design, ensuring long-term value for both investors and homeowners.
                </p>
              </div> */}
            </div>

            <h1 className="mt-4 font-poppins text-lg font-semibold underline decoration-primary decoration-4 underline-offset-4">
              Address Info
            </h1>
            <div className="p-4 rounded-md border border-[#D9D9D9] flex flex-col gap-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <InfoField label="Country" value={user?.address?.country} />
                <InfoField label="Province" value={user?.address?.province} />
                <InfoField label="District" value={user?.address?.district} />
                <InfoField label="Sector" value={user?.address?.sector} />
                <InfoField label="Cell" value={user?.address?.cell} />
                <InfoField label="Village" value={user?.address?.village} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const InfoField = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex flex-col">
    <h1 className="text-gray text-xs">{label}</h1>
    <p className="text-black text-sm font-semibold">{value || "N/A"}</p>
  </div>
);

const EditableField = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) => (
  <label className="flex flex-col">
    <span className="text-gray text-xs">{label}</span>
    <Input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="mt-1"
    />
  </label>
);
