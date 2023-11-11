import React, { useState } from "react";
import { ProcessedMilestone } from "./Timeline";
import MilestoneSection from "./MilestoneSection";
type TimelineDesktopProps = {
  milestones: ProcessedMilestone[];
  mainColor: string;
  buttonColor: string;
};

export default function TimelineDesktop({
  milestones,
  mainColor,
  buttonColor,
}: TimelineDesktopProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const onAnimationComplete = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex < milestones.length) {
        return nextIndex;
      }
      return prevIndex;
    });
  };

  return (
    <div className="w-full flex">
      {milestones.map((milestone, index) => {
        return (
          <MilestoneSection
            milestone={milestone}
            key={index}
            index={index}
            mainColor={mainColor}
            buttonColor={buttonColor}
            animate={index === currentIndex}
            onAnimationComplete={onAnimationComplete}
          />
        );
      })}
    </div>
  );
}
