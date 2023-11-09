import React from "react";

type MilestoneDescriptionProps = {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
};

export default function MilestoneDescription({
  company,
  position,
}: MilestoneDescriptionProps) {
  return (
    <div className="flex justify-between items-center text-center">
      <div className="flex flex-col whitespace-nowrap w-auto  ">
        <div>{position}</div>

        <div className="text-[#343434] text-sm">{company}</div>
      </div>
    </div>
  );
}
