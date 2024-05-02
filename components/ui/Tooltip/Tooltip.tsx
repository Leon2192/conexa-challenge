import React, { useState } from "react";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "left" | "right";
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "right",
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && (
        <span
          className={`tooltip  text-white text-center text-xs absolute bottom-full ${
            position === "left" ? "right-full" : "-left-full"
          } transform -translate-y-1/2`}
        >
          {content}
        </span>
      )}
    </div>
  );
};

export default Tooltip;
