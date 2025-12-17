import React from "react";
import TabToggle from "../TabToggle";
import { useQueryState } from "nuqs";
import { tabOptions } from "./crypto-to-cash/Step1";
import z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormTextInput from "../inputs/FormTextInput";
import Button from "../inputs/Button";

export const schema = z.object({
  email: z.email("Enter valid email address"),
});

type FormValues = z.infer<typeof schema>;

const ComingSoon = () => {
  const [activeTab, setActiveTab] = useQueryState("tab");

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = (data: FormValues) => {
    console.log("SUBMITTED:", data);
    window.alert('Submitted')
  };

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <div>
      <TabToggle
        activeTab={activeTab || ""}
        onTabChange={setActiveTab}
        options={tabOptions}
      />

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col  gap-4 h-full"
        >
            <header className="text-center flex flex-col gap-2 my-3 mt-10">
                <h4 className="text-3xl font-semibold text-primaryColor">Coming Soon!</h4>
                <p className="text-[#4F4F4F]">Cash to Crypto is almost here. <br />
Enter your email and we’ll let you know the moment it’s live.</p>
            </header>

            <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-primaryColor text-left">
                  Email
                </label>

                <FormTextInput
                  name={"email"}
                  type="email"
                  placeholder="Enter your email"
                />
              </div>

              <Button className="h-12 mt-6" type="submit">
                Update me
              </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default ComingSoon;
