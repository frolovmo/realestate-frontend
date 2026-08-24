import { ChangeEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { useFormContext } from "react-hook-form";
import Close from "../close/close";

export default function CustomFacilities() {
  const { watch, setValue } = useFormContext();
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [facility, setFacility] = useState("");
  const [error, setError] = useState("");
  const currentList = watch("customFacilities");
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setFacility(event.target.value);
  };
  const openInput = () => {
    setError("");
    setIsInputVisible(true);
  };
  const submit = () => {
    if (!facility) {
      setError("Custom Facility can not be empty.");
      return;
    }
    if (currentList.includes(facility)) {
      setError("Facility already added.");
      return;
    }
    setValue("customFacilities", [...currentList, facility]);
    setFacility("");
    setIsInputVisible(false);
  };

  const removeFacility = (facilityToRemove: string) => {
    setValue(
      "customFacilities",
      currentList.filter((item: string) => item !== facilityToRemove)
    );
  };

  return (
    <div>
      <div className="flex gap-1 mb-2">
        {currentList.map((item: string) => (
          <span key={item} className="relative">
            <Badge className="cursor-pointer flex items-center gap-2 px-3 py-1">
              {item}
            </Badge>
            <span className="absolute -top-1.5 -right-1.5">
              <Close onClick={() => removeFacility(item)} />
            </span>
          </span>
        ))}
      </div>

      {isInputVisible ? (
        <div>
          <div className="flex gap-2 items-center">
            <Input
              placeholder="Add custom facility"
              onChange={handleOnChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  submit();
                }
              }}
              value={facility}
              className="w-[50%]"
            />
            <Button type="button" variant="active" size="lg" onClick={submit}>
              Add
            </Button>
          </div>
          {error && <div className="text-red-600 text-xs">{error}</div>}
        </div>
      ) : (
        <div className="text-googlelink cursor-pointer" onClick={openInput}>
          + Add more facility
        </div>
      )}
    </div>
  );
}
