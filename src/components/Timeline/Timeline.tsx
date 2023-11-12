"use client";
import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import MilestoneSection from "./MilestoneSection";

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
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    paritialVisibilityGutter: 60,
  },
  medium: {
    breakpoint: { max: 1024, min: 767 },
    items: 3,
    paritialVisibilityGutter: 50,
  },
  small: {
    breakpoint: { max: 767, min: 464 },
    items: 2,
    paritialVisibilityGutter: 40,
  },
  default: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 30,
  },
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

  const [currentIndex, setCurrentIndex] = useState(0);

  const onAnimationComplete = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex < processedMilestones.length) {
        return nextIndex;
      }
      return prevIndex;
    });
  };
  return (
    <>
      <Carousel
        responsive={responsive}
        partialVisbile
        containerClass="min-h-[312px] border-2"
        itemClass="flex justify-center items-center "
      >
        {processedMilestones.map((milestone, index) => {
          return (
            <MilestoneSection
              milestone={milestone}
              key={index}
              mainColor={mainColor}
              buttonColor={buttonColor}
              animate={index === currentIndex}
              onAnimationComplete={onAnimationComplete}
              index={index}
            />
          );
        })}
      </Carousel>
    </>
  );
}
