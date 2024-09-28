"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleUserRoundIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { countryCodes } from "@/lib/country";
import SwikarPaper from "./SwikarPaper";
import { signIn } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const CustomTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#FFB800",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "20px",
    "&.Mui-focused fieldset": {
      borderColor: "#FFB800",
    },
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
});

type FormValues = z.infer<typeof formSchema>;

export default function UserInfoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [displayPaper, setDisplayPaper] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phoneNumber: { countryCode: "+91", number: "" },
      email: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    console.log("Form submitted with values:", values);
    setIsSubmitting(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        name: values.name,
        phone: `${values.phoneNumber.countryCode}${values.phoneNumber.number}`,
        email: values.email,
      });

      console.log("SignIn result:", result);

      if (result?.ok) {
        setDisplayPaper(true);
      } else {
        console.error("Failed to authenticate user");
        // Handle error (e.g., show error message to user)
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitClick = () => {
    console.log("Submit button clicked");
    form.handleSubmit(onSubmit)();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-300 text-black px-8 py-3 rounded-lg shadow-lg text-lg font-semibold"
        >
          स्वीकार
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[390px] w-[calc(100%-2rem)] mx-auto rounded-lg bg-slate-200">
        {!displayPaper ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <DialogHeader>
                <DialogTitle>
                  <div className="flex items-center justify-between flex-col gap-[6px]">
                    <CircleUserRoundIcon
                      size={60}
                      className="text-yellow-400"
                    />
                    <p className="text-xl font-[900]">
                      कृपया आगे बढ़ने से पहले
                    </p>
                    <p className="text-xl font-[900]">
                      निम्नलिखित जानकारी भरें
                    </p>
                  </div>
                </DialogTitle>
                <DialogDescription>
                  <div className="flex flex-col gap-4 mt-5">
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
                                        setCountryCode(
                                          e.target.value as string
                                        );
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
                  </div>
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <div className="flex flex-col gap-4 w-full mt-4">
                  <Button
                    className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-black rounded-2xl w-full"
                    type="submit"
                    disabled={isSubmitting}
                    onClick={handleSubmitClick}
                  >
                    {isSubmitting ? "लोड हो रहा है..." : "स्वीकार करे"}
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <div className="w-full bg-white">
            <SwikarPaper name={form.getValues().name} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
