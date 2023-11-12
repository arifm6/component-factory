import React from "react";

type MilestoneDescriptionProps = {
  company: string;
  position: string;
};

export default function MilestoneDescription({
  company,
  position,
}: MilestoneDescriptionProps) {
  return (
    <div className="flex justify-between items-center text-center">
      <div className="flex flex-col whitespace-nowrap w-auto  ">
        <div className="text-sm sm:text-base">{position}</div>

        <div className="text-[#343434] text-xs sm:text-sm">{company}</div>
      </div>
    </div>
  );
}
