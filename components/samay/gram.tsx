"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { InputLabel, FormControl } from "@mui/material";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import SwikarPaper from "../SwikarPaper";

const CustomTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#FFB800",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "1rem",
    "&.Mui-focused fieldset": {
      borderColor: "#FFB800",
    },
  },
});

const CustomSelect = styled(Select)({
  borderRadius: "1rem",
  backgroundColor: "background.paper",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(0, 0, 0, 0.23)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(0, 0, 0, 0.87)",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#FFB800",
  },
});

interface FormData {
  state: string;
  district: string;
  block: string;
}

interface StateData {
  name: string;
  [key: string]: any;
}
interface TeleContentProps {
  data: {
    state: string;
    district: string;
    block: string;
    hour: string;
  };
  setData: React.Dispatch<React.SetStateAction<any>>;
}
export default function GramConten({
  data,
  setData,
}: TeleContentProps): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    state: data.state ? data.state : "",
    district: data.district ? data.district : "",
    block: data.block ? data.block : "",
  });

  const [states, setStates] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const session = useSession();
  const [downloadPatra, setDownloadPatra] = useState(false);
  const [displayPatra, setDisplayPatra] = useState(false);

  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    if (formData.state) {
      fetchDistricts(formData.state);
    }
  }, [formData.state]);

  const fetchStates = async (): Promise<void> => {
    try {
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries/states",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ country: "India" }),
        }
      );
      const data = await response.json();
      if (data.data && data.data.states) {
        setStates(data.data.states.map((state: StateData) => state.name));
      }
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchDistricts = async (state: string): Promise<void> => {
    try {
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries/state/cities",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ country: "India", state: state }),
        }
      );
      const data = await response.json();
      if (data.data) {
        setDistricts(data.data);
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const handleTextFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: any): void => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "state") {
      setFormData((prevData) => ({
        ...prevData,
        district: "",
        block: "",
      }));
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      const response = await fetch("/api/submitSwikarData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "gram_vahini",
          state: formData.state,
          district: formData.district,
          block: formData.block,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setDownloadPatra(true);
        toast.success("आपका फॉर्म सफलतापूर्वक जमा कर दिया गया है।");
        setData({
          state: "",
          district: "",
          block: "",
          hour: "",
        });
        setFormData({
          state: "",
          district: "",
          block: "",
        });
      } else {
        throw new Error(result.error || "Unknown error occurred");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("फॉर्म जमा करने में त्रुटि हुई। कृपया पुनः प्रयास करें।");
    }
  };

  return (
    <>
      {displayPatra ? (
        <>
          <SwikarPaper
            content={`मैं, ${session.data?.user.name}, जन सुराज की विचारधारा को स्वीकार करते हुए यह संकल्प लेता/लेती हूँ कि बिहार के समग्र विकास और इसे देश के अग्रणी राज्यों में शामिल करने के इस ऐतिहासिक अभियान में अपनी सक्रिय भूमिका निभाऊंगा/निभाऊंगी।
मैं जन सुराज को स्वीकार करके, समय में उनका साथ साझा करता हूँ। जन सुराज से जुड़कर आप भी अपना समय देके भागेदार बनें।`}
          />
        </>
      ) : (
        <div className="flex flex-col w-full space-y-4 justify-center items-center p-4">
          <p className="text-center">
            ग्राम वाहिनी में युवा जन सुराज केंद्र में रहकर वरिष्ठ पदयात्रियों से
            प्रशिक्षण प्राप्त करते हैं और जन सुराज के विचार को जन-जन तक पहुंचाते
            हैं।
          </p>

          <iframe
            className="w-full"
            src="https://www.youtube.com/embed/UlhFr_JEp4o?si=lcQdr6lx1oQ9X-RD"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <FormControl fullWidth>
              <InputLabel id="state-label">राज्य</InputLabel>
              <CustomSelect
                labelId="state-label"
                name="state"
                value={formData.state}
                sx={{ bgcolor: "background.paper" }}
                label="राज्य"
                onChange={handleSelectChange}
                displayEmpty
              >
                {states.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </CustomSelect>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="district-label">जिला</InputLabel>
              <CustomSelect
                labelId="district-label"
                name="district"
                value={formData.district}
                label="जिला"
                sx={{ bgcolor: "background.paper" }}
                onChange={handleSelectChange}
                displayEmpty
                disabled={!formData.state}
              >
                {districts.map((district) => (
                  <MenuItem key={district} value={district}>
                    {district}
                  </MenuItem>
                ))}
              </CustomSelect>
            </FormControl>
            <CustomTextField
              name="block"
              value={formData.block}
              onChange={handleTextFieldChange}
              sx={{ bgcolor: "background.paper" }}
              className="w-full"
              label="ब्लॉक"
              variant="outlined"
            />
            <Button
              className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-black rounded-2xl w-full"
              type="submit"
            >
              जमा करें
            </Button>
          </form>
          <Button
            className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-black rounded-2xl w-full"
            disabled={!downloadPatra}
            onClick={() => {
              setDisplayPatra(true);
            }}
          >
            <span className="flex-grow text-center">
              स्वीकार पत्र शेयर करें
            </span>
            <Send size={18} />
          </Button>
        </div>
      )}
    </>
  );
}
