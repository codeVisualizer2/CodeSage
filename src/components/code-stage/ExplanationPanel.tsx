import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Info, Code, BookOpen, MessageSquare } from "lucide-react";

interface ExplanationStep {
  id: string;
  title: string;
  description: string;
  codeSnippet?: string;
  complexity?: {
    time: string;
    space: string;
  };
}

interface ExplanationPanelProps {
  currentStep?: number;
  steps?: ExplanationStep[];
  algorithmName?: string;
}

const ExplanationPanel = ({
  currentStep = 0,
  steps = [
    {
      id: "1",
      title: "Initialize Variables",
      description:
        "We start by initializing our pointers and variables that will be used throughout the algorithm.",
      codeSnippet:
        "let left = 0;\nlet right = nums.length - 1;\nlet result = [];\n",
      complexity: {
        time: "O(1)",
        space: "O(1)",
      },
    },
    {
      id: "2",
      title: "Binary Search",
      description:
        "We use a binary search approach to efficiently find the target value in the sorted array.",
      codeSnippet:
        "while (left <= right) {\n  const mid = Math.floor((left + right) / 2);\n  if (nums[mid] === target) {\n    return mid;\n  } else if (nums[mid] < target) {\n    left = mid + 1;\n  } else {\n    right = mid - 1;\n  }\n}\n",
      complexity: {
        time: "O(log n)",
        space: "O(1)",
      },
    },
    {
      id: "3",
      title: "Return Result",
      description:
        "If we found the target, we return its index. Otherwise, we return -1 to indicate the target is not in the array.",
      codeSnippet: "return -1; // Target not found\n",
      complexity: {
        time: "O(1)",
        space: "O(1)",
      },
    },
  ],
  algorithmName = "Binary Search",
}: ExplanationPanelProps) => {
  const currentStepData = steps[currentStep];

  return (
    <Card className="h-full w-full overflow-hidden bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Explanation Panel
          </CardTitle>
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
          >
            {algorithmName}
          </Badge>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Step {currentStep + 1} of {steps.length}
        </div>
      </CardHeader>

      <Tabs defaultValue="explanation" className="w-full">
        <div className="px-6">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger
              value="explanation"
              className="flex items-center gap-2"
            >
              <Info className="h-4 w-4" />
              <span className="hidden sm:inline">Explanation</span>
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span className="hidden sm:inline">Code</span>
            </TabsTrigger>
            <TabsTrigger value="complexity" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Complexity</span>
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Notes</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <CardContent className="pt-4">
          <ScrollArea className="h-[450px] pr-4">
            <TabsContent value="explanation" className="mt-0">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {currentStepData.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {currentStepData.description}
                </p>

                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md border border-gray-200 dark:border-gray-800">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Key Insight
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    This step is crucial because it establishes the foundation
                    for the algorithm's execution path.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="code" className="mt-0">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Code Snippet
                </h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md border border-gray-200 dark:border-gray-800 font-mono text-sm overflow-x-auto">
                  <pre className="whitespace-pre-wrap">
                    {currentStepData.codeSnippet ||
                      "No code snippet available for this step."}
                  </pre>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-md border border-yellow-200 dark:border-yellow-900">
                  <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-2">
                    Important Note
                  </h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">
                    Pay attention to the boundary conditions in this code
                    segment.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="complexity" className="mt-0">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Time & Space Complexity
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md border border-gray-200 dark:border-gray-800">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Time Complexity
                    </h4>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {currentStepData.complexity?.time || "N/A"}
                    </p>
                    <Separator className="my-3" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      This represents the computational efficiency of this step.
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md border border-gray-200 dark:border-gray-800">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Space Complexity
                    </h4>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {currentStepData.complexity?.space || "N/A"}
                    </p>
                    <Separator className="my-3" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      This represents the memory usage efficiency of this step.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md border border-gray-200 dark:border-gray-800">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Overall Algorithm Complexity
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    The overall time complexity of the Binary Search algorithm
                    is O(log n) because we divide the search space in half with
                    each iteration.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notes" className="mt-0">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Personal Notes
                </h3>

                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md border border-gray-200 dark:border-gray-800 min-h-[200px]">
                  <p className="text-gray-500 dark:text-gray-400 italic">
                    Add your personal notes about this step here. This area is
                    for your own reference and understanding.
                  </p>
                </div>

                <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-md border border-purple-200 dark:border-purple-900">
                  <h4 className="text-sm font-medium text-purple-800 dark:text-purple-300 mb-2">
                    Learning Tip
                  </h4>
                  <p className="text-sm text-purple-700 dark:text-purple-400">
                    Try implementing this algorithm on your own and compare your
                    solution with the one shown here.
                  </p>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default ExplanationPanel;
