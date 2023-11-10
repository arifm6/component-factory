import CardContainer from "@/components/CardContainer";
import Timeline from "@/components/Timeline/Timeline";
import React from "react";

type Props = {};

export default function Sandbox({}: Props) {
  const timelineMilestones = [
    {
      startDate: new Date("September 1 2018"),
      endDate: new Date("April 30 2023"),
      company: "McMaster University",
      position: "Computer Science",
      redirectUrl: "/sandbox#education",
    },
    {
      startDate: new Date("August 1 2021"),
      endDate: new Date("Present"),
      company: "Freelance",
      position: "Software Developer",
    },
    {
      startDate: new Date("May 1 2022"),
      endDate: new Date("August 30 2022"),
      company: "AL Concrete",

      position: "Frontend Developer",
    },
    {
      startDate: new Date("March 2023"),
      endDate: new Date("Present"),
      company: "Code Ninjas",
      position: "Coding Instructor",
    },
    {
      startDate: new Date("June 2023"),
      endDate: new Date("Present"),
      company: "Jayiza",
      position: "Frontend Engineer",
    },
  ];
  return (
    <>
      <div className="h-screen w-screen">
        <CardContainer>
          <div className="flex items-center justify-center h-full w-full ">
            <Timeline
              timelineMilestones={timelineMilestones}
              mainColor="#3D5AF1"
              buttonColor="#22D1EE"
            />
          </div>
        </CardContainer>
      </div>
      <div className="h-[300vh]"></div>
      <div id="education"></div>
    </>
  );
}
