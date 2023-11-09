"use client";
import React, { useState } from "react";
import MilestoneDescription from "./MilestoneDescription";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type Milestone = {
  startDate: Date;
  startDateString: string;
  endDateString: string;
  company: string;
  position: string;
  redirectUrl?: string;
};

type TimelineProps = {
  timelineMilestones: Milestone[];
  mainColor: string;
  buttonColor: string;
};

export default function TimelineDesktop({
  timelineMilestones,
  mainColor,
  buttonColor,
}: TimelineProps) {
  const [dateIsHovered, setDateIsHovered] = useState(false);
  const initialDateProps = { width: 0, opacity: 0 };
  const animateDateProps = { width: "auto", opacity: 1 };
  const mainColorTextStyle = { color: mainColor };
  const router = useRouter();
  return (
    <div className="block w-full relative">
      <div className="flex w-full items-center">
        <div
          style={{ backgroundColor: mainColor }}
          className={`grow-[0.5] h-[1px] bg-[${mainColor}]`}
        ></div>
        {timelineMilestones.map((milestone, index) => {
          //alternate arrow each time
          const alternate = index % 2 === 0;
          return (
            <div className="relative flex items-center grow " key={index}>
              <div
                style={{ borderColor: buttonColor }}
                className={`h-8 w-8 border-[2px] rounded-full relative`}
              >
                <div
                  className="absolute  inset-0 rounded-full cursor-pointer"
                  onClick={() => {
                    milestone.redirectUrl && router.push(milestone.redirectUrl);
                  }}
                >
                  <div
                    style={{ backgroundColor: buttonColor }}
                    className={`h-4 w-4 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-full`}
                  ></div>
                </div>
                <div
                  className={`absolute flex  left-1/2  -translate-x-1/2  ${
                    alternate
                      ? "bottom-full -translate-y-2"
                      : "top-full translate-y-2"
                  }`}
                >
                  <div
                    style={mainColorTextStyle}
                    className={`flex flex-nowrap group items-center   font-bold text-xl`}
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
              <div
                style={{ backgroundColor: mainColor }}
                className={`h-[1px] grow bg-[${mainColor}]`}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
