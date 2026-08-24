"use client";
import { Input } from "../ui/input";
import { MinusIcon, PlusIcon } from "@/components/icons";
import { Button } from "../ui/button";
import { NUMERIC_INPUT_MAX_LIMIT } from "@/lib/constants";

interface QuantityInput2Props {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
}

export default function QuantityInput({
  min = 0,
  max = NUMERIC_INPUT_MAX_LIMIT,
  step = 1,
  value,
  onChange,
}: QuantityInput2Props) {
  const handleIncrease = () => {
    const newValue = Math.min(value + step, max);
    onChange(newValue);
  };
  const handleDecrease = () => {
    const newValue = Math.max(value - step, min);
    onChange(newValue);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(min, Math.min(Number(e.target.value), max));
    onChange(newValue);
  };
  return (
    <div className="flex h-[45px] w-[232px] items-center">
      <Button
        type="button"
        onClick={handleDecrease}
        disabled={value <= min}
        className="w-[25%] h-full border border-r-0 border-grayborder2 rounded-l-md rounded-r-none bg-white disabled:cursor-not-allowed hover:bg-white"
      >
        <MinusIcon className="text-black" />
      </Button>
      <Input
        type="number"
        value={value}
        onChange={handleChange}
        className="w-[50%] h-[45px] font-poppins font-semibold text-xl leading-[30px] border border-grayborder2 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        min={min}
        max={max}
        step={step}
      />
      <Button
        type="button"
        onClick={handleIncrease}
        disabled={value >= max}
        className="w-[25%] h-full border border-l-0 border-grayborder2 rounded-r-md rounded-l-none bg-white hover:bg-white"
      >
        <PlusIcon className="text-black" />
      </Button>
    </div>
  );
}
