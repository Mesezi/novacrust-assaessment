import React from 'react'
import FormDropdown from '../../inputs/FormDropdown'
import { useFormContext } from 'react-hook-form';
import FormTextInput from '../../inputs/FormTextInput';

const banks = [
  { label: "Access Bank", value: "access_bank" },
  { label: "GTBank", value: "gtbank" },
  { label: "Zenith Bank", value: "zenith_bank" },
  { label: "First Bank", value: "first_bank" },
  { label: "UBA", value: "uba" },
  { label: "Fidelity Bank", value: "fidelity_bank" },
  { label: "Union Bank", value: "union_bank" },
  { label: "Stanbic IBTC Bank", value: "stanbic_ibtc" },
  { label: "Sterling Bank", value: "sterling_bank" },
  { label: "Polaris Bank", value: "polaris_bank" },
];

const Step2 = ({back}:{
    back: () => void
}) => {
      const methods = useFormContext()
          const {watch} = methods
  return (
  <>
              <header className="flex items-center mb-5">
                <button className="cursor-pointer" onClick={back}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 12C21 12.1989 20.921 12.3897 20.7803 12.5303C20.6397 12.671 20.4489 12.75 20.25 12.75H5.56029L11.0306 18.2194C11.1003 18.2891 11.1556 18.3718 11.1933 18.4628C11.231 18.5539 11.2504 18.6515 11.2504 18.75C11.2504 18.8485 11.231 18.9461 11.1933 19.0372C11.1556 19.1282 11.1003 19.2109 11.0306 19.2806C10.9609 19.3503 10.8782 19.4056 10.7872 19.4433C10.6961 19.481 10.5985 19.5004 10.5 19.5004C10.4014 19.5004 10.3039 19.481 10.2128 19.4433C10.1218 19.4056 10.039 19.3503 9.96935 19.2806L3.21935 12.5306C3.14962 12.461 3.0943 12.3783 3.05656 12.2872C3.01882 12.1962 2.99939 12.0986 2.99939 12C2.99939 11.9014 3.01882 11.8038 3.05656 11.7128C3.0943 11.6217 3.14962 11.539 3.21935 11.4694L9.96935 4.71938C10.1101 4.57865 10.301 4.49958 10.5 4.49958C10.699 4.49958 10.8899 4.57865 11.0306 4.71938C11.1713 4.86011 11.2504 5.05098 11.2504 5.25C11.2504 5.44902 11.1713 5.6399 11.0306 5.78063L5.56029 11.25H20.25C20.4489 11.25 20.6397 11.329 20.7803 11.4697C20.921 11.6103 21 11.8011 21 12Z"
                      fill="black"
                    />
                  </svg>
                </button>

                <h4 className="text-lg text-primaryColor mx-auto font-semibold">
                  Receipent Details
                </h4>
              </header>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-primaryColor">
                  Bank
                </label>

                <FormDropdown
                  name={"bank"}
                  placeholder="Select an option"
                  className="h-14 bg-white"
                  options={banks}
                  searchable
                  value={watch("bank")}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-primaryColor">
                  Account Number
                </label>

                <FormTextInput
                  name={"accountNumber"}
                  type="number"
                  placeholder="Enter your account number"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-primaryColor">
                  Account Name
                </label>

                <FormTextInput
                  name={"accountName"}
                  placeholder="Enter account name"
                  disabled={true}
                />
              </div>
            </>
  )
}

export default Step2