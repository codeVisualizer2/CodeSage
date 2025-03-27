import React from "react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

interface ResizableLayoutProps {
  children?: React.ReactNode;
  defaultSizes?: number[];
  direction?: "horizontal" | "vertical";
  className?: string;
}

const ResizableLayout = ({
  children = [],
  defaultSizes = [33, 33, 34],
  direction = "horizontal",
  className = "",
}: ResizableLayoutProps) => {
  // Convert children to array to handle them properly
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={`w-full h-full bg-background ${className}`}>
      <ResizablePanelGroup
        direction={direction}
        className="min-h-[500px] rounded-lg border"
      >
        {childrenArray.map((child, index) => (
          <React.Fragment key={index}>
            <ResizablePanel
              defaultSize={
                defaultSizes[index] || Math.floor(100 / childrenArray.length)
              }
              minSize={15}
            >
              <div className="flex h-full items-center justify-center p-6">
                {child}
              </div>
            </ResizablePanel>
            {index < childrenArray.length - 1 && <ResizableHandle withHandle />}
          </React.Fragment>
        ))}
      </ResizablePanelGroup>
    </div>
  );
};

export default ResizableLayout;
