import React from "react";

type Milestone = {
  startDate: Date;
  company: string;
  position: string;
};

type TimelineProps = {
  timelineMilestones: Milestone[];
};

export default function TimelineMobile({ timelineMilestones }: TimelineProps) {
  // Sort the milestones based on startDate in ascending order
  const sortedMilestones = timelineMilestones
    .slice()
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

  return (
    <div className="w-full">
      {sortedMilestones.map((milestone, index) => {
        const alternate = index % 2 === 0;

        return (
          <div className="flex flex-col lg:hidden items-center ">
            <div className="h-24 w-[1px] bg-gray-400"></div>
            <div className="timeline-milestone-button items-center ">
              <div
                className={`timeline-start-date ${
                  alternate
                    ? "right-full -translate-x-2"
                    : "left-full translate-x-2"
                } `}
              >
                {milestone.startDate.getFullYear().toString()}
              </div>
              <div
                className={`absolute flex items-center ${
                  alternate
                    ? "flex left-full translate-x-2 space-x-2"
                    : "flex-row-reverse right-full -translate-x-2"
                }`}
              >
                <div className="h-[1px] w-[49px] bg-gray-400 "></div>
                <div className="timeline-description">
                  <div className="text-lg">{milestone.company}</div>
                  <div className="">{milestone.position}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="hidden lg:flex w-full">
        {sortedMilestones.map((milestone, index) => {
          //alternate arrow each time
          const alternate = index % 2 === 0;
          return (
            <div className="flex justify-end items-center grow" key={index}>
              <div className="h-[1px] w-full bg-gray-400"></div>
              <div className="timeline-milestone-button justify-center">
                <div
                  className={`timeline-start-date ${
                    alternate
                      ? "bottom-full -translate-y-2"
                      : "top-full translate-y-2"
                  } `}
                >
                  {milestone.startDate.getFullYear().toString()}
                </div>
                <div
                  className={`absolute flex items-center ${
                    alternate
                      ? "flex-col top-full translate-y-2 space-y-2"
                      : "flex-col-reverse bottom-full -translate-y-2"
                  }`}
                >
                  <div className="h-[49px] w-[1px] bg-gray-400 "></div>
                  <div className="timeline-description">
                    <div className="text-lg">{milestone.company}</div>
                    <div className="">{milestone.position}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
