import IzeTechLogo from "../brand/IzeTechLogo";

export default function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <IzeTechLogo
      inverse={inverse}
      productLabel="Real Estate"
      className="cursor-pointer text-[30px]"
    />
  );
}
