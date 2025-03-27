import React, { useState } from "react";
import { useTheme } from "../components/ui/theme-provider";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Code, BookOpen, LayoutGrid } from "lucide-react";
import CodeEditor from "@/components/code-stage/CodeEditor";
import VisualizationPane from "@/components/code-stage/VisualizationPane";
import ExplanationPanel from "@/components/code-stage/ExplanationPanel";
import ControlPanel from "@/components/code-stage/ControlPanel";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

const CodeStage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [totalSteps, setTotalSteps] = useState<number>(6);
  const [code, setCode] = useState<string>(
    `// Write your LeetCode solution here\nfunction twoSum(nums, target) {\n  const map = new Map();\n  \n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    \n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    \n    map.set(nums[i], i);\n  }\n  \n  return [];\n}`,
  );

  // Mock data for visualization
  const [dataStructures, setDataStructures] = useState([
    { id: "1", value: 2, type: "array" },
    { id: "2", value: 7, type: "array" },
    { id: "3", value: 11, type: "array" },
    { id: "4", value: 15, type: "array" },
  ]);

  // Mock explanation steps
  const explanationSteps = [
    {
      id: "1",
      title: "Initialize Hash Map",
      description:
        "We start by creating an empty hash map that will store each element's value as the key and its index as the value.",
      codeSnippet: "const map = new Map();",
      complexity: {
        time: "O(1)",
        space: "O(1)",
      },
    },
    {
      id: "2",
      title: "Iterate Through Array",
      description:
        "We iterate through each element in the array, calculating the complement (target - current element) and checking if it exists in our hash map.",
      codeSnippet:
        "for (let i = 0; i < nums.length; i++) {\n  const complement = target - nums[i];\n}",
      complexity: {
        time: "O(n)",
        space: "O(1)",
      },
    },
    {
      id: "3",
      title: "Check for Complement",
      description:
        "If the complement exists in our hash map, we've found our solution and return the indices of both numbers.",
      codeSnippet:
        "if (map.has(complement)) {\n  return [map.get(complement), i];\n}",
      complexity: {
        time: "O(1)",
        space: "O(1)",
      },
    },
    {
      id: "4",
      title: "Add to Hash Map",
      description:
        "If we haven't found a solution yet, we add the current element to our hash map with its value as the key and its index as the value.",
      codeSnippet: "map.set(nums[i], i);",
      complexity: {
        time: "O(1)",
        space: "O(1)",
      },
    },
    {
      id: "5",
      title: "Return Empty Array",
      description:
        "If we've gone through the entire array without finding a solution, we return an empty array to indicate no solution was found.",
      codeSnippet: "return [];",
      complexity: {
        time: "O(1)",
        space: "O(1)",
      },
    },
    {
      id: "6",
      title: "Overall Analysis",
      description:
        "The Two Sum algorithm efficiently finds a pair of numbers that add up to the target by using a hash map to store previously seen values.",
      codeSnippet:
        "// Complete solution\nfunction twoSum(nums, target) {\n  const map = new Map();\n  \n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    \n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    \n    map.set(nums[i], i);\n  }\n  \n  return [];\n}",
      complexity: {
        time: "O(n)",
        space: "O(n)",
      },
    },
  ];

  const handleRunCode = () => {
    setIsRunning(true);
    setCurrentStep(0);
    // In a real implementation, this would execute the code and update the visualization
  };

  const handlePauseCode = () => {
    setIsRunning(false);
    // In a real implementation, this would pause the code execution
  };

  const handleStepForward = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      // In a real implementation, this would advance the visualization to the next step
    }
  };

  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // In a real implementation, this would revert the visualization to the previous step
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStep(0);
    // In a real implementation, this would reset the visualization to its initial state
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    // In a real implementation, this would update the code in the editor
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="h-16 border-b flex items-center justify-between px-6 bg-background">
        <div className="flex items-center space-x-2">
          <Code className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Code Stage</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <Button variant="outline" size="sm" className="hidden md:flex">
            <BookOpen className="h-4 w-4 mr-2" />
            Documentation
          </Button>
          <Button variant="outline" size="sm" className="hidden md:flex">
            <LayoutGrid className="h-4 w-4 mr-2" />
            Examples
          </Button>
          <Button size="sm">Sign In</Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Code Editor Panel */}
          <ResizablePanel defaultSize={33} minSize={20}>
            <CodeEditor
              initialCode={code}
              onCodeChange={handleCodeChange}
              onRunCode={handleRunCode}
              isRunning={isRunning}
              onReset={handleReset}
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Visualization and Explanation Panels */}
          <ResizablePanel defaultSize={67}>
            <ResizablePanelGroup direction="vertical" className="h-full">
              {/* Visualization Pane */}
              <ResizablePanel defaultSize={50} minSize={30}>
                <VisualizationPane
                  dataStructures={dataStructures}
                  currentStep={currentStep}
                  totalSteps={totalSteps}
                  algorithmName="Two Sum"
                  visualizationType="array"
                  isRunning={isRunning}
                />
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Explanation Panel */}
              <ResizablePanel defaultSize={50} minSize={30}>
                <ExplanationPanel
                  currentStep={currentStep}
                  steps={explanationSteps}
                  algorithmName="Two Sum"
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>

      {/* Control Panel */}
      <ControlPanel
        onRun={handleRunCode}
        onPause={handlePauseCode}
        onStepForward={handleStepForward}
        onStepBackward={handleStepBackward}
        onReset={handleReset}
        isRunning={isRunning}
        canStepForward={currentStep < totalSteps - 1}
        canStepBackward={currentStep > 0}
      />
    </div>
  );
};

export default CodeStage;
