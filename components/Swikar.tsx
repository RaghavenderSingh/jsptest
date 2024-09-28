"use client";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Clock, Handshake, MessageSquareText } from "lucide-react";
import Samay from "./samay/samay";
import Sankalp from "./AccordianCompontents/Sankalp";
import { CustomAccordion } from "./accordian/Accordion";
import Sujav from "./Sujav";
import Shyog from "./Shyog";

export default function Swikar() {
  const [sankapPercent, setSankapPercent] = useState<number>(0);
  const [samayPercent, setSamayPercent] = useState<number>(0);
  const [sujavPercent, setSujavPercent] = useState<number>(0);
  const [shyogPercent, setShyogPercent] = useState<number>(0);

  // Load the percentage from local storage when the component mounts
  useEffect(() => {
    const savedPercent = localStorage.getItem("sankapPercent");
    const storedSamayPercent = localStorage.getItem("samayPercent");
    const storedSujavPercent = localStorage.getItem("sujavPercent");

    if (savedPercent) {
      setSankapPercent(Number(savedPercent));
    }
    if (storedSamayPercent) {
      setSamayPercent(Number(storedSamayPercent));
    }
    if (storedSujavPercent) {
      setSujavPercent(Number(storedSujavPercent));
    }
  }, []);

  // Save the percentage to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("sankapPercent", sankapPercent.toString());
  }, [sankapPercent]);

  return (
    <div>
      <Navbar />

      <div className="flex flex-col justify-center items-center text-[#ffb800] px-4 mt-[62px] text-4xl font-extrabold">
        <h1>जन सुराज स्वीकार</h1>
      </div>
      <div className="flex flex-col w-full items-center gap-6 px-4 mt-[62px]">
        <CustomAccordion
          icon={<Handshake />}
          text="संकल्प"
          percentage={sankapPercent}
          component={
            <Sankalp
              setSankapPercent={setSankapPercent}
              sankapPercent={sankapPercent}
            />
          }
        />
        <CustomAccordion
          icon={<Clock />}
          text="समय"
          percentage={samayPercent}
          component={
            <Samay
              setSamayPercent={setSamayPercent}
              samayPercent={samayPercent}
            />
          }
        />
        <CustomAccordion
          icon={<Handshake />}
          text="सुझाव"
          percentage={sujavPercent}
          component={
            <Sujav
              sujavPercent={sujavPercent}
              setSujavPercent={setSujavPercent}
            />
          }
        />
        <CustomAccordion
          icon={<MessageSquareText />}
          text="सहयोग"
          percentage={shyogPercent}
          component={<Shyog />}
        />
      </div>
    </div>
  );
}
