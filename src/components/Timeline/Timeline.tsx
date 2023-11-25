"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { dateToMonthYearString, dateToYearString } from "@/utils/dates";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import MilestoneSection, { ANIMATION_SPEED } from "./MilestoneSection";
import { motion, useAnimation, useInView } from "framer-motion";
const MIN_DATE = new Date(-8640000000000000); // JavaScript Date object's minimum value
const MAX_DATE = new Date(8640000000000000); // JavaScript Date object's maximum value

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
  // Sort the milestones based on startDate in ascending order
  const sortedMilestones = useMemo(() => {
    return timelineMilestones
      .slice()
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  }, [timelineMilestones]);
  const processedMilestones = useMemo(() => {
    const milestones = [];
    for (let i = 0; i < sortedMilestones.length; i++) {
      const milestone = sortedMilestones[i];
      let previousMilestone = sortedMilestones[i - 1] ?? {
        startDate: MIN_DATE,
      };
      let nextMilestone = sortedMilestones[i + 1] ?? {
        startDate: MAX_DATE,
      };
      milestones.push({
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
          : milestone.startDate.getFullYear() ===
            milestone.endDate.getFullYear()
          ? `${sortedMilestones[i].endDate.toLocaleString("default", {
              month: "long",
            })} ${sortedMilestones[i].endDate.getFullYear()}`
          : sortedMilestones[i].endDate.getFullYear().toString(),
      });
    }
    return milestones;
  }, [sortedMilestones]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const onAnimationComplete = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex < processedMilestones.length) {
        return nextIndex;
      }
      return prevIndex;
    });
  }, [processedMilestones]);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.6 });
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      // partialVisibilityGutter: 0,
    },
    medium: {
      breakpoint: { max: 1024, min: 767 },
      items: 4.5,
      // partialVisibilityGutter: 50,
    },
    small: {
      breakpoint: { max: 767, min: 464 },
      items: 3.5,
      // partialVisibilityGutter: 40,
    },
    default: {
      breakpoint: { max: 464, min: 0 },
      items: 2.5,
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
      }, ANIMATION_SPEED * 1000);
    }
  }, [isInView, lineControls, onAnimationComplete]);
  return (
    <div ref={containerRef}>
      <Carousel
        responsive={responsive}
        containerClass="min-h-[312px] w-full"
        itemClass="first:flex first:justify-center first:items-center"
      >
        <motion.div
          initial={{ width: 0, opacity: 0, left: 0 }}
          animate={lineControls}
          transition={{ duration: ANIMATION_SPEED }}
          style={{ backgroundColor: mainColor }}
          className="h-[1px] absolute"
        ></motion.div>

        {processedMilestones.map((milestone, index) => {
          return (
            <MilestoneSection
              milestone={milestone}
              key={milestone.startDate + milestone.position + milestone.company}
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
