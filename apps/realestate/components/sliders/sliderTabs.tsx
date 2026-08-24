import { cn } from "../../lib/utils";
import { PropertyData } from "../../lib/types/index";
import { Button } from "../ui/button";

interface SliderTabsProps {
  property: PropertyData;
  activeTabIndex: number;
  onActiveTabClick: (index: number) => void;
}

export default function SliderTabs({
  property,
  onActiveTabClick,
  activeTabIndex,
}: SliderTabsProps) {
  const { images } = property;
  return (
    <div className="flex gap-4 items-center justify-center">
      {images.map((imageMeta, index) => (
        <Button
          key={imageMeta.url}
          variant="default"
          onClick={() => onActiveTabClick(index)}
          className={cn(
            "border border-white rounded-[30px] backdrop-blur bg-transparent min-w-30 hover:bg-primary",
            activeTabIndex === index ? "bg-primary border-primary" : ""
          )}
        >
          {imageMeta.altText}
        </Button>
      ))}
    </div>
  );
}
