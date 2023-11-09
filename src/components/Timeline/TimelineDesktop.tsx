"use client";
import React, { useState } from "react";
import MilestoneDescription from "./MilestoneDescription";
import { motion } from "framer-motion";

type Milestone = {
  startDate: Date;
  startDateString: string;
  endDateString: string;
  company: string;
  position: string;
};

type TimelineProps = {
  timelineMilestones: Milestone[];
};

export default function TimelineDesktop({ timelineMilestones }: TimelineProps) {
  const [dateIsHovered, setDateIsHovered] = useState(false);
  const initialDateProps = { width: 0, opacity: 0 };
  const animateDateProps = { width: "auto", opacity: 1 };
  return (
    <div className="block w-full">
      <div className="flex w-full items-center">
        <div className="grow-[0.5] h-[1px] bg-gray-400"></div>
        {timelineMilestones.map((milestone, index) => {
          //alternate arrow each time
          const alternate = index % 2 === 0;
          return (
            <div className="relative flex items-center grow " key={index}>
              <div className="h-8 w-8 border-2 border-blue-400 rounded-full relative ">
                <div
                  className={`absolute flex  left-1/2  -translate-x-1/2  ${
                    alternate
                      ? "bottom-full -translate-y-2"
                      : "top-full translate-y-2"
                  }`}
                >
                  <div
                    className="flex flex-nowrap group items-center"
                    onMouseEnter={() => setDateIsHovered(true)}
                    onMouseLeave={() => {
                      setDateIsHovered(false);
                    }}
                  >
                    <span className="whitespace-nowrap">
                      {milestone.startDateString}
                    </span>
                    <motion.span
                      initial={
                        dateIsHovered ? animateDateProps : initialDateProps
                      }
                      animate={
                        dateIsHovered ? animateDateProps : initialDateProps
                      }
                      className="flex whitespace-nowrap"
                    >
                      &nbsp;- {milestone.endDateString}
                    </motion.span>
                  </div>
                </div>

                <div
                  className={`flex items-center w-full absolute ${
                    alternate
                      ? "flex-col top-full translate-y-2 "
                      : "flex-col-reverse bottom-full -translate-y-2"
                  }`}
                >
                  <div className="w-[1px] h-[49px] bg-gray-400"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <MilestoneDescription
                    company={milestone.company}
                    position={milestone.position}
                    startDate={milestone.startDateString}
                    endDate={milestone.endDateString}
                  />
                </div>
              </div>
              <div className="h-[1px] grow bg-gray-400"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
