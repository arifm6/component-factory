import React from "react";

import type { ProcessedMilestone } from "./Timeline";
import MilestoneDescription from "./MilestoneDescription";
type MilestoneSectionProps = {
  milestone: ProcessedMilestone;
  index: number;
  mainColor: string;
  buttonColor: string;
};

export default function MilestoneSection({
  milestone,
  index,
  mainColor,
  buttonColor,
}: MilestoneSectionProps) {
  const alternate = index % 2 === 0;
  return (
    <div className="flex justify-center grow relative ">
      <div className="flex items-center w-full">
        <div
          style={{ backgroundColor: mainColor }}
          className={`grow h-[1px] bg-[${mainColor}]`}
        ></div>
        <div
          style={{ borderColor: buttonColor }}
          className="relative w-8 h-8 border-2 rounded-full"
        >
          <div
            style={{ backgroundColor: buttonColor }}
            className="w-4 h-4 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-full"
          ></div>
        </div>
        <div
          style={{ backgroundColor: mainColor }}
          className="grow h-[1px] "
        ></div>
      </div>
      <div
        style={{ color: mainColor }}
        className={`absolute ${
          alternate ? "bottom-full" : "top-full"
        } text-xl font-bold my-2`}
      >
        {milestone.startDateString}
      </div>
      <div
        className={`absolute ${
          alternate
            ? "top-full flex-col translate-y-2"
            : "bottom-full flex-col-reverse -translate-y-2"
        } flex  items-center`}
      >
        <div className="h-14 w-[1px] bg-[#DCDCDC]"></div>
        <div className="w-2 h-2 rounded-full bg-[#DCDCDC]"></div>
        <div className="my-2">
          <MilestoneDescription
            company={milestone.company}
            position={milestone.position}
          />
        </div>
      </div>
    </div>
  );
}
