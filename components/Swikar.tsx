"use client";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Clock, Handshake, MessageSquareText } from "lucide-react";
import Samay from "./samay/samay";
import Sankalp from "./AccordianCompontents/Sankalp";
import { CustomAccordion } from "./accordian/Accordion";
import Sujav from "./Sujav";
import Shyog from "./Shyog";
import Footer from "./Footer";
import { ScrollArea } from "./ui/scroll-area";

export default function Swikar() {
  const [sankapPercent, setSankapPercent] = useState(0);
  const [samayPercent, setSamayPercent] = useState(0);
  const [sujavPercent, setSujavPercent] = useState(0);
  const [shyogPercent, setShyogPercent] = useState(0);

  useEffect(() => {
    const savedPercent = localStorage.getItem("sankapPercent");
    const storedSamayPercent = localStorage.getItem("samayPercent");
    const storedSujavPercent = localStorage.getItem("sujavPercent");

    if (savedPercent) setSankapPercent(Number(savedPercent));
    if (storedSamayPercent) setSamayPercent(Number(storedSamayPercent));
    if (storedSujavPercent) setSujavPercent(Number(storedSujavPercent));
  }, []);

  useEffect(() => {
    localStorage.setItem("sankapPercent", sankapPercent.toString());
  }, [sankapPercent]);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <ScrollArea className="w-full h-full p-4">
        <div className="flex-1 mb-20">
          <div className="flex flex-col justify-center items-center text-[#ffb800] px-4 mt-4 text-4xl font-extrabold">
            <h1>जन सुराज स्वीकार</h1>
          </div>
          <div className="flex flex-col w-full items-center gap-6 px-4 mt-8 pb-8">
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
      </ScrollArea>
      <Footer />
    </div>
  );
}
