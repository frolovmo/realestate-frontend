import React, { PropsWithChildren } from "react";
import { CardData } from "@procurement/app/data/card";

export interface CardProps extends CardData {
  iconSize?: string;
  iconStyle?: React.CSSProperties;
  steps?: number;
}

export const Card: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-fit bg-white shadow-md rounded-lg border-2 border-gray-200 hover:shadow-lg transition duration-300 ease-in-out">
      {children}
    </div>
  );
};

export const MainCard: React.FC<CardProps> = ({
  title,
  description,
  icon,
  steps,
}) => {
  return (
    <Card>
      {steps ? (
        <div className="flex w-full rounded-lg">
          <div
            className="bg-foreground h-2 rounded-lg"
            style={{ width: steps + "%" }}
          />
          <div />
        </div>
      ) : null}
      <div className={`flex flex-col items-center mb-4 justify-around p-4`}>
        {icon}
        <h3 className="text-lg font-semibold my-4">{title}</h3>
        <p className="text-lightdark text-sm text-center">{description}</p>
      </div>
    </Card>
  );
};

export const FeatureCard: React.FC<CardProps> = ({
  title,
  description,
  icon,
  iconSize,
}) => {
  return (
    <MainCard
      title={title}
      description={description}
      icon={
        <div className="mb-4 flex items-center justify-center w-fit rounded-full bg-[#e5eee9] p-4">
          <span className={icon as string} style={{ fontSize: iconSize }} />
        </div>
      }
      iconSize={iconSize}
    />
  );
};

export const StepsCard: React.FC<CardProps> = ({
  title,
  description,
  icon,
  iconSize,
  steps,
}) => (
  <MainCard
    title={title}
    description={description}
    icon={
      <div className="mb-4 flex items-center justify-center w-fit rounded-full bg-[#035427] p-4">
        {icon}
      </div>
    }
    iconSize={iconSize}
    steps={steps}
  />
);

export const ReasonsCard: React.FC<CardProps> = ({
  title,
  description,
  icon,
  iconSize,
}) => {
  return (
    <Card>
      <div className="flex mb-4 sm:w-[450px] min-w-[350px]">
        <div className="m-4 w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#e5eee9] p-4">
          <span className={icon as string} style={{ fontSize: iconSize }} />
        </div>
        <div>
          <h3 className="text-lg font-semibold my-4">{title}</h3>
          <p className="text-sm text-lightdark">{description}</p>
        </div>
      </div>
    </Card>
  );
};
