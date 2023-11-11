"use client";
import React, { createContext } from "react";

import TimelineMobile from "./TimelineMobile";
import TimelineDesktop from "./TimelineDesktop";

export type Milestone = {
  startDate: Date;
  endDate: Date;
  company: string;
  position: string;
  redirectUrl?: string;
};
export type ProcessedMilestone = {
  startDate: Date;
  startDateString: string;
  endDate: Date;
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

export default function Timeline({
  timelineMilestones,
  mainColor,
  buttonColor,
}: TimelineProps) {
  function dateToYearString(date: Date) {
    return date.getFullYear().toString();
  }
  function dateToMonthYearString(date: Date) {
    return `${date.toLocaleString("default", {
      month: "long",
    })} ${date.getFullYear()}`;
  }
  // Sort the milestones based on startDate in ascending order
  const sortedMilestones = timelineMilestones
    .slice()
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  const processedMilestones = [];
  for (let i = 0; i < sortedMilestones.length; i++) {
    const milestone = sortedMilestones[i];
    let previousMilestone = sortedMilestones[i - 1] ?? {
      startDate: new Date("1427"),
    };
    let nextMilestone = sortedMilestones[i + 1] ?? {
      startDate: new Date("1427"),
    };
    processedMilestones.push({
      ...sortedMilestones[i],

      startDateString:
        milestone.startDate.getFullYear() ===
          previousMilestone.startDate.getFullYear() ||
        milestone.startDate.getFullYear() ===
          nextMilestone.startDate.getFullYear()
          ? dateToMonthYearString(milestone.startDate)
          : dateToYearString(milestone.startDate),
      endDateString: !milestone.endDate
        ? "Present"
        : milestone.startDate.getFullYear() === milestone.endDate.getFullYear()
        ? `${sortedMilestones[i].endDate.toLocaleString("default", {
            month: "long",
          })} ${sortedMilestones[i].endDate.getFullYear()}`
        : sortedMilestones[i].endDate.getFullYear().toString(),
    });
  }

  // Create a utility function for checking mobile devices
  function isMobileDevice() {
    if (typeof window !== "undefined") {
      const mobileScreenWidth = 767; // Set your mobile breakpoint here
      return window.innerWidth <= mobileScreenWidth;
    }
    return false; // Default to false if not on the client-side
  }
  return (
    <div className="w-full min-h-[312px] flex items-center">
      {isMobileDevice() ? (
        <TimelineMobile timelineMilestones={timelineMilestones} />
      ) : (
        <TimelineDesktop
          milestones={processedMilestones}
          mainColor={mainColor}
          buttonColor={buttonColor}
        />
      )}
    </div>
  );
}
