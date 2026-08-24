import React from "react";
import { RadioButton } from "primereact/radiobutton";

export const CompanyLocation: React.FC = () => {
  const locations = [
    { value: "local", label: "Local Company" },
    { value: "internation", label: "International Company" },
  ];

  const [selected, setSelected] = React.useState(locations[0]);
  return (
    <div className="w-full flex flex-wrap justify-between mt-12">
      <h3 className="text-softblack font-semibold text-sm">Company Location</h3>
      {locations.map((input, index) => (
        <div key={index} className="w-full mt-3">
          <div className="flex align-items-center">
            <RadioButton
              inputId={input.value}
              name="location"
              value={input.value}
              onChange={() => setSelected(input)}
              checked={selected.value === input.value}
              className="custom-radio"
            />
            <label
              htmlFor={input.value}
              className="text-lightdark text-sm ml-2"
            >
              {input.label}
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};
