"use client";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryState } from "nuqs";
import TabToggle from "../../TabToggle";
import FormDropdown from "../../inputs/FormDropdown";
import Image from "next/image";
import Button from "../../inputs/Button";
import FormTextInput from "../../inputs/FormTextInput";
import { Copy } from "lucide-react";
import Step1, { cryptoNetworkOptions, walletOptions } from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

/* -------------------- SCHEMA -------------------- */

export const schema = z.object({
  // STEP 1
  payCurrency: z.string().min(1),
  receiveCurrency: z.string().min(1),
  payFrom: z.string().min(1, "Select an option"),
  payTo: z.string().min(1, "Select an option"),

  // STEP 2
  bank: z.string().min(1, "Select a bank"),
  accountNumber: z.string().length(10, "Account number must be 10 digits"),
  accountName: z.string().min(3, "Account name is required"),

  // STEP 3
  recipientEmail: z.email("Invalid email"),
  recipientPhone: z.string().length(10, "Phone number must be 10 digits"),
  recipientPhoneCountryCode: z.string().min(3, "Select phone country"),
});


type FormValues = z.infer<typeof schema>;

/* -------------------- COMPONENT -------------------- */

const CryptoToCashForm = () => {
  const [step, setStep] = useState(1);
  const [completed, setCompleted] = useState(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      payCurrency: "USDT_ETH",
      payFrom: "",
      payTo: "",
      receiveCurrency: "NGN",
      recipientPhone: "234",
      accountName: "ODUTUGA GBEKE",
      recipientPhoneCountryCode: "+234",
    },
  });

  const {
    handleSubmit,
    trigger,
    formState: { errors },
  } = methods;

  const next = async () => {
    const fields: Record<number, (keyof FormValues)[]> = {
      1: ["payCurrency", "receiveCurrency", "payFrom", "payTo"],
      2: ["bank", "accountNumber", "accountName"],
      3: ["recipientEmail", "recipientPhone"],
    };

    const valid = await trigger(fields[step]);
    if (valid) setStep((s) => s + 1);
  };

  const back = () => setStep((s) => s - 1);

  const onSubmit = (data: FormValues) => {
    console.log("SUBMITTED:", data);
    setCompleted(true);
    
  };

  return (
    <section className="flex flex-col gap-5">
      {!completed && (
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-4 h-full"
          >
            {/* ---------------- STEP 1 ---------------- */}
            {step === 1 && <Step1 />}

            {/* ---------------- STEP 2 ---------------- */}
            {step === 2 && <Step2 back={back} />}

            {/* ---------------- STEP 3 ---------------- */}
            {step === 3 && <Step3 back={back} />}

            {/* ---------------- STEP 4 (PREVIEW) ---------------- */}
            {step === 4 && <Step4 back={back} />}

            {/* ---------------- ACTIONS ---------------- */}
            <div className="flex justify-between mt-6">
              {step <= 2 && (
                <Button onClick={next} className="w-full h-14">
                  {step === 1 && "Convert now"}
                  {step === 2 && "Next"}
                </Button>
              )}

              {step === 3 && (
                <Button type="submit" onClick={next} className="w-full h-14">
                  Next
                </Button>
              )}

              {step === 4 && (
                <Button type="submit" className="w-full h-14">
                  I have sent it
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      )}

      {completed && (
        <div className="flex flex-col gap-2 items-center">
          <div className="w-full h-6 relative ">
            <Image
              src={"/images/novacrust-logo.svg"}
              alt="novacrust logo"
              fill
              className="object-contain"
            />
          </div>

          <svg
            className="my-5 mt-10"
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M40 7.5C33.5721 7.5 27.2886 9.40609 21.944 12.9772C16.5994 16.5484 12.4338 21.6242 9.97393 27.5628C7.51408 33.5014 6.87047 40.0361 8.12449 46.3404C9.37851 52.6448 12.4738 58.4358 17.019 62.981C21.5643 67.5262 27.3552 70.6215 33.6596 71.8755C39.964 73.1295 46.4986 72.4859 52.4372 70.0261C58.3758 67.5662 63.4516 63.4006 67.0228 58.056C70.5939 52.7114 72.5 46.4279 72.5 40C72.4909 31.3833 69.0639 23.122 62.9709 17.0291C56.878 10.9361 48.6168 7.5091 40 7.5ZM54.2688 34.2688L36.7688 51.7688C36.5366 52.0012 36.2609 52.1856 35.9574 52.3114C35.6539 52.4372 35.3286 52.502 35 52.502C34.6715 52.502 34.3462 52.4372 34.0427 52.3114C33.7392 52.1856 33.4634 52.0012 33.2313 51.7688L25.7313 44.2688C25.2622 43.7996 24.9986 43.1634 24.9986 42.5C24.9986 41.8366 25.2622 41.2004 25.7313 40.7312C26.2004 40.2621 26.8366 39.9986 27.5 39.9986C28.1634 39.9986 28.7997 40.2621 29.2688 40.7312L35 46.4656L50.7313 30.7312C50.9635 30.499 51.2393 30.3147 51.5428 30.189C51.8463 30.0633 52.1715 29.9986 52.5 29.9986C52.8285 29.9986 53.1538 30.0633 53.4573 30.189C53.7607 30.3147 54.0365 30.499 54.2688 30.7312C54.501 30.9635 54.6853 31.2393 54.811 31.5428C54.9367 31.8462 55.0014 32.1715 55.0014 32.5C55.0014 32.8285 54.9367 33.1538 54.811 33.4572C54.6853 33.7607 54.501 34.0365 54.2688 34.2688Z"
              fill="#219653"
            />
          </svg>

          <h5 className="font-semibold text-2xl">
            Your transaction is processing.
          </h5>
          <p className="text-xl">The recipient will receive it shortly.</p>

          <article className="p-3 px-5 w-full my-8 bg-customGray-100 rounded-xl flex gap-5 justify-between items-center">
            <p className="text-[#4F4F4F] text-sm">Transaction ID</p>
            <button className="text-primaryColor flex items-center gap-1 cursor-pointer">
              NC123456789
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.25 3H8.25C8.05109 3 7.86032 3.07902 7.71967 3.21967C7.57902 3.36032 7.5 3.55109 7.5 3.75V7.5H3.75C3.55109 7.5 3.36032 7.57902 3.21967 7.71967C3.07902 7.86032 3 8.05109 3 8.25V20.25C3 20.4489 3.07902 20.6397 3.21967 20.7803C3.36032 20.921 3.55109 21 3.75 21H15.75C15.9489 21 16.1397 20.921 16.2803 20.7803C16.421 20.6397 16.5 20.4489 16.5 20.25V16.5H20.25C20.4489 16.5 20.6397 16.421 20.7803 16.2803C20.921 16.1397 21 15.9489 21 15.75V3.75C21 3.55109 20.921 3.36032 20.7803 3.21967C20.6397 3.07902 20.4489 3 20.25 3ZM15 19.5H4.5V9H15V19.5ZM19.5 15H16.5V8.25C16.5 8.05109 16.421 7.86032 16.2803 7.71967C16.1397 7.57902 15.9489 7.5 15.75 7.5H9V4.5H19.5V15Z"
                  fill="#013941"
                />
              </svg>
            </button>
          </article>

          <button
            className="text-primaryColor self-center font-semibold mt-8 cursor-pointer"
            onClick={() => {
              setStep(1);
              setCompleted(false);
            }}
          >
            Go back to home
          </button>
        </div>
      )}
    </section>
  );
};

export default CryptoToCashForm;
