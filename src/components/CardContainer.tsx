import React from "react";

type Props = {
  children?: React.ReactNode;
};

function CardContainer({ children }: Props) {
  return (
    <div className="rounded-3xl p-6 max-w-screen max-h-screen h-screen">
      {children}
    </div>
  );
}

export default CardContainer;
