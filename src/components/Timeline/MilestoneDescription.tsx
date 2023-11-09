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
        <div>{company}</div>
        <div>{position}</div>
      </div>
    </div>
  );
}
