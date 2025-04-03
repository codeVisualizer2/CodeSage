import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, RotateCcw, Save } from "lucide-react";

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  onCodeChange?: (code: string) => void;
  onRunCode?: (code: string) => void;
  isRunning?: boolean;
  onReset?: () => void;
}

const CodeEditor = ({
  initialCode = "// Write your LeetCode solution here\nfunction twoSum(nums, target) {\n  const map = new Map();\n  \n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    \n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    \n    map.set(nums[i], i);\n  }\n  \n  return [];\n}",
  language = "javascript",
  onCodeChange = () => {},
  onRunCode = () => {},
  isRunning = false,
  onReset = () => {},
}: CodeEditorProps) => {
  const [code, setCode] = useState<string>(initialCode);
  const [activeTab, setActiveTab] = useState<string>("code");

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    onCodeChange(newCode);
  };

  const handleRunCode = () => {
    onRunCode(code);
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Code Editor
        </h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            title="Reset Code"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" title="Save Code">
            <Save className="w-4 h-4" />
          </Button>
          <Button
            variant={isRunning ? "destructive" : "default"}
            size="sm"
            onClick={handleRunCode}
            title={isRunning ? "Stop Execution" : "Run Code"}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Stop
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Run
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="code"
        className="flex flex-col flex-1"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="px-4 pt-2 border-b border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="test">Test Cases</TabsTrigger>
        </TabsList>
        <TabsContent value="code" className="flex-1 p-0 m-0">
          <div className="relative h-full">
            <textarea
              className="w-full h-full p-4 ml-8 font-mono text-sm text-gray-900 bg-white resize-none focus:outline-none dark:bg-gray-900 dark:text-gray-100"
              value={code}
              onChange={handleCodeChange}
              spellCheck="false"
              placeholder="Write your code here..."
            />
            <div className="absolute top-0 left-0 flex flex-col items-center w-10 h-full pt-4 text-xs text-gray-500 border-r border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
              {Array.from({ length: code.split("\n").length }).map((_, i) => (
                <div key={i} className="w-full text-center py-[2px]">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="test" className="flex-1 p-0 m-0">
          <textarea
            className="w-full h-full p-4 font-mono text-sm text-gray-900 bg-white resize-none focus:outline-none dark:bg-gray-900 dark:text-gray-100"
            placeholder="Add test cases here..."
            defaultValue="// Test cases\ntwoSum([2, 7, 11, 15], 9); // Expected: [0, 1]\ntwoSum([3, 2, 4], 6);      // Expected: [1, 2]\ntwoSum([3, 3], 6);        // Expected: [0, 1]"
          />
        </TabsContent>
      </Tabs>

      <div className="p-2 text-xs text-gray-500 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
        <div className="flex justify-between">
          <span>
            Language: {language.charAt(0).toUpperCase() + language.slice(1)}
          </span>
          <span>{code.split("\n").length} lines</span>
        </div>
      </div>
    </Card>
  );
};

export default CodeEditor;
