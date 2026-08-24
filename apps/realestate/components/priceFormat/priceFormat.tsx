interface PriceFormatProps {
  currency: string;
  cost: number; // TODO: Add price format conversion from number
}

export default function PriceFormat({ currency, cost }: PriceFormatProps) {
  return (
    <div className="flex items-baseline gap-1 font-light">
      <div className="text-[7px] leading-[11px]">{currency}</div>
      <p className="text-xs	leading-[18px]">{cost}</p>
    </div>
  );
}
