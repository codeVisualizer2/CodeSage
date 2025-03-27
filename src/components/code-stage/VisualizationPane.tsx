import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ZoomIn, ZoomOut, Maximize2, Minimize2, Info } from "lucide-react";

interface DataStructureNode {
  id: string;
  value: string | number;
  connections?: string[];
  type?: "array" | "linkedList" | "tree" | "graph" | "stack" | "queue";
  highlighted?: boolean;
  visited?: boolean;
}

interface VisualizationPaneProps {
  dataStructures?: DataStructureNode[];
  currentStep?: number;
  totalSteps?: number;
  algorithmName?: string;
  visualizationType?:
    | "array"
    | "linkedList"
    | "tree"
    | "graph"
    | "stack"
    | "queue";
  isRunning?: boolean;
}

const VisualizationPane: React.FC<VisualizationPaneProps> = ({
  dataStructures = [
    { id: "1", value: 5, type: "array" },
    { id: "2", value: 3, type: "array" },
    { id: "3", value: 8, type: "array", highlighted: true },
    { id: "4", value: 2, type: "array" },
    { id: "5", value: 7, type: "array" },
    { id: "6", value: 1, type: "array" },
  ],
  currentStep = 2,
  totalSteps = 6,
  algorithmName = "Bubble Sort",
  visualizationType = "array",
  isRunning = false,
}) => {
  const [zoom, setZoom] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("visualization");

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 10, 200));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 10, 50));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const renderArrayVisualization = () => {
    return (
      <div className="flex items-end justify-center h-64 space-x-2 mt-8">
        {dataStructures.map((node) => (
          <div
            key={node.id}
            className={`flex flex-col items-center transition-all duration-300 ${node.highlighted ? "animate-pulse" : ""}`}
          >
            <div
              className={`w-12 ${node.highlighted ? "bg-primary" : "bg-secondary"} ${node.visited ? "bg-green-500" : ""}`}
              style={{ height: `${Math.max(20, Number(node.value) * 20)}px` }}
            />
            <div className="mt-2 text-sm font-medium">{node.value}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderTreeVisualization = () => {
    return (
      <div className="flex justify-center items-center h-64 mt-8">
        <div className="text-center p-4 border border-dashed border-gray-300 rounded-md">
          <p className="text-muted-foreground">Tree Visualization</p>
          <p className="text-xs text-muted-foreground mt-2">
            (Placeholder for tree structure)
          </p>
        </div>
      </div>
    );
  };

  const renderGraphVisualization = () => {
    return (
      <div className="flex justify-center items-center h-64 mt-8">
        <div className="text-center p-4 border border-dashed border-gray-300 rounded-md">
          <p className="text-muted-foreground">Graph Visualization</p>
          <p className="text-xs text-muted-foreground mt-2">
            (Placeholder for graph structure)
          </p>
        </div>
      </div>
    );
  };

  const renderVisualization = () => {
    switch (visualizationType) {
      case "array":
        return renderArrayVisualization();
      case "tree":
        return renderTreeVisualization();
      case "graph":
        return renderGraphVisualization();
      default:
        return renderArrayVisualization();
    }
  };

  return (
    <Card
      className={`bg-background border overflow-hidden ${isFullscreen ? "fixed inset-0 z-50" : "h-full"}`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-medium">Visualization: {algorithmName}</h3>
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={handleZoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Zoom Out</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <span className="text-sm">{zoom}%</span>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={handleZoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Zoom In</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleFullscreen}
                >
                  {isFullscreen ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <Tabs
        defaultValue="visualization"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <div className="px-4 pt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="visualization">Visualization</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
        </div>

        <CardContent className="p-4">
          <TabsContent value="visualization" className="mt-0">
            <div
              style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: "center center",
              }}
              className="transition-transform duration-200"
            >
              {renderVisualization()}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Step {currentStep} of {totalSteps}
              </div>

              <div className="flex items-center space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Info className="h-4 w-4 mr-2" />
                        View Algorithm Info
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Shows detailed information about the current algorithm
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="details" className="mt-0">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Algorithm: {algorithmName}</h4>
                <p className="text-sm text-muted-foreground">
                  {algorithmName === "Bubble Sort"
                    ? "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order."
                    : "Algorithm description will appear here."}
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Current Operation</h4>
                <p className="text-sm text-muted-foreground">
                  {isRunning
                    ? "Comparing elements at index 2 and 3"
                    : "Algorithm not running"}
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Time Complexity</h4>
                <p className="text-sm text-muted-foreground">
                  {algorithmName === "Bubble Sort"
                    ? "O(n²) - where n is the number of elements"
                    : "Time complexity will appear here"}
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Space Complexity</h4>
                <p className="text-sm text-muted-foreground">
                  {algorithmName === "Bubble Sort"
                    ? "O(1) - constant extra space"
                    : "Space complexity will appear here"}
                </p>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default VisualizationPane;
