import React, { memo } from "react";
import Countdown from "react-countdown";

interface CountdownComponentProps {
  className?: string;
  completionText?: string | React.ReactNode;
  counterComponent?: React.ReactNode;
  time?: number;
  restartCounter: number;
}

const defaultExpiry = process.env.NEXT_PUBLIC_OTP_EXPIRY ?? "180000";

const CountdownComponent = ({
  restartCounter,
  className,
  completionText = "Time's up!",
  counterComponent,
  time = defaultExpiry ? parseInt(defaultExpiry as string) : 180000,
}: CountdownComponentProps) => {
  // Renderer callback with condition
  const renderer = ({
    minutes,
    seconds,
    completed,
  }: {
    minutes: number;
    seconds: number;
    completed: boolean;
  }) => {
    if (completed) {
      // Render a completed state
      return <span>{completionText}</span>;
    } else {
      // Render a countdown
      if (counterComponent) {
        return counterComponent;
      }
      return (
        <span className={className}>
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </span>
      );
    }
  };

  return <Countdown key={restartCounter} date={Date.now() + time} renderer={renderer} />;
};

export default memo(CountdownComponent);
