import React, { useState } from "react";

import type { ProcessedMilestone } from "./Timeline";
import MilestoneDescription from "./MilestoneDescription";
import { motion } from "framer-motion";
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
  const [dateIsHovered, setDateIsHovered] = useState(false);
  const initialDateProps = { width: 0, opacity: 0 };
  const animateDateProps = { width: "auto", opacity: 1 };

  return (
    <div className="flex justify-center items-center grow relative ">
      <div
        style={{ backgroundColor: mainColor }}
        className={`grow h-[1px] bg-[${mainColor}]`}
      ></div>
      <div
        onMouseEnter={() => setDateIsHovered(true)}
        onMouseLeave={() => {
          setDateIsHovered(false);
        }}
        style={{ color: mainColor }}
        className={`absolute ${
          alternate ? "bottom-full" : "top-full"
        } text-xl font-bold my-2`}
      >
        <div className="flex">
          <span>{milestone.startDateString}</span>
          <motion.span
            initial={dateIsHovered ? animateDateProps : initialDateProps}
            animate={dateIsHovered ? animateDateProps : initialDateProps}
            className="whitespace-nowrap"
          >
            &nbsp;-&nbsp;{milestone.endDateString}
          </motion.span>
        </div>
      </div>
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
      <div
        style={{ backgroundColor: mainColor }}
        className="grow h-[1px] "
      ></div>
    </div>
  );
}
