import React from "react";
import TimelineMobile from "./TimelineMobile";
import TimelineDesktop from "./TimelineDesktop";

type Milestone = {
  startDate: Date;
  endDateString: string;
  company: string;
  position: string;
  redirectUrl?: string;
};

type TimelineProps = {
  timelineMilestones: Milestone[];
};

export default function Timeline({ timelineMilestones }: TimelineProps) {
  // Sort the milestones based on startDate in ascending order
  const sortedMilestones = timelineMilestones
    .slice()
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  const processedMilestone = [];
  for (let i = 0; i < sortedMilestones.length; i++) {
    let previousMilestone = sortedMilestones[i - 1] ?? {
      startDate: new Date("1427"),
    };
    let nextMilestone = sortedMilestones[i + 1] ?? {
      startDate: new Date("1427"),
    };
    processedMilestone.push({
      ...sortedMilestones[i],
      startDateString:
        sortedMilestones[i].startDate.getFullYear() ===
          previousMilestone.startDate.getFullYear() ||
        sortedMilestones[i].startDate.getFullYear() ===
          nextMilestone.startDate.getFullYear()
          ? `${sortedMilestones[i].startDate.toLocaleString("default", {
              month: "long",
            })} ${sortedMilestones[i].startDate.getFullYear()}`
          : sortedMilestones[i].startDate.getFullYear().toString(),
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
    <div className="w-full">
      {isMobileDevice() ? (
        <TimelineMobile timelineMilestones={timelineMilestones} />
      ) : (
        <TimelineDesktop
          timelineMilestones={processedMilestone}
          mainColor="#3D5AF1"
          buttonColor="#22D1EE"
        />
      )}
    </div>
  );
}
