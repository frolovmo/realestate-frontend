"use client";

import { PropertyViews } from "@/lib/types";
import { Chart } from "primereact/chart";
import { useMemo } from "react";

interface ImpressionsChartProps {
  propertyViews: PropertyViews;
}

export default function ImpressionsChart({
  propertyViews,
}: ImpressionsChartProps) {
  const impressionChartData = useMemo(
    () => ({
      labels: propertyViews.labels,
      datasets: [
        {
          label: "Impressions",
          data: propertyViews.data,
          backgroundColor: "rgba(107, 114, 128, 0.5)",
          borderRadius: 8,
          barPercentage: 0.6,
        },
      ],
    }),
    []
  );

  const impressionChartOptions = useMemo(() => {
    const maxValue = Math.max(...propertyViews.data, 0);
    const stepSize =
      maxValue > 10000
        ? 2000
        : maxValue > 1000
        ? 500
        : maxValue > 100
        ? 50
        : maxValue > 10
        ? 5
        : 1;
    return {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: "hsl(214, 20%, 69%)",
            font: {
              family: '"Poppins", sans-serif',
              size: 12,
            },
          },
        },
        y: {
          grid: {
            display: false,
          },
          ticks: {
            stepSize,
            color: "hsl(214, 20%, 69%)",
            font: {
              family: '"Poppins", sans-serif',
              size: 12,
            },
            callback: (value: number) => {
              return maxValue >= 1000 ? `${value / 1000}k` : value.toString();
            },
          },
          beginAtZero: true,
        },
      },
    };
  }, []);

  return (
    <div className="w-[254px] h-[140px]">
      <Chart
        type="bar"
        data={impressionChartData}
        options={impressionChartOptions}
      />
    </div>
  );
}
