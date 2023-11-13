"use client";
import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import MilestoneSection, { animationSpeed } from "./MilestoneSection";
import { motion, useAnimation, useInView } from "framer-motion";

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

  const [currentIndex, setCurrentIndex] = useState(-1);

  const onAnimationComplete = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex < processedMilestones.length) {
        return nextIndex;
      }
      return prevIndex;
    });
  };
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.6 });
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      // partialVisibilityGutter: 0,
    },
    medium: {
      breakpoint: { max: 1024, min: 767 },
      items: 3,
      // partialVisibilityGutter: 50,
    },
    small: {
      breakpoint: { max: 767, min: 464 },
      items: 2,
      // partialVisibilityGutter: 40,
    },
    default: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      // partialVisibilityGutter: 30,
    },
  };
  const lineControls = useAnimation();
  useEffect(() => {
    const startAnimation = async () => {
      lineControls.start({ width: "100%", opacity: 1 });
    };
    if (isInView) {
      startAnimation();
      setTimeout(() => {
        onAnimationComplete();
      }, animationSpeed * 1000);
    }
  }, [isInView]);
  return (
    <div ref={containerRef}>
      <Carousel
        responsive={responsive}
        centerMode
        containerClass="min-h-[312px] w-full"
        itemClass="first:flex first:justify-center first:items-center"
      >
        <motion.div
          initial={{ width: 0, opacity: 0, left: 0 }}
          animate={lineControls}
          transition={{ duration: animationSpeed }}
          style={{ backgroundColor: mainColor }}
          className="h-[1px] absolute"
        ></motion.div>

        {processedMilestones.map((milestone, index) => {
          return (
            <MilestoneSection
              milestone={milestone}
              key={index}
              mainColor={mainColor}
              buttonColor={buttonColor}
              animate={index === currentIndex && isInView}
              onAnimationComplete={onAnimationComplete}
              index={index}
            />
          );
        })}
      </Carousel>
    </div>
  );
}
