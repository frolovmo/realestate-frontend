interface UnitStatProps {
  children: React.ReactNode;
  quantity: number;
  statName: string;
}
export default function UnitStat({
  children,
  quantity,
  statName,
}: UnitStatProps) {
  return (
    <div className="flex gap-1.5 items-center">
      {children}
      <div className="flex flex-col justify-center items-center text-black font-poppins">
        <p className="text-sm font-bold">{quantity}</p>
        <p className="text-xs font-light">{statName}</p>
      </div>
    </div>
  );
}
