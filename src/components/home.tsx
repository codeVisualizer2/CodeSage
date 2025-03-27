import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "./ui/theme-provider";
import { useAuth } from "@/contexts/AuthContext";
import Header from "./layout/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import {
  Code,
  Brain,
  BarChart,
  Settings,
  Clock,
  ArrowRight,
  Star,
  Zap,
  Languages,
  BookOpen,
  LogIn,
  UserPlus,
} from "lucide-react";
import LoginDialog from "./ui/dialog-login";

function Home() {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [language, setLanguage] = useState("english");
  const [difficulty, setDifficulty] = useState("medium");
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [loginDialogMessage, setLoginDialogMessage] = useState("");

  // Mock data for recently completed problems
  const recentProblems = [
    {
      id: 1,
      name: "Two Sum",
      difficulty: "Easy",
      timeSpent: "15 min",
      rating: 4,
    },
    {
      id: 2,
      name: "Valid Parentheses",
      difficulty: "Easy",
      timeSpent: "12 min",
      rating: 5,
    },
    {
      id: 3,
      name: "Merge Two Sorted Lists",
      difficulty: "Medium",
      timeSpent: "25 min",
      rating: 3,
    },
  ];

  // Mock data for recommended problems
  const recommendedProblems = [
    {
      id: 4,
      name: "Add Two Numbers",
      difficulty: "Medium",
      similarity: "Similar to Two Sum",
      category: "Linked List",
    },
    {
      id: 5,
      name: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      similarity: "Hash Map technique",
      category: "String",
    },
    {
      id: 6,
      name: "Container With Most Water",
      difficulty: "Medium",
      similarity: "Two-pointer technique",
      category: "Array",
    },
  ];

  // Mock data for user metrics
  const userMetrics = {
    totalSolved: 42,
    easyCount: 25,
    mediumCount: 15,
    hardCount: 2,
    averageTime: "18 min",
    favoriteCategory: "Arrays",
    weakestCategory: "Dynamic Programming",
    streak: 7,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title="Code sage" />

      <LoginDialog
        open={loginDialogOpen}
        onOpenChange={setLoginDialogOpen}
        message={loginDialogMessage}
      />

      <main className="container px-4 py-8 mx-auto">
        <div className="flex flex-col gap-8">
          {/* Welcome Section */}
          <section className="text-center">
            <h1 className="mb-4 text-4xl font-bold">Welcome to Code Sage</h1>
            <p className="mb-8 text-xl text-muted-foreground">
              Visualize, understand, and master coding algorithms
            </p>
            <div className="flex justify-center gap-4">
              <Button
                size="lg"
                onClick={() => {
                  if (isAuthenticated) {
                    navigate("/code-sage");
                  } else {
                    setLoginDialogMessage(
                      "Sign in to save your progress and access all features.",
                    );
                    setLoginDialogOpen(true);
                  }
                }}
              >
                <Code className="w-5 h-5 mr-2" /> Start Coding
              </Button>
              <Button variant="outline" size="lg">
                <BookOpen className="w-5 h-5 mr-2" /> Browse Tutorials
              </Button>
              {!isAuthenticated && (
                <Button variant="secondary" size="lg" asChild>
                  <Link to="/login">
                    <LogIn className="w-5 h-5 mr-2" /> Sign In
                  </Link>
                </Button>
              )}
            </div>
          </section>

          <Tabs defaultValue="visualize" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger
                value="visualize"
                className="flex items-center justify-center"
              >
                <Code className="w-4 h-4 mr-2" /> Code Visualization
              </TabsTrigger>
              <TabsTrigger
                value="recommend"
                className="flex items-center justify-center"
              >
                <Brain className="w-4 h-4 mr-2" /> Recommendations
              </TabsTrigger>
              <TabsTrigger
                value="metrics"
                className="flex items-center justify-center"
              >
                <BarChart className="w-4 h-4 mr-2" /> Your Metrics
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="flex items-center justify-center"
              >
                <Settings className="w-4 h-4 mr-2" /> Settings
              </TabsTrigger>
            </TabsList>

            {/* Code Visualization Tab */}
            <TabsContent value="visualize" className="mt-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Code className="w-5 h-5 mr-2" /> Code sage
                    </CardTitle>
                    <CardDescription>
                      Visualize algorithm execution step by step
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center mb-4 rounded-md aspect-video bg-muted">
                      <img
                        src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80"
                        alt="Code visualization preview"
                        className="object-cover w-full h-full rounded-md"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Watch your code execute with visual representations of
                      data structures and algorithms. Perfect for understanding
                      complex algorithms like Two Sum, Binary Search, and more.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => {
                        if (isAuthenticated) {
                          navigate("/code-sage");
                        } else {
                          setLoginDialogMessage(
                            "Sign in to use Code sage and save your visualizations.",
                          );
                          setLoginDialogOpen(true);
                        }
                      }}
                    >
                      Launch Code sage <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" /> Algorithm Library
                    </CardTitle>
                    <CardDescription>
                      Browse common algorithms and their visualizations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-md bg-muted">
                        <div className="flex items-center">
                          <Badge variant="outline" className="mr-2">
                            Array
                          </Badge>
                          <span>Two Sum</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (isAuthenticated) {
                              navigate("/code-sage");
                            } else {
                              setLoginDialogMessage(
                                "Sign in to view this algorithm visualization.",
                              );
                              setLoginDialogOpen(true);
                            }
                          }}
                        >
                          View
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-md bg-muted">
                        <div className="flex items-center">
                          <Badge variant="outline" className="mr-2">
                            Array
                          </Badge>
                          <span>Binary Search</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (isAuthenticated) {
                              navigate("/code-sage");
                            } else {
                              setLoginDialogMessage(
                                "Sign in to view this algorithm visualization.",
                              );
                              setLoginDialogOpen(true);
                            }
                          }}
                        >
                          View
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-md bg-muted">
                        <div className="flex items-center">
                          <Badge variant="outline" className="mr-2">
                            Tree
                          </Badge>
                          <span>Binary Tree Traversal</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (isAuthenticated) {
                              navigate("/code-sage");
                            } else {
                              setLoginDialogMessage(
                                "Sign in to view this algorithm visualization.",
                              );
                              setLoginDialogOpen(true);
                            }
                          }}
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Browse All Algorithms{" "}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* Recommendations Tab */}
            <TabsContent value="recommend" className="mt-6">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Brain className="w-5 h-5 mr-2" /> Recommended Problems
                    </CardTitle>
                    <CardDescription>
                      Based on your recent activity and performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recommendedProblems.map((problem) => (
                        <div key={problem.id} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-medium">{problem.name}</h3>
                            <Badge
                              variant={
                                problem.difficulty === "Easy"
                                  ? "outline"
                                  : problem.difficulty === "Medium"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {problem.difficulty}
                            </Badge>
                          </div>
                          <div className="mb-2 text-sm text-muted-foreground">
                            <span className="font-medium">
                              Why recommended:
                            </span>{" "}
                            {problem.similarity}
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline">{problem.category}</Badge>
                            <Button
                              size="sm"
                              onClick={() => {
                                if (isAuthenticated) {
                                  navigate("/code-sage");
                                } else {
                                  setLoginDialogMessage(
                                    "Sign in to try this problem and track your progress.",
                                  );
                                  setLoginDialogOpen(true);
                                }
                              }}
                            >
                              Try Problem
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Select value={difficulty} onValueChange={setDifficulty}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Difficulties</SelectItem>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline">More Recommendations</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="w-5 h-5 mr-2" /> Recently Completed
                    </CardTitle>
                    <CardDescription>
                      Your recent problem-solving activity
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentProblems.map((problem) => (
                        <div
                          key={problem.id}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div>
                            <div className="font-medium">{problem.name}</div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="w-3 h-3 mr-1" />{" "}
                              {problem.timeSpent}
                              <span className="mx-2">•</span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${i < problem.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <Badge
                            variant={
                              problem.difficulty === "Easy"
                                ? "outline"
                                : problem.difficulty === "Medium"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {problem.difficulty}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All History
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* Metrics Tab */}
            <TabsContent value="metrics" className="mt-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart className="w-5 h-5 mr-2" /> Problem Solving
                      Stats
                    </CardTitle>
                    <CardDescription>
                      Your coding progress and achievements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            Total Problems Solved
                          </span>
                          <span className="text-sm font-medium">
                            {userMetrics.totalSolved}
                          </span>
                        </div>
                        <Progress
                          value={(userMetrics.totalSolved / 100) * 100}
                          className="h-2"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 border rounded-md">
                          <div className="text-xs text-muted-foreground">
                            Easy
                          </div>
                          <div className="text-lg font-bold text-green-500">
                            {userMetrics.easyCount}
                          </div>
                        </div>
                        <div className="p-2 border rounded-md">
                          <div className="text-xs text-muted-foreground">
                            Medium
                          </div>
                          <div className="text-lg font-bold text-yellow-500">
                            {userMetrics.mediumCount}
                          </div>
                        </div>
                        <div className="p-2 border rounded-md">
                          <div className="text-xs text-muted-foreground">
                            Hard
                          </div>
                          <div className="text-lg font-bold text-red-500">
                            {userMetrics.hardCount}
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Current Streak</span>
                        <div className="flex items-center">
                          <Zap className="w-4 h-4 mr-1 text-yellow-500" />
                          <span className="font-bold">
                            {userMetrics.streak} days
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm">
                          Average Time per Problem
                        </span>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1 text-blue-500" />
                          <span className="font-bold">
                            {userMetrics.averageTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Brain className="w-5 h-5 mr-2" /> Skill Analysis
                    </CardTitle>
                    <CardDescription>
                      Your strengths and areas for improvement
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="mb-2 text-sm font-medium">
                          Strongest Categories
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-3 border rounded-md">
                            <div className="text-xs text-muted-foreground">
                              Top Category
                            </div>
                            <div className="font-medium">
                              {userMetrics.favoriteCategory}
                            </div>
                            <Progress value={85} className="h-1 mt-2" />
                          </div>
                          <div className="p-3 border rounded-md">
                            <div className="text-xs text-muted-foreground">
                              Second Best
                            </div>
                            <div className="font-medium">Hash Tables</div>
                            <Progress value={75} className="h-1 mt-2" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-2 text-sm font-medium">
                          Areas for Improvement
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-3 border rounded-md">
                            <div className="text-xs text-muted-foreground">
                              Needs Work
                            </div>
                            <div className="font-medium">
                              {userMetrics.weakestCategory}
                            </div>
                            <Progress value={35} className="h-1 mt-2" />
                          </div>
                          <div className="p-3 border rounded-md">
                            <div className="text-xs text-muted-foreground">
                              Needs Practice
                            </div>
                            <div className="font-medium">Graphs</div>
                            <Progress value={45} className="h-1 mt-2" />
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-md bg-muted">
                        <h3 className="mb-2 text-sm font-medium">
                          Personalized Recommendation
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Based on your performance, we recommend focusing on
                          Dynamic Programming problems. Try solving at least 2
                          easy DP problems this week to build your foundation.
                        </p>
                        <Button
                          size="sm"
                          className="mt-2"
                          onClick={() => {
                            if (isAuthenticated) {
                              // Navigate to recommended problems
                              navigate("/code-sage");
                            } else {
                              setLoginDialogMessage(
                                "Sign in to view personalized recommendations.",
                              );
                              setLoginDialogOpen(true);
                            }
                          }}
                        >
                          View Recommended DP Problems
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2" /> Application Settings
                  </CardTitle>
                  <CardDescription>
                    Customize your Code sage experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-4 text-sm font-medium">
                        Language Preferences
                      </h3>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <label className="block mb-2 text-sm text-muted-foreground">
                            Interface Language
                          </label>
                          <Select value={language} onValueChange={setLanguage}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="english">English</SelectItem>
                              <SelectItem value="spanish">Spanish</SelectItem>
                              <SelectItem value="french">French</SelectItem>
                              <SelectItem value="german">German</SelectItem>
                              <SelectItem value="chinese">Chinese</SelectItem>
                              <SelectItem value="japanese">Japanese</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="block mb-2 text-sm text-muted-foreground">
                            Programming Language
                          </label>
                          <Select defaultValue="javascript">
                            <SelectTrigger>
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="javascript">
                                JavaScript
                              </SelectItem>
                              <SelectItem value="python">Python</SelectItem>
                              <SelectItem value="java">Java</SelectItem>
                              <SelectItem value="cpp">C++</SelectItem>
                              <SelectItem value="csharp">C#</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="mb-4 text-sm font-medium">
                        Visualization Preferences
                      </h3>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <label className="block mb-2 text-sm text-muted-foreground">
                            Animation Speed
                          </label>
                          <Select defaultValue="medium">
                            <SelectTrigger>
                              <SelectValue placeholder="Select speed" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="slow">Slow</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="fast">Fast</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="block mb-2 text-sm text-muted-foreground">
                            Default Visualization Type
                          </label>
                          <Select defaultValue="array">
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="array">Array</SelectItem>
                              <SelectItem value="tree">Tree</SelectItem>
                              <SelectItem value="graph">Graph</SelectItem>
                              <SelectItem value="linkedList">
                                Linked List
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="mb-4 text-sm font-medium">
                        Accessibility Settings
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="font-medium">
                              High Contrast Mode
                            </label>
                            <p className="text-sm text-muted-foreground">
                              Increase contrast for better visibility
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Enable
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="font-medium">Larger Text</label>
                            <p className="text-sm text-muted-foreground">
                              Increase text size throughout the application
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Enable
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="font-medium">
                              Screen Reader Support
                            </label>
                            <p className="text-sm text-muted-foreground">
                              Optimize for screen readers
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Enable
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Save Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default Home;
