import React, { useEffect, useState } from "react";

import type { ProcessedMilestone } from "./Timeline";
import MilestoneDescription from "./MilestoneDescription";
import { motion, useAnimation } from "framer-motion";
type MilestoneSectionProps = {
  milestone: ProcessedMilestone;
  index: number;
  mainColor: string;
  buttonColor: string;
  animate: boolean;
  onAnimationComplete: () => void;
};
export const animationSpeed = 0.75;

export default function MilestoneSection({
  milestone,
  index,
  mainColor,
  buttonColor,
  animate,
  onAnimationComplete,
}: MilestoneSectionProps) {
  const alternate = index % 2 === 0;
  const [dateIsHovered, setDateIsHovered] = useState(false);
  const initialDateProps = { width: 0, opacity: 0 };
  const animateDateProps = { width: "auto", opacity: 1 };
  const leftLineControls = useAnimation();
  const dateAndButtonControls = useAnimation();
  const milestoneDescriptionControls = useAnimation();
  const rightLineControls = useAnimation();
  useEffect(() => {
    const animateSection = async () => {
      // Your animation logic for the first element
      await leftLineControls.start({ width: "100%" });

      // Animation for the date elements
      await dateAndButtonControls.start({ opacity: 1 });

      //Animation for Milestone Description Section
      await milestoneDescriptionControls.start("visible");
      await rightLineControls.start({ width: "100%", opacity: 1 });

      // Animation for the next element, and so on...
      // You can add more animations here

      // Repeat the process for other animations

      // Callback to notify the parent that animation is complete
      onAnimationComplete();
    };

    if (animate) {
      animateSection();
    }
  }, [animate]);
  return (
    <div className={`flex justify-center items-center  relative`}>
      {/* {index === 0 && (
        <div className="grow-[0.25]">
          <motion.div
            initial={{ width: 0 }}
            animate={leftLineControls}
            transition={{ duration: animationSpeed }}
            style={{ backgroundColor: mainColor }}
            className="grow h-[1px]"
          ></motion.div>
        </div>
      )} */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={dateAndButtonControls}
        transition={{ duration: animationSpeed }}
        style={{ borderColor: buttonColor }}
        className="relative w-8 h-8 border-2 rounded-full "
      >
        <motion.div
          initial="hidden"
          animate={milestoneDescriptionControls}
          variants={{
            hidden: {
              y: "0",
              opacity: 0,
            },
            visible: {
              y: alternate ? "8px" : "8px",
              opacity: 1,
            },
          }}
          transition={{ duration: animationSpeed }}
          className=""
        >
          <div
            className={`absolute ${
              alternate
                ? "flex-col translate-y-8 "
                : "bottom-full flex-col-reverse -translate-y-2"
            } flex  items-center left-1/2 -translate-x-1/2`}
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
        </motion.div>

        <div
          style={{ backgroundColor: buttonColor }}
          className="w-4 h-4 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-full"
        >
          <div
            onMouseEnter={() => setDateIsHovered(true)}
            onMouseLeave={() => {
              setDateIsHovered(false);
            }}
            style={{ color: mainColor }}
            className={`absolute ${
              alternate ? "bottom-full" : "top-full"
            } text-xl font-bold my-2 right-1/2 translate-x-1/2 whitespace-nowrap`}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={dateAndButtonControls}
              className="flex text-center"
            >
              <span>{milestone.startDateString}</span>
              <motion.span
                initial={dateIsHovered ? animateDateProps : initialDateProps}
                animate={dateIsHovered ? animateDateProps : initialDateProps}
              >
                &nbsp;-&nbsp;{milestone.endDateString}
              </motion.span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="grow">
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={rightLineControls}
          transition={{ duration: animationSpeed }}
          style={{ backgroundColor: mainColor }}
          className="grow h-[1px]"
        ></motion.div>
      </div>
    </div>
  );
}
