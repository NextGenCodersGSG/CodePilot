"use client";
import AnalysisItem from "@/components/analysis-item/AnalysisItem";
import LoadingSpinner from "@/components/spinner/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import styles from "./textarea.module.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { IBug, IPerformance, ISecurity } from "@/@types";
import { motion } from "framer-motion";
import { Hammer, MoveUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AnalysisResults from "@/components/analysis-results/AnalysisResults";


export default function Page() {
  const [user, _] = useState("John");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("TypeScript");
  const [analysis, setAnalysis] = useState<{
    performance_issues?: IPerformance[];
    security_issues?: ISecurity[];
    bugs?: IBug[];
    description?: string;
    overall_suggestions?: string[];
  }>({});
  const areaRef = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSent, setIsSent] = useState(false);

  const handleTypedMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setIsEmpty(value.trim() === "");
    setCode(value);
    autoResizeTextarea();
  };

  const autoResizeTextarea = () => {
    const textarea = areaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; 
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };

  const resetTextareaHeight = () => {
    const textarea = areaRef.current;
    if(textarea){
      textarea.style.height = "fit-content"; 
    } 
  }

  const analyzeCode = async () => {
    try {
      setIsSent(true);
      setError(null);
      setLoading(true);
      setCode("");
      resetTextareaHeight();
      const response = await fetch("/api/analyze-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Analysis failed");
      }

      const data = await response.json();
      setAnalysis(data);
      console.log(data);
    } catch (error) {
      console.error("Error analyzing code:", error);
      setError(
        error instanceof Error ? error.message : "Failed to analyze code"
      );
    } finally {
      setLoading(false);
    }
  };

  const selectElement = [
    "TypeScript",
    "JavaScript",
    "React",
    "Python",
    "Java",
    "C#",
    "Rust",
  ]

  const handleSelectedLanguage = (value: string) => {
    setLanguage(value);
  };
  useEffect(() => {
    console.log(language);
  }, [language]);
  return (
    <section className={`px-4 py-8 ${isSent? "mt-auto" : "my-auto"}`}>
      <div className="mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, x: -70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`mb-10 ${isSent? "hidden" : "block"}`}
          exit={{ opacity: 0, x: -70 }}
        >
          <h1 className="text-3xl lg:text-4xl xl:text-5xl my-4 font-bold">
            Hi, {user}.
          </h1>
          <h2 className="text-lg md:text-xl lg:text-2xl my-4 font-bold text-gray-500">
            What Can I Help You With Today?
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          className="relative"
        >
          <AnalysisResults analysis={analysis}/>
          <motion.div
            layout 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ type: "keyframes", duration: 0.4, ease: "easeInOut" }} 
            className="border-2 border-input shadow-accent/40 shadow-2xl bg-sidebar max-w-4xl mx-auto p-4 rounded-4xl transition duration-200 hover:shadow-accent/70 sticky bottom-5 w-full mt-5"
          >
            <textarea
              onChange={handleTypedMessage}
              className={`p-4 resize-none rounded-3xl w-full focus:outline-0 bg-sidebar text-white ${styles.textarea}`}
              placeholder="What’s on your mind?"
              autoFocus
              value={code}
              ref={areaRef}
            />
            <div className="flex justify-between mt-4">
              <Select value={language} onValueChange={handleSelectedLanguage}>
                <SelectTrigger className="w-[180px] rounded-xl bg-input cursor-pointer">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectGroup className="cursor-pointer">
                    <SelectLabel>Languages</SelectLabel>
                    { selectElement.map((item, index) => (
                      <SelectItem key={`select-element-${index}`} className="cursor-pointer" value={item}>{item}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button
                disabled={isEmpty || loading}
                className={`rounded-full w-12 h-12 ${
                  isEmpty ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                }`}
                onClick={analyzeCode}
              >
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <MoveUp size={24} strokeWidth={3} />
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="mt-4 text-red-500"
          >
            Error: {error}
          </motion.div>
        )}

      </div>
    </section>
  );
}
