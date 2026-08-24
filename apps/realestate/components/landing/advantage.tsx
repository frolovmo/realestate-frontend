interface AdvantageProps {
  title: string;
  description: string;
}

export default function Advantage({ title, description }: AdvantageProps) {
  return (
    <div className="flex flex-col px-6 py-5 items-center text-center first:border-b first:border-white">
      <p className="font-bold text-xl mb-4">{title}</p>
      <p>{description}</p>
    </div>
  );
}
