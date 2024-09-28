"use client";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Suggestion = string;

const suggestions: Suggestion[] = [
  "पलायन संबंधित सुझाव",
  "कृषि सुधार संबंधित सुझाव",
  "शिक्षा व्यवस्था संबंधित सुझाव",
  "भ्रष्टााचार उन्मूूलन संबंधित सुझाव",
  "बुुजुुर्गोंं को पेंंशन संबंधित सुझाव",
  "राजनीति संबंधित सुझाव",
  "सत्ता विकेंंद्रीकरण संबंधित सुझाव",
  "वर्गोंं की भागीदारी संबंधित सुझाव",
  "रोजगाार संबंधित सुझाव",
  "स्वास्थ्य संबंधित सुझाव",
  "राजनीतिक प्रतिनिधित्व संबंधित सुझाव",
  "अन्य",
];

interface SelectedSuggestions {
  [key: string]: boolean;
}

export default function Pkletter({
  sujavPercent,
  setSujavPercent,
}: {
  sujavPercent: number;
  setSujavPercent: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [selectedSuggestions, setSelectedSuggestions] =
    useState<SelectedSuggestions>({});
  const [otherSuggestion, setOtherSuggestion] = useState<string>("");

  const handleCheckboxChange = (suggestion: Suggestion) => {
    setSelectedSuggestions((prev) => ({
      ...prev,
      [suggestion]: !prev[suggestion],
    }));
  };

  const handleSubmit = async () => {
    const selectedTopics = Object.entries(selectedSuggestions)
      .filter(([_, isSelected]) => isSelected)
      .map(([suggestion]) => suggestion);

    const payload = {
      topics: selectedTopics,
      otherTopic: selectedTopics.includes("अन्य") ? otherSuggestion : null,
    };

    try {
      const response = await fetch("/api/suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Suggestion submitted successfully:", result);

        // Set sujavPercent to 100 and save it in localStorage
        setSujavPercent(100);
        localStorage.setItem("sujavPercent", "100");
      } else {
        console.error("Failed to submit suggestion");
      }
    } catch (error) {
      console.error("Error submitting suggestion:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-left text-sm font-bold mb-4">
        इनमें से किस विषय में आप सुझाव देना चाहेंगे?
      </h1>
      <div className="space-y-2">
        {suggestions.map((suggestion) => (
          <div key={suggestion} className="flex items-center space-x-2">
            <Checkbox
              id={suggestion}
              checked={selectedSuggestions[suggestion] || false}
              onCheckedChange={() => handleCheckboxChange(suggestion)}
            />
            <label
              htmlFor={suggestion}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {suggestion}
            </label>
          </div>
        ))}
        {selectedSuggestions["अन्य"] && (
          <Input
            type="text"
            placeholder="अन्य सुझाव दर्ज करें"
            value={otherSuggestion}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setOtherSuggestion(e.target.value)
            }
            className="mt-2"
          />
        )}
      </div>
      <Button
        onClick={handleSubmit}
        className=" w-full mt-4 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black rounded-2xl"
      >
        जमा करें
      </Button>
      <Button
        onClick={handleSubmit}
        className=" w-full mt-4 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black rounded-2xl"
      >
        रेफरल शेयर करें
      </Button>
    </div>
  );
}
