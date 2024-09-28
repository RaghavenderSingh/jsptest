"use client";
import React, { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { countryCodes } from "@/lib/country";

const CustomTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#FFB800",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "20px", // Make the border round
    "&.Mui-focused fieldset": {
      borderColor: "#FFB800",
    },
  },
});

const HighlightedTextField = styled(CustomTextField)({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#FFF9E5", // Light yellow background for highlighting
  },
});

const CountryCodeSelect = styled(Select)({
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
});

const formSchema = z.object({
  name: z.string().min(2, {
    message: "नाम कम से कम 2 अक्षर का होना चाहिए.",
  }),
  phoneNumber: z.object({
    countryCode: z.string(),
    number: z.string().regex(/^\d{10}$/, {
      message: "फ़ोन नंबर 10 अंकों का होना चाहिए.",
    }),
  }),
  email: z
    .string()
    .email({
      message: "कृपया एक मान्य ईमेल पता प्रविष्ट करें।",
    })
    .optional()
    .or(z.literal("")),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "राशि 2 दशमलव स्थानों तक एक वैध संख्या होनी चाहिए",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Shyog() {
  const [selectedAmount, setSelectedAmount] = useState<string>("");
  const donationAmount = [
    "₹1000",
    "₹3000",
    "₹5,000",
    "₹10,000",
    "₹1,00,000",
    "₹अन्य",
  ];
  const [paymentStatus, setPaymentStatus] = useState<
    "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED"
  >("PENDING");
  const [countryCode, setCountryCode] = useState("+91");
  const amountInputRef = useRef<HTMLInputElement>(null);
  const [isAmountHighlighted, setIsAmountHighlighted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phoneNumber: { countryCode: "+91", number: "" },
      email: "",
      amount: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    console.log(values);
    try {
      setPaymentStatus("PROCESSING");
      // Implement your submission logic here
      setPaymentStatus("COMPLETED");
    } catch (error) {
      console.error("Donation submission failed:", error);
      setPaymentStatus("FAILED");
    }
  };

  const handleBadgeClick = (amount: string) => {
    if (amount === "₹अन्य") {
      setSelectedAmount("");
      form.setValue("amount", "");
      setIsAmountHighlighted(true);
      if (amountInputRef.current) {
        amountInputRef.current.focus();
      }
    } else {
      setSelectedAmount(amount);
      form.setValue("amount", amount.replace(/[₹,]/g, ""));
      setIsAmountHighlighted(false);
    }
  };

  useEffect(() => {
    if (isAmountHighlighted && amountInputRef.current) {
      amountInputRef.current.focus();
    }
  }, [isAmountHighlighted]);

  return (
    <div>
      <h1 className="text-left text-sm font-bold mb-4">
        आर्थिक सहयोग करके बिहार के बदलाव में अपना योगदान दें
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CustomTextField
                    label="नाम"
                    className="w-full bg-white rounded-2xl"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber.number"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CustomTextField
                    label="फ़ोन नंबर"
                    placeholder="1234567890"
                    {...field}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CountryCodeSelect
                            value={countryCode}
                            onChange={(e) => {
                              setCountryCode(e.target.value as string);
                              form.setValue(
                                "phoneNumber.countryCode",
                                e.target.value as string
                              );
                            }}
                            sx={{ width: "100px" }}
                          >
                            {countryCodes.map((country) => (
                              <MenuItem
                                key={country.code}
                                value={country.phoneCode}
                              >
                                {country.flag} {country.phoneCode}
                              </MenuItem>
                            ))}
                          </CountryCodeSelect>
                        </InputAdornment>
                      ),
                    }}
                    className="w-full bg-white rounded-2xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CustomTextField
                    label="ईमेल"
                    className="w-full bg-white rounded-2xl"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <div className="space-y-4">
                  <FormControl>
                    {isAmountHighlighted ? (
                      <HighlightedTextField
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">₹</InputAdornment>
                          ),
                        }}
                        label="राशि"
                        className="w-full bg-white rounded-2xl"
                        placeholder="100.00"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setSelectedAmount("");
                        }}
                        inputRef={amountInputRef}
                      />
                    ) : (
                      <CustomTextField
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">₹</InputAdornment>
                          ),
                        }}
                        label="राशि"
                        className="w-full bg-white rounded-2xl"
                        placeholder="100.00"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setSelectedAmount("");
                        }}
                        inputRef={amountInputRef}
                      />
                    )}
                  </FormControl>
                  <div className="flex flex-wrap gap-2">
                    {donationAmount.map((item, index) => (
                      <Badge
                        key={index}
                        className={`
                          p-3 cursor-pointer rounded-2xl border-2 transition-all duration-300 ease-in-out
                          ${
                            selectedAmount === item
                              ? "bg-gradient-to-r from-yellow-400 to-yellow-300 text-black"
                              : "bg-gray-200 text-black hover:bg-gray-300"
                          }
                        `}
                        onClick={() => handleBadgeClick(item)}
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full mt-4 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black rounded-2xl"
            type="submit"
            disabled={paymentStatus === "PROCESSING"}
          >
            {paymentStatus === "PROCESSING" ? "प्रसंस्करण..." : "सहयोग करें"}
          </Button>
        </form>
      </Form>
      {paymentStatus === "FAILED" && (
        <div className="text-red-500 font-bold mt-2">
          भुगतान विफल हो गया। कृपया पुनः प्रयास करें।
        </div>
      )}
    </div>
  );
}
