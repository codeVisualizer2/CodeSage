import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RefreshCw,
  Settings,
} from "lucide-react";

interface ControlPanelProps {
  onRun?: () => void;
  onPause?: () => void;
  onStepForward?: () => void;
  onStepBackward?: () => void;
  onReset?: () => void;
  onSettings?: () => void;
  isRunning?: boolean;
  canStepForward?: boolean;
  canStepBackward?: boolean;
}

const ControlPanel = ({
  onRun = () => {},
  onPause = () => {},
  onStepForward = () => {},
  onStepBackward = () => {},
  onReset = () => {},
  onSettings = () => {},
  isRunning = false,
  canStepForward = true,
  canStepBackward = false,
}: ControlPanelProps) => {
  return (
    <div className="w-full h-[60px] bg-background border-t flex items-center justify-between px-4 py-2">
      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={isRunning ? onPause : onRun}
                aria-label={isRunning ? "Pause execution" : "Run code"}
              >
                {isRunning ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isRunning ? "Pause execution" : "Run code"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onStepBackward}
                disabled={!canStepBackward}
                aria-label="Step backward"
              >
                <SkipBack className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Step backward</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onStepForward}
                disabled={!canStepForward}
                aria-label="Step forward"
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Step forward</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onReset}
                aria-label="Reset visualization"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reset visualization</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onSettings}
                aria-label="Settings"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ControlPanel;
